export const saveToken = (token) => {
    localStorage.setItem("Denior-admin-token", token);
    // Set cookie so Next.js middleware can read it for route protection
    document.cookie = `Denior-admin-token=${token}; path=/; max-age=${60 * 60 * 24 * 7}; SameSite=Lax`;
};

export const getToken = () => {
    return localStorage.getItem("Denior-admin-token");
};

export const removeToken = () => {
    localStorage.removeItem("Denior-admin-token");
    // Remove cookie
    document.cookie = "Denior-admin-token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT";
};
