"use client";
import React from "react";
import { AuthContextProvider } from "@/context/use-auth-context";
import { FormProvider } from "react-hook-form";
import useSignUpForm from "@/hooks/sign-up/use-sign-up";
import { Loader } from "@/components/loader";

type Props = {
  children: React.ReactNode;
};

const SignUpFormProvider = ({ children }: Props) => {
  const { methods, onHandleSubmit, loading, onGenerateOTP } = useSignUpForm();

  return (
    <AuthContextProvider>
      <FormProvider {...methods}>
        <form onSubmit={onHandleSubmit} className="h-full">
          <div className="flex flex-col justify-between gap-3 h-full">
            <Loader loading={loading}>{children}</Loader>
          </div>
        </form>
      </FormProvider>
    </AuthContextProvider>
  );
};

export default SignUpFormProvider;
