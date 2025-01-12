/**
 * @typedef {Object} CollisionExports
 * @property {function(number, number): number} add - Adds two numbers.
 */

/** @type {WebAssembly.Instance} */
let wasm;

/**
 * @param {WebAssembly.Memory} memory
 * @param {number} offset
 * @param {number} length
 * @returns {string}
 */
function getStr(memory, offset, length) {
    return new TextDecoder().decode(new Uint8ClampedArray(memory.buffer, offset, length));
}

/**
 * @returns {WebAssembly.Imports} imports
 */
function getImportObject() {
    /** @type {WebAssembly.Memory} */
    // @ts-expect-error
    const mem = wasm.exports.memory;
    return {
        "env": {
            /**
             * @param {number} ptr - ptr from c where the string starts
             * @param {number} len - length of the string from c
             */
            "console": (ptr, len) => { console.info(getStr(mem, ptr, len)); }
        }
    };
}

/**
 * @returns {Promise<CollisionExports>}
 */
export async function loadCollisionWasm() {
    const importObject = getImportObject();
    const { instance, module } = await WebAssembly.instantiateStreaming(fetch("./lib/collision/collision.wasm"), importObject);

    wasm = instance;

    console.info(instance, module);

    return {
        // @ts-expect-error
        add: instance.exports.add
    }
}
