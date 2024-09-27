import React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup"; 
import * as yup from "yup";

function Form() {
  const schema = yup.object({
    firstName: yup.string().required("First Name is a required field"),
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
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: {
      firstName: "",
      lastName: "",
      password: "",
    },
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data) => {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    console.log("Form Data Submitted:", data);
    reset();
  };

  return (
    <>
      <div>Form</div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <label htmlFor="firstName">First Name</label>
        <input
          type="text"
          id="firstName"
          {...register("firstName")} 
        />
        <br></br>
        {errors.firstName && <div>{errors.firstName.message}</div>}

        <label htmlFor="lastName">Last Name</label>
        <input type="text" id="lastName" {...register("lastName")} />
        <br></br>
        {errors.lastName && <div>{errors.lastName.message}</div>}

        <label htmlFor="password">Password</label>
        <input type="password" id="password" {...register("password")} />
        <br></br>
        {errors.password && <div>{errors.password.message}</div>}

        <button type="submit"> {isSubmitting ? "Loading" : "Submit"}</button>
      </form>
    </>
  );
}

export default Form;
