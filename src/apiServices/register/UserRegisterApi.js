import { baseApi } from "../baseApi";
import { slug } from "../../utils/Slug";

export const UserRegisterApi = baseApi.injectEndpoints({
  endpoints: builder => ({
    registerUser: builder.mutation({
      query({mobile, name, user_type_id, user_type,is_approved_needed}) {
        console.log(mobile, name, user_type_id, user_type,is_approved_needed)
        return {
          url: `/api/app/appUserLogin/`,
          method: 'post',
          headers: {
            slug: slug,
            'Content-Type': 'application/json',
          },
          body:{
            "mobile" : mobile,
            "name":name,
            "user_type_id" : user_type_id,
            "user_type" : user_type,
            "is_approved_needed" : is_approved_needed
        }
        };
      },
    }),
  }),
});

export const {useRegisterUserMutation} = UserRegisterApi;
