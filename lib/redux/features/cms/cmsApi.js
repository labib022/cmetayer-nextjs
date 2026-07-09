import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const cmsApi = createApi({
  reducerPath: "cmsApi",
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.NEXT_PUBLIC_API_BASE_URL?.replace(/\/$/, ""),
    prepareHeaders: (headers, { getState }) => {
      const token = getState().auth.accessToken;
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  endpoints: (builder) => ({

    // ✅ Home page
    getHomePage: builder.query({
      query: () => `/cms/?page_name=home`,
    }),

    // ✅ About Us page
    getAboutUsPage: builder.query({
      query: () => `/cms/?page_name=about_us`,
    }),

    // ✅ Service pages — moving, cleaning, laundry, repair
    getServicePage: builder.query({
      query: (pageName) => `/cms/?page_name=${pageName}`,
    }),

    // ✅ FAQs
    getFaqs: builder.query({
      query: () => "/faqs/",
    }),

    // ✅ About System
    getAboutSystem: builder.query({
      query: () => "/about-system/",
    }),

    // ✅ Legal pages — Privacy Policy & Terms
    // Usage: useGetLegalQuery("privacy") or useGetLegalQuery("terms")
    getLegal: builder.query({
      query: (type) => `/legal/?type=${type}`,
    }),

    // ✅ Contact Us (POST)
    contactUs: builder.mutation({
      query: (data) => {
        const fd = new FormData();
        fd.append("name", data.name);
        fd.append("email", data.email);
        fd.append("purpose", data.purpose || "general_inquiry");
        fd.append("message", data.message);
        return { url: "/contact-us/", method: "POST", body: fd };
      },
    }),

    // ✅ Quote Submission (Moving)
    submitQuote: builder.mutation({
      query: (data) => {
        const fd = new FormData();
        fd.append("name", data.name);
        fd.append("email", data.email);
        fd.append("phone", data.phone || "");
        fd.append("service", data.service || "home_cleaning");
        fd.append("message", data.message);
        fd.append(
          "moving_services",
          JSON.stringify(data.moving_services || []),
        );
        return {
          url: "/cms/?page_name=home&section_name=quote_submission",
          method: "POST",
          body: fd,
        };
      },
    }),

    // ✅ Repair Quote
    submitRepairQuote: builder.mutation({
      query: (data) => {
        const fd = new FormData();
        fd.append("name", data.name);
        fd.append("email", data.email);
        fd.append("phone", data.phone);
        fd.append("service", "handyman_&_repair");
        fd.append("service_category", data.serviceCategory);
        fd.append("message", data.message);
        if (data.image) fd.append("image", data.image);
        return {
          url: "/cms/?page_name=home&section_name=quote_submission",
          method: "POST",
          body: fd,
        };
      },
    }),

    // ✅ Laundry Price Calculate
    getLaundryPrice: builder.mutation({
      query: (data) => {
        const fd = new FormData();
        fd.append("bag_size", data.bag_size);
        return { url: "/laundry/price/", method: "POST", body: fd };
      },
    }),

    // ✅ Laundry Booking
    submitLaundryBooking: builder.mutation({
      query: (data) => ({
        url: "/laundry/book/",
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name:            data.name,
          email:           data.email,
          phone:           data.phone,
          bag_size:        data.bag_size,
          washing_items:   data.washing_items,
          detergent_type:  data.detergent_type,
          laundry_date:    data.laundry_date,
        }),
      }),
    }),

    // ✅ Cleaning Price Calculate
    getCleaningPrice: builder.mutation({
      query: (data) => {
        const fd = new FormData();
        fd.append("bedrooms", data.bedrooms);
        fd.append("bathrooms", data.bathrooms);
        fd.append("services_category", data.services_category);
        fd.append("frequency", data.frequency);
        return { url: "/cleaning/price/", method: "POST", body: fd };
      },
    }),

    // ✅ Cleaning Booking
    submitCleaningBooking: builder.mutation({
      query: (data) => ({
        url: "/cleaning/book/",
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name:              data.name,
          email:             data.email,
          phone:             data.phone,
          bedrooms:          data.bedrooms,
          bathrooms:         data.bathrooms,
          services_category: data.services_category,
          frequency:         data.frequency,
          cleaning_date:     data.cleaning_date,
        }),
      }),
    }),

  }),
});

export const {
  useGetHomePageQuery,
  useGetAboutUsPageQuery,
  useGetServicePageQuery,
  useGetFaqsQuery,
  useGetAboutSystemQuery,
  useGetLegalQuery,
  useContactUsMutation,
  useSubmitQuoteMutation,
  useSubmitRepairQuoteMutation,
  useGetLaundryPriceMutation,
  useSubmitLaundryBookingMutation,
  useGetCleaningPriceMutation,
  useSubmitCleaningBookingMutation,
} = cmsApi;