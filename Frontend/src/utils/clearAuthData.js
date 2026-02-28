/**
 * Clear all authentication and user data from localStorage
 * This ensures the system starts in a credential-free state
 */

export const clearAllLocalStorage = () => {
    // List of all localStorage keys used by the application
    const keysToRemove = [
        'userId',
        'userType',
        'username',
        'email',
        'password',
        'token',
        'jwt',
        'session',
        'authToken',
        'accessToken',
        'refreshToken',
        'isLoggedIn'
    ];

    keysToRemove.forEach(key => {
        localStorage.removeItem(key);
    });

    // Also clear entire localStorage to ensure no residual data
    // Uncomment the line below if you want to completely clear all localStorage
    // localStorage.clear();

    console.log('✓ All user authentication data cleared from localStorage');
};

/**
 * Clear all session and authentication data
 * Removes data from both localStorage and sessionStorage
 */

export const clearAllAuthenticationData = () => {
    // Clear localStorage
    clearAllLocalStorage();

    // Clear sessionStorage
    sessionStorage.clear();

    // Clear cookies (basic implementation)
    document.cookie.split(";").forEach((c) => {
        document.cookie = c
            .replace(/^ +/, "")
            .replace(/=.*/, `=;expires=${new Date().toUTCString()};path=/`);
    });

    console.log('✓ All authentication data cleared (localStorage, sessionStorage, and cookies)');
};
