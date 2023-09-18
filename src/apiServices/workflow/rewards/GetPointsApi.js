import {baseApi} from '../../baseApi';
import {slug} from '../../../utils/Slug';
export const GetForms = baseApi.injectEndpoints({
  endpoints: builder => ({
    checkUserPoint: builder.mutation({
      query: params => {
        return {
          method: 'GET',
          url: `api/app/userPointsEnteries/check?qr_id=${params.qrId}`,
          headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + params.token,
            slug: slug,
          },
        };
      },
    }),
    fetchUserPointsHistory: builder.mutation({
      query: (params) => {
        return {
          method: "POST",
          url: `api/app/userPointsEnteries?app_user_id=${params.userId}`,
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + params.token,
            slug: slug,
          },
        };
      },
    }),
    allUserPointsEntry: builder.mutation({
      query: params => {
        return {
          method: 'GET',
          url: `api/app/userPoints?user_id=${params.userId}`,
          headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + params.token,
            slug: slug,
          },
        };
      },
    }),
    userPointsEntry: builder.mutation({
      query: body => {
        console.log('body', body);
        return {
          method: 'POST',
          url: `api/app/userPointsEnteries/add?qr_id=${body.qrId}`,
          headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + body.token,
            slug: slug,
          },
          body: JSON.stringify(body.data),
        };
      },
    }),
  }),
});

export const {useCheckUserPointMutation, useUserPointsEntryMutation,useAllUserPointsEntryMutation,useFetchUserPointsHistoryMutation} = GetForms;
