module.exports = {
    env: {
        browser: true
    },
    extends: [
        "eslint:all",
        "plugin:@typescript-eslint/all"
    ],
    parser: "@typescript-eslint/parser",
    parserOptions: {
        ecmaVersion: 8,
        project: "tsconfig.json",
        sourceType: "module"
    },
    plugins: [
        "@typescript-eslint",
        "@typescript-eslint/tslint",
        "import",
        "jsdoc",
        "no-null",
        "prefer-arrow",
    ],
    root: true,
    rules: {
        "capitalized-comments": [
            "error",
            "always",
            {
                "ignoreConsecutiveComments": true,
                "ignoreInlineComments": true,
                "ignorePattern": "tslint"
            }
        ],
        "multiline-comment-style": [
            "error",
            "separate-lines"
        ],
        "object-curly-spacing": [
            "error",
            "always"
        ],
        "padded-blocks": [
            "error",
            "never"
        ],
        "@typescript-eslint/array-type": [
            "error",
            {
                default: "array-simple",
            }
        ],
        "@typescript-eslint/await-thenable": "error",
        "@typescript-eslint/consistent-type-assertions": [
            "error",
            {
                assertionStyle: "as",
                objectLiteralTypeAssertions: "never",
            }        
        ],
        "@typescript-eslint/no-type-alias": "off",
        "no-inline-comments": "off",
        "no-magic-numbers": "off",
        "@typescript-eslint/no-magic-numbers": "off",
        "function-call-argument-newline": [
            "error",
            "consistent"
        ],
        "lines-between-class-members": [
            "error",
            "always",
            {
                exceptAfterSingleLine: true
            }
        ],
        "lines-around-comment": "off",
        "line-comment-position": "off",
        // Does not work with interfaces, see https://github.com/typescript-eslint/typescript-eslint/issues/1150
        // "lines-around-comment": [
        //     "error",
        //     {
        //         allowBlockStart: true,
        //         allowObjectStart: true,
        //         allowArrayStart: true,
        //         allowClassStart: true
        //     }
        // ],
        "array-bracket-newline": [
            "error",
            "consistent"
        ],
        "array-element-newline": [
            "error",
            "consistent"
        ],
        "sort-imports": [
            "error",
            {
                "ignoreCase": true,
                "ignoreDeclarationSort": true,
            }
        ],
        "no-undef": "off",
        "sort-keys": "off",
        "no-undefined": "off",
        "no-ternary": "off",
        "new-cap": "off",
        "@typescript-eslint/typedef": "off",
        "multiline-ternary": [
            "error",
            "always-multiline"
        ],
        "operator-linebreak": [
            "error",
            "after"
        ],
        "@typescript-eslint/explicit-module-boundary-types": "off",
        "no-extra-parens": "off",
        "@typescript-eslint/no-extra-parens": "off",
        "function-paren-newline": [
            "error",
            "multiline-arguments"
        ],
        "object-property-newline": [
            "error",
            {
                allowAllPropertiesOnSameLine: true
            }
        ],
        "@typescript-eslint/consistent-type-definitions": "error",
        "@typescript-eslint/explicit-function-return-type": 0,
        "@typescript-eslint/explicit-member-accessibility": [
            "error",
            {
                accessibility: "explicit",
                overrides: {
                    accessors: "explicit",
                    constructors: "explicit",
                    parameterProperties: "explicit"
                }
            }
        ],
        "@typescript-eslint/indent": [
            "error",
            4,
            {
                SwitchCase: 1
            }
        ],
        "@typescript-eslint/interface-name-prefix": [
            "error",
            {
                prefixWithI: "always"
            }
        ],
        "@typescript-eslint/member-delimiter-style": [
            "error",
            {
                multiline: {
                    delimiter: "semi",
                    requireLast: true
                },
                singleline: {
                    delimiter: "semi",
                    requireLast: false
                }
            }
        ],
        "@typescript-eslint/member-ordering": [
            "error",
            {
                default: [
                    'signature',
                  
                    'public-static-field',
                    'public-static-method',
                    'public-field',
                    'public-constructor',
                    'public-method',
                  
                    'protected-static-field',
                    'protected-static-method',
                    'protected-field',
                    'protected-constructor',
                    'protected-method',
                  
                    'private-static-field',
                    'private-static-method',
                    'private-field',
                    'private-constructor',
                    'private-method'
                ]
            }
        ],
        "@typescript-eslint/no-empty-function": "error",
        "@typescript-eslint/no-empty-interface": "error",
        "@typescript-eslint/no-explicit-any": "off",
        "@typescript-eslint/no-extraneous-class": "off",
        "@typescript-eslint/no-floating-promises": "error",
        "@typescript-eslint/no-for-in-array": "error",
        "@typescript-eslint/no-inferrable-types": "error",
        "@typescript-eslint/no-misused-new": "error",
        "@typescript-eslint/no-namespace": "error",
        "@typescript-eslint/no-non-null-assertion": "error",
        "no-param-reassign": "error",
        "@typescript-eslint/no-parameter-properties": "off",
        "@typescript-eslint/no-require-imports": "error",
        "@typescript-eslint/no-this-alias": "error",
        "@typescript-eslint/no-unnecessary-qualifier": "error",
        "@typescript-eslint/no-unnecessary-type-arguments": "error",
        "@typescript-eslint/no-unnecessary-type-assertion": "error",
        "@typescript-eslint/no-use-before-define": "off",
        "@typescript-eslint/no-var-requires": "error",
        "@typescript-eslint/prefer-for-of": "error",
        "@typescript-eslint/prefer-function-type": "error",
        "@typescript-eslint/prefer-namespace-keyword": "error",
        "@typescript-eslint/prefer-readonly": "error",
        "@typescript-eslint/promise-function-async": "off",
        "@typescript-eslint/quotes": [
            "error",
            "double",
            {
                avoidEscape: true
            }
        ],
        "@typescript-eslint/require-await": "error",
        "@typescript-eslint/restrict-plus-operands": "error",
        "@typescript-eslint/semi": [
            "error",
            "always"
        ],
        "@typescript-eslint/space-before-function-paren": [
            "error",
            {
                named: "never",
                asyncArrow: "always"
            }
        ],
        "@typescript-eslint/strict-boolean-expressions": "off",
        "@typescript-eslint/triple-slash-reference": "error",
        "@typescript-eslint/type-annotation-spacing": "error",
        "@typescript-eslint/unbound-method": "error",
        "@typescript-eslint/unified-signatures": "error",
        "camelcase": "off",
        "@typescript-eslint/camelcase": [
            "error",
            {
                properties: "always"
            }
        ],
        "class-methods-use-this": "error",
        "comma-dangle": [
            "error",
            "always-multiline"
        ],
        "complexity": "error",
        "constructor-super": "error",
        "curly": "error",
        "default-case": "error",
        "dot-notation": "error",
        "eol-last": "error",
        "eqeqeq": [
            "error",
            "always"
        ],
        "guard-for-in": "error",
        "id-blacklist": "off",
        "id-match": "error",
        "import/no-default-export": "error",
        "import/no-deprecated": "error",
        "import/no-extraneous-dependencies": "error",
        "import/no-unassigned-import": "error",
        "import/order": "error",
        "jsdoc/no-types": "error",
        "linebreak-style": [
            "error",
            "unix"
        ],
        "max-classes-per-file": [
            "error",
            1
        ],
        "max-len": [
            "error",
            {
                code: 120
            }
        ],
        "max-lines": [
            "error",
            1000
        ],
        "new-parens": "error",
        "newline-per-chained-call": "off",
        "no-bitwise": "off",
        "no-caller": "error",
        "no-cond-assign": "off",
        "no-console": "off",
        "no-debugger": "error",
        "no-duplicate-case": "error",
        "no-duplicate-imports": "error",
        "no-empty": "error",
        "no-eval": "error",
        "no-extra-bind": "error",
        "no-irregular-whitespace": "error",
        "no-magic-numbers": "off",
        "no-multiple-empty-lines": "error",
        "no-new-func": "error",
        "no-new-wrappers": "error",
        "no-null/no-null": "error",
        "no-plusplus": [
            "off",
            {
                allowForLoopAfterthoughts: true
            }
        ],
        "no-redeclare": "error",
        "no-restricted-syntax": [
            "error",
            "ForInStatement"
        ],
        "no-return-await": "error",
        "no-sequences": "error",
        "no-shadow": [
            "error",
            {
                hoist: "all"
            }
        ],
        "no-sparse-arrays": "error",
        "no-template-curly-in-string": "error",
        "no-throw-literal": "error",
        "no-trailing-spaces": "error",
        "no-undef-init": "error",
        "no-underscore-dangle": "error",
        "no-unsafe-finally": "error",
        "no-unused-expressions": "error",
        "no-unused-labels": "error",
        "no-useless-constructor": "off",
        "@typescript-eslint/no-useless-constructor": "error",
        "no-var": "error",
        "no-void": "off",
        "object-shorthand": "error",
        "one-var": [
            "error",
            "never"
        ],
        "padding-line-between-statements": [
            "error",
            {
                blankLine: "always",
                prev: "*",
                next: "return"
            }
        ],
        "prefer-arrow/prefer-arrow-functions": "error",
        "prefer-const": "error",
        "prefer-object-spread": "error",
        "prefer-template": "error",
        "quote-props": [
            "error",
            "consistent-as-needed"
        ],
        "radix": "error",
        "space-before-function-paren": [
            "error",
            {
                anonymous: "never",
                asyncArrow: "always",
                named: "never"
            }
        ],
        "space-in-parens": [
            "error",
            "never"
        ],
        "spaced-comment": [
            "error",
            "always",
            {
                exceptions: ["/"]
            }
        ],
        "use-isnan": "error",
        "yoda": "error",
        "@typescript-eslint/tslint/config": [
            "error",
            {
                rules: {
                    "comment-type": [
                        true,
                        "singleline",
                        "multiline",
                        "doc",
                        "directive"
                    ],
                    "encoding": true,
                    "import-spacing": true,
                    "invalid-void": true,
                    "jsdoc-format": true,
                    "match-default-export-name": true,
                    "no-boolean-literal-compare": true,
                    "no-default-import": true,
                    "no-dynamic-delete": true,
                    "no-inferred-empty-object-type": true,
                    "no-mergeable-namespace": true,
                    "no-promise-as-boolean": true,
                    "no-reference-import": true,
                    "no-restricted-globals": true,
                    "no-tautology-expression": true,
                    "no-unnecessary-callback-wrapper": true,
                    "no-unsafe-any": true,
                    "number-literal-format": true,
                    "one-line": [
                        true,
                        "check-catch",
                        "check-else",
                        "check-finally",
                        "check-open-brace",
                        "check-whitespace"
                    ],
                    "prefer-conditional-expression": true,
                    "prefer-method-signature": true,
                    "prefer-switch": true,
                    "prefer-while": true,
                    "return-undefined": true,
                    "static-this": true,
                    "strict-string-expressions": true,
                    "strict-type-predicates": true,
                    "switch-final-break": true,
                    "whitespace": [
                        true,
                        "check-branch",
                        "check-decl",
                        "check-operator",
                        "check-module",
                        "check-separator",
                        "check-type",
                        "check-typecast",
                        "check-preblock",
                        "check-type-operator",
                        "check-rest-spread"
                    ]
                }
            }
        ]
    }
};
