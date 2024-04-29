import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { setUser, setIsAuthenticated } from "../slice/userSlice";

export const userApi = createApi({
  reducerPath: "userApi",
  baseQuery: fetchBaseQuery({ baseUrl: "/api" }),
  tagTypes: ["User", "AdminUsers"],
  endpoints: (builder) => ({
    getMe: builder.query({
      query: () => "/me",
      transformResponse: (result) => result.user,
      async onQueryStarted(args, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          //console.log(data);
          dispatch(setUser(data));
          dispatch(setIsAuthenticated(true));
        } catch (err) {
          console.log(err);
        }
      },
      providesTags: ["User"],
    }),

    updateProfile: builder.mutation({
      query(body) {
        return {
          url: "/me/update",
          method: "PUT",
          body,
        };
      },
      invalidatesTags: ["User"],
    }),

    updateOtherDetails: builder.mutation({
      query(body) {
        return {
          url: "/me/updateOtherDetails",
          method: "PUT",
          body,
        };
      },
      invalidatesTags: ["User"],
    }),

    updatePassword: builder.mutation({
      query(body) {
        return {
          url: "/password/update",
          method: "PUT",
          body,
        };
      },
    }),

    saveJob: builder.mutation({
      query(body) {
        return {
          url: "/saveJob",
          method: "PUT",
          body,
        };
      },
      invalidatesTags: ["User"],
    }),

    deleteSavedJob: builder.mutation({
      query(id) {
        return {
          url: `/saveJobs/${id}`,
          method: "DELETE",
        };
      },
      invalidatesTags: ["User"],
    }),

    applyJob: builder.mutation({
      query(body) {
        return {
          url: "/applyJob",
          method: "PUT",
          body,
        };
      },
      invalidatesTags: ["User"],
    }),

    deleteAppliedJob: builder.mutation({
      query(id) {
        return {
          url: `/appliedJobs/${id}`,
          method: "DELETE",
        };
      },
      invalidatesTags: ["User"],
    }),

    getAllUsers: builder.query({
      query: () => "/admin/users",
      providesTags: ["AdminUsers"],
    }),

    getUserById: builder.query({
      query: (id) => `/admin/users/${id}`,
      providesTags: ["AdminUsers"],
    }),

    deleteUser: builder.mutation({
      query(id) {
        return {
          url: `/admin/users/${id}`,
          method: "DELETE",
        };
      },
      invalidatesTags: ["AdminUsers"],
    }),

    getUserJobsStats: builder.query({
      query: () => "/myStats",
    }),

    getAdminStats: builder.query({
      query: () => "/adminStats",
    }),
  }),
});

export const {
  useGetMeQuery,
  useUpdateProfileMutation,
  useUpdateOtherDetailsMutation,
  useUpdatePasswordMutation,
  useSaveJobMutation,
  useApplyJobMutation,
  useDeleteSavedJobMutation,
  useDeleteAppliedJobMutation,
  useGetAllUsersQuery,
  useGetUserByIdQuery,
  useDeleteUserMutation,
  useGetUserJobsStatsQuery,
  useGetAdminStatsQuery,
} = userApi;
