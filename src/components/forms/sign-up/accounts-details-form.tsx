import React from "react";
import { UseFormRegister, FieldErrors, FieldValues } from "react-hook-form";
import { USER_REGISTRATION_FORM } from "@/constants/forms";
import FormGenerator from "@/components/forms/form-generator";

type Props = {
  register: UseFormRegister<FieldValues>;
  errors: FieldErrors<FieldValues>;
};

const DetailForm = ({ errors, register }: Props) => {
  return (
    <>
      <h2 className="text-gravel md:text-4xl font-bold">Account details</h2>
      <p className="tet-iridium md:text-sm">Enter your email and password</p>
      {USER_REGISTRATION_FORM.map((field) => (
        <FormGenerator
          key={field.id}
          {...field}
          errors={errors}
          register={register}
          name={field.name}
        />
      ))}
    </>
  );
};

export default DetailForm;
