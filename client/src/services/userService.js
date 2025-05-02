// services/userService.js

/**
 * Normalizes a username by trimming whitespace and converting to lowercase.
 * @param {string} username - The username to normalize.
 * @returns {string} The normalized username.
 */
export const normalizeUsername = (username) => username?.trim().toLowerCase();
