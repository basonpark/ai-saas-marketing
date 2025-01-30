import React from "react";
import { onLoginUser } from "@/actions/auth";
import { ChatProvider } from "@/context/use-chat-context";
import SideBar from "@/components/sidebar";

type Props = {
  children: React.ReactNode;
};

const OwnerLayout = async ({ children }: Props) => {
  const authenticated = await onLoginUser();
  if (!authenticated) return null;

  return (
    <ChatProvider>
      <div className="flex h-screen w-full">
        <SideBar domains={authenticated.domains} />
        <div className="w-full h-screen flex flex-col py-3 pr-10 pl-20 md:pl-4">
          {children}
        </div>
      </div>
    </ChatProvider>
  );
};

export default OwnerLayout;
