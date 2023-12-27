import { baseApi } from "../baseApi";
import { slug } from "../../utils/Slug";

export const CashbackRedeemApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    redeemCashback: builder.mutation({
      query: (params) => {
        return {
          method: "POST",
          url: `/api/app/cashbackRedemptions/add`,
          headers: {
            "Content-Type": "application/json",
            slug: slug,
            "Authorization": `Bearer ${params.token}`,
          },
          body: params.data
        };
      },
    }),
    addCashToBank: builder.mutation({

      query: (params) => {
        console.log("object", params.body);
        return {
          method: "POST",
          url: `/api/app/cashTranferToBank/add`,
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + params.token,
            slug: slug,
          },
          body: params.body
        };
      },
    }),
    getCashTransactions: builder.mutation({

      query: (params) => {
        console.log("object", params);
        return {
          method: "GET",
          url: `/api/tenant/cash-transactions/app-user?app_user_id=${params.appUserId}&limit=100&offset=0`,
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + params.token,
            slug: slug,
          },

        };
      },
    }),

    getCashTransactionsWithFilter: builder.mutation({
      query: (params) => {
        console.log("object filter---==-==-==>", params);
        let queryParams = "";
        if (params.start_date) {
          queryParams += `&start_date=${params.start_date}`;
        }
        if (params.end_date) {
          queryParams += `&end_date=${params.end_date}`;
        }
        return {
          method: "GET",
          url: `/api/tenant/cash-transactions/app-user?app_user_id=${params.appUserId}&limit=100&offset=0${queryParams}`,
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + params.token,
            slug: slug,
          },

        };
      },
    }),
  }),

});


export const { useRedeemCashbackMutation, useAddCashToBankMutation, useGetCashTransactionsMutation, useGetCashTransactionsWithFilterMutation } = CashbackRedeemApi
