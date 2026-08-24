import { baseApi } from "@/utils/apiBaseQuery";

export const contactApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getSingleOrder: builder.query({
            query: ({ orderId }) => {
                return {
                    url: `/order/${orderId}`,
                    method: "GET",
                };
            },
            providesTags: ["order"]
        }),
    }),
});

export const {
    useGetSingleOrderQuery,
} = contactApi;

export default contactApi;

