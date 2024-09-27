import React from "react";
import { useForm } from "react-hook-form";

function Form() {
  const { register, handleSubmit, reset, watch, setValue, getValues } =
    useForm();
  const onSubmit = (data) => {
    console.log("Form Data Submitted:", data);
    reset();
  };
  return (
    <>
      <div>Form</div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <label htmlFor="firstName">FirstName</label>
        <input type="text" name="firstName" {...register("firstName")} />
        <label htmlFor="lastName">LastName</label>
        <input type="text" name="lastName" {...register("lastName")} />
        <label htmlFor="password">Password</label>
        <input type="password"  {...register("password")}/>
        <button type="submit"> Submit</button>
      </form>
    </>
  );
}

export default Form;
