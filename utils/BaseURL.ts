export const baseURL: string =
    (typeof process !== "undefined" && process.env && process.env.NEXT_PUBLIC_API_BASE_URL) ||
    "https://humayon5000.naimulhassan.me";

export default baseURL;


