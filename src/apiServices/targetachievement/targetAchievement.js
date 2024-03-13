import { baseApi } from '../baseApi';
import { slug } from '../../utils/Slug';

export const TargetVsAchievementApi = baseApi.injectEndpoints({
    endpoints: builder => ({
        TargetVsAchievement: builder.mutation({
            query: (params) => {
                console.log(params)
                return {
                    method: "GET",
                    url: `/api/app/anmol/${params.app_user_id}/${params.month}/${params.year}`,
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

export const {
    useTargetVsAchievementMutation
} = TargetVsAchievementApi;