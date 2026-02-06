// Store and retrieve data in localStorage
export function getStoredItem(key, defaultValue = null) {
  try {
    const item = localStorage.getItem(key);

    // if nothing, return default
    if (!item) return defaultValue;

    return JSON.parse(item);
  } catch (error) {
    console.error(`Error reading from localStorage: ${error.message}`);
    return defaultValue;
  }
}

// store item in localStorage
export function setStoredItem(key, value) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
    return true;
  } catch (error) {
    console.error(`Error writing to localStorage: ${error.message}`);
    return false;
  }
}

// remove item from localStorage
export function removeStoredItem(key) {
  try {
    localStorage.removeItem(key);
    return true;
  } catch (error) {
    console.error(`Error removing from localStorage: ${error.message}`);
    return false;
  }
}
