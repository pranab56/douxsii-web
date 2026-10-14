export const baseURL: string =
    (typeof process !== "undefined" && process.env && process.env.NEXT_PUBLIC_API_BASE_URL) ||
    "http://65.1.186.73:5000";

export default baseURL;


