import React from "react";
import { onLoginUser } from "@/actions/auth";
import { ChatProvider } from "@/context/user-chat-context";

type Props = {
  children: React.ReactNode;
};

const OwnerLayout = async ({ children }: Props) => {
  const authenticated = await onLoginUser();
  if (!authenticated) return null;

  return (
    <ChatProvider>
      <div className="flex h-screen w-full">{children}</div>
    </ChatProvider>
  );
};

export default OwnerLayout;
