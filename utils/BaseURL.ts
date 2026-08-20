export const baseURL: string =
    (typeof process !== "undefined" && process.env && process.env.NEXT_PUBLIC_API_BASE_URL) ||
    "http://10.10.26.185:4000";

export default baseURL;


