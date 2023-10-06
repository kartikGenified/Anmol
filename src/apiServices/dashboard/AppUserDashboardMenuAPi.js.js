import { baseApi } from "../baseApi";
import { slug } from "../../utils/Slug";



export const AppUserDashboardMenuAPi = baseApi.injectEndpoints({
    endpoints: (builder) =>({
        getAppMenuData : builder.mutation({
            query(token){
                
                console.log("token is",token)
                return {
                    url:`/api/admin/appUserMenu/${slug}`,
                    method:'get',
                    headers:{
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${token}`,
                        
                    }, 
                }
            }
        })
    })
});


export const {useGetAppMenuDataMutation} = AppUserDashboardMenuAPi

