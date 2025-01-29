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
import { onCreateHelpDeskQuestion, onUpdatePassword } from "@/actions/settings";
import { ChangePasswordProps } from "@/schemas/auth.schema";
import {
  DomainSettingsProps,
  HelpDeskQuestionsProps,
  HelpDeskQuestionsSchema,
} from "@/schemas/settings.schema";
import { DomainSettingsSchema } from "@/schemas/settings.schema";
import { useRouter } from "next/navigation";
import { onUpdateDomain } from "@/actions/settings";
import { onChatBotImageUpdate } from "@/actions/settings";
import { onUpdateWelcomeMessage } from "@/actions/settings";
import { onDeleteUserDomain } from "@/actions/settings";
import { onGetAllHelpDeskQuestions } from "@/actions/settings";
import { useEffect } from "react";

const upload = new UploadClient({
  publicKey: process.env.NEXT_PUBLIC_UPLOADCARE_PUBLIC_KEY as string,
});

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

export const useSettings = (id: string) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<DomainSettingsProps>({
    resolver: zodResolver(DomainSettingsSchema),
  });
  const router = useRouter();
  const { toast } = useToast();
  const [loading, setLoading] = useState<boolean>(false);
  const [deleting, setDeleting] = useState<boolean>(false);

  const onUpdateSettings = handleSubmit(async (values) => {
    setLoading(true);
    if (values.domain) {
      const domain = await onUpdateDomain(id, values.domain);
      if (domain) {
        toast({
          title: "Success!",
          description: domain.message,
        });
      }
    }

    if (values.image[0]) {
      const uploaded = await upload.uploadFile(values.image[0]);
      const image = await onChatBotImageUpdate(id, uploaded.uuid);
      if (image) {
        toast({
          title: "Success!",
          description: image.message,
        });
        setLoading(false);
      }
    }
    if (values.welcomeMessage) {
      const message = await onUpdateWelcomeMessage(values.welcomeMessage, id);
      if (message) {
        toast({
          title: "Success!",
          description: message.message,
        });
      }
    }
    reset();
    router.refresh();
    setLoading(false);
  });

  const onDeleteDomain = async () => {
    setDeleting(true);
    const deleted = await onDeleteUserDomain(id);
    if (deleted) {
      toast({
        title: "Success!",
        description: deleted.message,
      });
      setDeleting(false);
      router.refresh();
    }
  };

  return {
    register,
    errors,
    onUpdateSettings,
    onDeleteDomain,
    loading,
    deleting,
  };
};

export const useHelpDesk = (id: string) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<HelpDeskQuestionsProps>({
    resolver: zodResolver(HelpDeskQuestionsSchema),
  });

  const { toast } = useToast();
  const [loading, setLoading] = useState<boolean>(false);
  const [isQuestions, setIsQuestions] = useState<
    { id: string; question: string; answer: string }[]
  >([]);
  const onSubmitQuestion = handleSubmit(async (values) => {
    setLoading(true);
    const question = await onCreateHelpDeskQuestion(
      id,
      values.question,
      values.answer
    );
    if (question) {
      setIsQuestions(question.questions!);
      toast({
        title: question.status === 200 ? "Success!" : "Error!",
        description: question.message,
      });
      setLoading(false);
      reset();
    }
  });

  const onGetQuestions = async () => {
    setLoading(true);
    const questions = await onGetAllHelpDeskQuestions(id);
    if (questions) {
      setIsQuestions(questions.questions);
      setLoading(false);
    }
  };

  useEffect(() => {
    onGetQuestions();
  }, []);

  return {
    register,
    errors,
    onSubmitQuestion,
    onGetQuestions,
    loading,
    isQuestions,
  };
};

export const useFilterQuestions = (id: string) => {
  const {
    register={register}
    errors={errors}
    
  }
};
