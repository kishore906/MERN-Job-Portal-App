import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const jobApi = createApi({
  reducerPath: "jobApi",
  baseQuery: fetchBaseQuery({ baseUrl: "/api" }),
  tagTypes: ["AdminJobs"],
  endpoints: (builder) => ({
    getJobs: builder.query({
      query: (params) => ({
        url: "/searchJobs",
        params: {
          search: params?.searchKeyword,
          jobType: params?.searchJobType,
          page: params?.page,
        },
      }),
    }),

    getAllJobs: builder.query({
      query: () => "/admin/jobs",
      providesTags: ["AdminJobs"],
    }),

    getJobById: builder.query({
      query: (id) => `/jobs/${id}`,
      providesTags: ["AdminJobs"],
    }),

    addNewJob: builder.mutation({
      query(body) {
        return {
          url: "/admin/jobs",
          method: "POST",
          body,
        };
      },
      invalidatesTags: ["AdminJobs"],
    }),

    updateJob: builder.mutation({
      query({ id, body }) {
        return {
          url: `/admin/jobs/${id}`,
          method: "PUT",
          body,
        };
      },
      invalidatesTags: ["AdminJobs"],
    }),

    deleteJob: builder.mutation({
      query(id) {
        return {
          url: `/admin/jobs/${id}`,
          method: "DELETE",
        };
      },
      invalidatesTags: ["AdminJobs"],
    }),

    updateJobStatusForUser: builder.mutation({
      query(body) {
        return {
          url: "/admin/updateJobStatusForUser",
          method: "PUT",
          body,
        };
      },
      invalidatesTags: ["AdminJobs"],
    }),
  }),
});

export const {
  useGetJobsQuery,
  useGetJobByIdQuery,
  useGetAllJobsQuery,
  useAddNewJobMutation,
  useUpdateJobMutation,
  useDeleteJobMutation,
  useUpdateJobStatusForUserMutation,
} = jobApi;
