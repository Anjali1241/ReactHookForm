import React from "react";
import { useForm } from "react-hook-form";

function Form() {
    const {register
        ,handleSubmit,reset,watch
        setValue,getValues

    }=useForm()
    const onSubmit=(data)=>{
        console.log("Form Data Submitted:", data);
        reset(); 
    }
  return (
    <>
      <div>Form</div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input type="text" name="firstName" />
        <input type="text" name="lastName" />
        <input type="password" />
        <button type="submit"> Submit</button>
      </form>
    </>
  );
}

export default Form;
