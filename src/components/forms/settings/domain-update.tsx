import React from "react";
import { UseFormRegister, FieldValues, FieldErrors } from "react-hook-form";
import FormGenerator from "@/components/forms/form-generator";
type DomainUpdateProps = {
  name: string;
  register: UseFormRegister<FieldValues>;
  errors: FieldErrors<FieldValues>;
};

const DomainUpdate = ({ name, register, errors }: DomainUpdateProps) => {
  return (
    <div className="flex gap-2 pt-5 items-end w-[400px]">
      <FormGenerator
        label="Domain name"
        register={register}
        name="domain"
        type="text"
        placeholder={name}
        errors={errors}
        inputType="input"
      />
    </div>
  );
};

export default DomainUpdate;
