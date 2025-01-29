import Section from "@/components/section-label";
import React from "react";
import { UseFormRegister, FieldValues, FieldErrors } from "react-hook-form";
import FormGenerator from "@/components/forms/form-generator";

type GreetingsMessageProps = {
  register: UseFormRegister<FieldValues>;
  errors: FieldErrors<FieldValues>;
  message: string;
};

const GreetingsMessage = ({
  register,
  errors,
  message,
}: GreetingsMessageProps) => {
  return (
    <div className="flex flex-col gap-2">
      <Section
        label="Greeting message"
        message="Customize your welcome message"
      />
      <div className="lg:w-[500px]">
        <FormGenerator
          placeholder={message}
          inputType="textarea"
          lines={2}
          register={register}
          errors={errors}
          name="welcomeMessage"
          type="text"
        />
      </div>
    </div>
  );
};

export default GreetingsMessage;
