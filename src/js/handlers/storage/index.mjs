/**
 * Saves a value to the local storage using the provided key.
 *
 * @param {string} key - The key under which to store the value.
 * @param {any} value - The value to be stored.
 *
 * @example
 * // Save user data to local storage
 * save("userData", { name: "John", age: 30 });
 */
export function save(key, value) {
    localStorage.setItem(key, JSON.stringify(value));
}

/**
 * Loads a value from local storage using the provided key.
 *
 * @param {string} key - The key under which the value is stored.
 * @returns {any} The value retrieved from local storage.
 *
 * @example
 * // Load user data from local storage
 * const userData = load("userData");
 * console.log(userData); // Output: { name: "John", age: 30 }
 */
export function load(key) {
    const value = localStorage.getItem(key);
    return JSON.parse(value);
  }

  /**
 * Removes a value from local storage using the provided key.
 *
 * @param {string} key - The key under which the value is stored.
 *
 * @example
 * // Remove user data from local storage
 * remove("userData");
 */
  export function remove(key) {
    const value = localStorage.removeItem(key);
  }
  
  /**
 * Clears all values stored in the local storage.
 *
 * @example
 * // Clear all local storage data
 * clear();
 */
  export function clear() {
    localStorage.clear();
  }