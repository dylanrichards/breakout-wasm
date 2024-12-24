/**
 * @typedef {Object} CollisionExports
 * @property {function(number, number): number} add - Adds two numbers.
 */

/**
 * @returns {Promise<CollisionExports>}
 */
export async function loadCollisionWasm() {
    const { instance } = await WebAssembly.instantiateStreaming(fetch("./lib/collision/collision.wasm"));

    return {
        // @ts-expect-error
        add: instance.exports.add
    }
}
