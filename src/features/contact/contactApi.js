import { baseApi } from "@/utils/apiBaseQuery";

export const contactApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        createPartnerRequest: builder.mutation({
            query: (data) => {
                return {
                    url: `/users/partner-request`,
                    method: "POST",
                    body: data,
                };
            },
            invalidatesTags: ["contact"],
        }),
    }),
});

export const {
    useCreatePartnerRequestMutation,
} = contactApi;

export default contactApi;

