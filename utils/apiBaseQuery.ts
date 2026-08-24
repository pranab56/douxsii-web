import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { baseURL } from "./BaseURL";
import { getToken } from "./storage";

const cleanBaseURL = (baseURL || "").endsWith("/") ? baseURL.slice(0, -1) : (baseURL || "");
const finalBaseURL = cleanBaseURL.endsWith("/api/v1") ? cleanBaseURL : `${cleanBaseURL}/api/v1`;

export const baseApi = createApi({
    reducerPath: "baseApi",
    baseQuery: fetchBaseQuery({
        baseUrl: finalBaseURL,
        prepareHeaders: (headers) => {
            const token = getToken();
            if (token) {
                headers.set("authorization", `Bearer ${token}`);
            }
            return headers;
        },
    }),
    tagTypes: ["product", "user", "contact", "faq", "order"],
    endpoints: () => ({}),
});

export default baseApi;
