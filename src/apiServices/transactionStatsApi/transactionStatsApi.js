import { baseApi } from '../baseApi';
import {slug} from '../../utils/Slug';

export const transactionStatsApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({

      
          getTransactionStats: builder.mutation({
            query: (token) => {
              console.log("params", token)
              return {
                method: "GET",
                url: `/api/app/paymentTransfer/stats`,
                headers: {
                  Authorization: "Bearer " + token,
                  slug: slug,
                },
                // body: params.body,
              };
            },
          }),
      
        }),
   });
   
   export const {useGetTransactionStatsMutation} = transactionStatsApi;