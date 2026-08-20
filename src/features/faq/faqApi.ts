import { baseApi } from "@/utils/apiBaseQuery";

export interface FaqItem {
    _id: string;
    question: string;
    answer: string;
    createdAt?: string;
    updatedAt?: string;
}

export interface GetAllFaqResponse {
    success: boolean;
    message: string;
    meta?: {
        page: number;
        limit: number;
        total: number;
        totalPage: number;
    };
    data?: FaqItem[];
}

export const faqApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getAllFaq: builder.query<GetAllFaqResponse, { page?: number } | void>({
            query: (params) => {
                const page = params?.page || 1;
                return {
                    url: `/faq?limit=100`,
                    method: "GET",
                };
            },
            providesTags: ["faq"],
        }),
    }),
});

export const {
    useGetAllFaqQuery,
} = faqApi;

