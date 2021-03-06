// https://github.com/andreashuber69/net-worth#--
import { HDNode, Network } from "@trezor/utxo-lib";
import { decode, encode } from "bs58check";
import { TaskQueue } from "./TaskQueue";

// https://github.com/andreashuber69/net-worth#--
export class FastXpub {
    public constructor(network: Network) {
        this.network = network;
    }

    public async deriveNode(xpub: string, index: number) {
        // It appears that fastxpub doesn't answer a request containing a malformed xpub, which is why we ensure the
        // correct format by creating a HDNode first.
        this.toHDNode(xpub);

        return FastXpub.getResponse(
            {
                type: "deriveNode",
                xpub,
                version: decode(xpub).readUInt32BE(0),
                index,
            },
            ({ data }) => data.xpub as string,
        );
    }

    public async deriveAddressRange(xpub: string, firstIndex: number, lastIndex: number) {
        const hdNode = this.toHDNode(xpub);
        const p2sh = FastXpub.p2shXpubPrefixes.includes(xpub.slice(0, 4));

        return FastXpub.getResponse(
            {
                type: "deriveAddressRange",
                node: FastXpub.convert(hdNode),
                firstIndex,
                lastIndex,
                version: p2sh ? hdNode.getNetwork().scriptHash : hdNode.getNetwork().pubKeyHash,
                addressFormat: p2sh ? 1 : 0,
            },
            ({ data }) => data.addresses as string[],
        );
    }

    private static readonly overwriteVersionXpubPrefixes: readonly string[] = ["ypub", "Mtub", "drkp"];
    private static readonly p2shXpubPrefixes: readonly string[] = ["ypub", "Mtub"];

    private static readonly worker = FastXpub.getWorker();
    private static readonly taskQueue = new TaskQueue();

    private static async getWorker() {
        const result = new Worker("fastxpub.js");
        const response = await window.fetch("fastxpub.wasm");

        if (!response.ok) {
            throw new Error(`Can't fetch: ${response.statusText}`);
        }

        result.postMessage({
            type: "init",
            binary: await response.arrayBuffer(),
        });

        return result;
    }

    private static convert({ depth, index, parentFingerprint, chainCode, keyPair }: HDNode) {
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
                FastXpub.setHandlers(worker, (ev) => resolve(extractResult(ev)), reject);
                worker.postMessage(message);
            }),
        );
    }

    private static setHandlers(worker: Worker, resolve: (ev: MessageEvent) => void, reject: (reason: Error) => void) {
        worker.onmessage = (ev) => {
            FastXpub.removeHandlers(worker);
            resolve(ev);
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

    private toHDNode(xpub: string) {
        if (FastXpub.overwriteVersionXpubPrefixes.includes(xpub.slice(0, 4))) {
            const decoded = decode(xpub);
            decoded.writeInt32BE(this.network.bip32.public, 0);

            return HDNode.fromBase58(encode(decoded), this.network);
        }

        return HDNode.fromBase58(xpub, this.network);
    }
}
