import { baseApi } from "../baseApi";

export const AppUsersApi = baseApi.injectEndpoints({
    endpoints:(builder) =>({
        getAppUsersData : builder.mutation({
            query(slug){
                return {
                    url:`/api/app/appUserType`,
                    method:'get',
                    headers:{
                        "Content-Type": "application/json",
                        "slug":slug
                    },
                    
                   
                }
            }
        })
    })
});


export const {useGetAppUsersDataMutation} = AppUsersApi

