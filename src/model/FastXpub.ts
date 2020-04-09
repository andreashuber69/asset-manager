// https://github.com/andreashuber69/net-worth#--
import { HDNode, Network } from "@trezor/utxo-lib";
import { TaskQueue } from "./TaskQueue";

// https://github.com/andreashuber69/net-worth#--
export class FastXpub {
    public constructor(network: Network) {
        this.network = network;
    }

    public async deriveNode(xpub: string, index: number) {
        // It appears that fastxpub doesn't answer a request containing a malformed xpub, which is why we ensure the
        // correct format by creating a HDNode first.
        const node = HDNode.fromBase58(xpub, this.network);

        return FastXpub.getResponse(
            {
                type: "deriveNode",
                xpub: node.toBase58(),
                version: node.getNetwork().bip32.public,
                index,
            },
            ({ data }) => data.xpub as string,
        );
    }

    public async deriveAddressRange(xpub: string, firstIndex: number, lastIndex: number) {
        const hdNode = HDNode.fromBase58(xpub, this.network);

        return FastXpub.getResponse(
            {
                type: "deriveAddressRange",
                node: FastXpub.getNode(hdNode),
                firstIndex,
                lastIndex,
                version: hdNode.getNetwork().pubKeyHash,
                addressFormat: 0, // TODO
            },
            ({ data }) => data.addresses as string[],
        );
    }

    private static readonly worker = FastXpub.getWorker();
    private static readonly taskQueue = new TaskQueue();

    private static async getWorker() {
        const response = await window.fetch("fastxpub.wasm");

        if (!response.ok) {
            throw new Error(`Can't fetch: ${response.statusText}`);
        }

        const result = new Worker("fastxpub.js");

        result.postMessage({
            type: "init",
            binary: await response.arrayBuffer(),
        });

        return result;
    }

    private static getNode({ depth, index, parentFingerprint, chainCode, keyPair }: HDNode) {
        return {
            depth,
            // eslint-disable-next-line @typescript-eslint/camelcase
            child_num: index,
            fingerprint: parentFingerprint,
            // eslint-disable-next-line @typescript-eslint/camelcase
            chain_code: chainCode.slice(),
            // eslint-disable-next-line @typescript-eslint/camelcase
            public_key: keyPair.getPublicKeyBuffer().slice(),
        };
    }

    private static async getResponse<T>(message: unknown, extractResult: (ev: MessageEvent) => T) {
        const worker = await FastXpub.worker;

        return FastXpub.taskQueue.queue(
            async () => new Promise<T>((resolve, reject) => {
                FastXpub.setHandlers<T>(worker, extractResult, resolve, reject);
                worker.postMessage(message);
            }),
        );
    }

    private static setHandlers<T>(
        worker: Worker,
        extractResult: (ev: MessageEvent) => T,
        resolve: (value: T) => void,
        reject: (reason: Error) => void,
    ) {
        worker.onmessage = (ev) => {
            FastXpub.removeHandlers(worker);
            resolve(extractResult(ev));
        };
        worker.onerror = (ev) => {
            FastXpub.removeHandlers(worker);
            reject(new Error(ev.message));
        };
    }

    private static removeHandlers(worker: Worker) {
        // The API requires null
        // eslint-disable-next-line no-null/no-null
        worker.onmessage = null;
        // eslint-disable-next-line no-null/no-null
        worker.onerror = null;
    }

    private readonly network: Network;
}
