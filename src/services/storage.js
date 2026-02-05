// Store and retrieve data in localStorage
export function getStoredItem(key, defaultValue = null) {
    try{
        const item = localStorage.getItem(key);

        // if nothing, return default
        if (!item) return defaultValue;

        return JSON.parse(item);

    } catch (error) {
        console.error(`Error reading from localStorage: ${error.message}`);
        return defaultValue;
    }
}