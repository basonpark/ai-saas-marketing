import { UploadClient } from "@uploadcare/upload-client";
import { useTheme } from "next-themes";
import Section from "@/components/section-label";
import { cn } from "@/lib/utils";
import { SystemMode } from "@/components/themes-placeholder/systemmode";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { ChangePasswordSchema } from "@/schemas/auth.schema";
import { useToast } from "@/components/ui/use-toast";
import { useState } from "react";
import { onUpdatePassword } from "@/actions/settings";
import { ChangePasswordProps } from "@/schemas/auth.schema";
// const upload = new UploadClient({
//   publicKey: process.env.NEXT_PUBLIC_UPLOADCARE_PUBLIC_KEY as string,
// });

export const useThemeMode = () => {
  const { setTheme, theme } = useTheme();
  return {
    setTheme,
    theme,
  };
};

export const useChangePassword = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ChangePasswordProps>({
    resolver: zodResolver(ChangePasswordSchema),
    mode: "onChange",
  });
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);

  const onChangePassword = handleSubmit(async (values) => {
    try {
      setLoading(true);
      const updated = await onUpdatePassword(values.password);
      if (updated) {
        reset();
        setLoading(false);
        toast({ title: "Success!", description: updated.message });
      }
    } catch (error) {
      console.log(error);
    }
  });
  return {
    register,
    errors,
    onChangePassword,
    loading,
  };
};
