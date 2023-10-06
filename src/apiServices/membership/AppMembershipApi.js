import { baseApi } from '../baseApi';
import {slug} from '../../utils/Slug';

export const AppMembershipApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
    getActiveMembership: builder.mutation({
    query: (token) => {
    return {
    method: "GET",
    url: `/api/app/membership/active`,
    headers: {
    "Content-Type": "application/json",
    Authorization: "Bearer " + token,
    slug: slug,
    },
    };
    },
    }),
   
   
    getMembership: builder.mutation({
    query: (params) => {
    return {
    method: "GET",
    url: `/api/app/membership`,
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
   
   export const { useGetActiveMembershipMutation,useGetMembershipMutation} = AppMembershipApi;