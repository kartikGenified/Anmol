import { baseApi } from "../baseApi";
import { slug } from "../../utils/Slug";
export const GetForms = baseApi.injectEndpoints({
    endpoints:(builder) =>({
        getForm : builder.mutation({
            query({form_type,token}){
                console.log(token,"and formId is",form_type)
                return {
                    method: "GET",
                    url: `/api/app/formTemplate/tenant/?form_type=${form_type}`,
                    headers: {
                      "Content-Type": "application/json",
                      Authorization: "Bearer " + token,
                      slug: slug,
                    },
            }
        }
        })
    })
});


export const {useGetFormMutation} = GetForms

