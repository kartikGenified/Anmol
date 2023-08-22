import { baseApi } from "../baseApi";
import { slug } from "../../utils/Slug";
export const AddQrApi = baseApi.injectEndpoints({
    endpoints:(builder) =>({
        addQr : builder.mutation({
            query({token,requestData}){
                console.log(token,"and",requestData)
                return {
                    url:`api/tenant/qrScanHistory/add`,
                    method:'post',
                    headers:{
                        "Content-Type": "application/json",
                        "slug":slug,
                        "Authorization": `Bearer ${token}`,
                    },
                    body:JSON.stringify(requestData)
                    
                   
                }
            }
        })
    })
});


export const {useAddQrMutation} = AddQrApi

