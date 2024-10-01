import React, { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css"; // Import CSS for date picker

function Form() {
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  const schema = yup.object({
    firstName: yup
      .string()
      .matches(/^(?!\s*$).+/, "First Name cannot be empty or just spaces")
      .required("First Name is a required field"),
    lastName: yup.string().required("Last Name is a required field"),
    password: yup
      .string()
      .required("Password is a required field")
      .min(8, "Password length must be at least 8 characters"),
  });

  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: {
      firstName: "",
      lastName: "",
      password: "",
    },
    resolver: yupResolver(schema),
  });
  function handleStartDateChange(date) {
    setStartDate(date);
    if (endDate && date > endDate) {
      setEndDate(null); // Reset end date if the start date is after it
    }
  }

  function handleEndDateChange(date) {
    setEndDate(date);
  }
  const onSubmit = async (data) => {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    console.log("Form Data Submitted:", data);
    setStartDate(null);
    setEndDate(null);
    reset();
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="max-w-md w-full p-6 border border-gray-300 rounded-lg shadow-lg bg-white">
        <h2 className="text-xl font-bold mb-4">FORM</h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          <label htmlFor="firstName" className="block font-medium mb-1">
            First Name
          </label>
          <input
            type="text"
            id="firstName"
            placeholder="Enter your first name"
            {...register("firstName")}
            onInput={(e) => {
              // Prevent spaces in input

              // e.target.value = e.target.value.replace(/\s/g, '');//first Approach
              // important - second Approach
              if (e.target.value.startsWith(" ")) {
                e.target.value = e.target.value.trimStart();
              }
            }}
            className="w-full border border-gray-300 rounded p-2 mb-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {errors.firstName && (
            <div className="text-red-500 text-sm">
              {errors.firstName.message}
            </div>
          )}

          <label htmlFor="lastName" className="block font-medium mb-1">
            Last Name
          </label>
          <input
            type="text"
            id="lastName"
            placeholder="Enter your last name"
            {...register("lastName")}
            className="w-full border border-gray-300 rounded p-2 mb-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {errors.lastName && (
            <div className="text-red-500 text-sm">
              {errors.lastName.message}
            </div>
          )}

          <label htmlFor="password" className="block font-medium mb-1">
            Password
          </label>
          <input
            type="password"
            id="password"
            placeholder="Enter your password"
            {...register("password")}
            className="w-full border border-gray-300 rounded p-2 mb-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {errors.password && (
            <div className="text-red-500 text-sm">
              {errors.password.message}
            </div>
          )}

          <label className="block font-medium mb-1">Select Date Range</label>
          <div className="mb-4">
            <label className="block font-medium mb-1">Start Date</label>
            <Controller
              control={control}
              name="startDate"
              render={({ field: { onChange } }) => (
                <DatePicker
                  selected={startDate}
                  onChange={(date) => {
                    handleStartDateChange(date);
                    onChange(date); // Update react-hook-form state
                  }}
                  className="w-full border border-gray-300 rounded p-2 mb-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholderText="Select start date"
                />
              )}
            />
          </div>

          <div className="mb-4">
            <label className="block font-medium mb-1">End Date</label>
            <Controller
              control={control}
              name="endDate"
              render={({ field: { onChange } }) => (
                <DatePicker
                  selected={endDate}
                  onChange={(date) => {
                    handleEndDateChange(date);
                    onChange(date); // Update react-hook-form state
                  }}
                  minDate={startDate} // important-Prevent selecting an end date before start date startDate<=endDate
                  className="w-full border border-gray-300 rounded p-2 mb-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholderText="Select end date"
                />
              )}
            />
          </div>

          <button
            type="submit"
            className="w-full bg-green-500 text-white font-semibold py-2 rounded hover:bg-green-600 transition duration-200"
          >
            {isSubmitting ? "Loading..." : "Submit"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default Form;
