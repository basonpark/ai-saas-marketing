"use client";
import React, { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { useToast } from "@/components/ui/use-toast";
import { useClerk } from "@clerk/nextjs";
import { useChatContext } from "@/context/use-chat-context";
import { onToggleRealtime } from "@/actions/conversation";
import { onGetConversationMode } from "@/actions/conversation";
import { onGetDomainChatRooms } from "@/actions/conversation";

type Props = {};

export const useSideBar = (props: Props) => {
  const [expand, setExpand] = useState<boolean | undefined>(undefined);
  const router = useRouter();
  const pathname = usePathname();
  const { toast } = useToast();
  const [realtime, setRealtime] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const { signOut } = useClerk();
  const { chatRoom } = useChatContext();

  const onActivateRealtime = async (e: any) => {
    try {
      const realtime = await onToggleRealtime(
        chatRoom!,
        e.target.ariaChecked == "true" ? false : true
      );
      if (realtime) {
        setRealtime(realtime.chatRoom.live);
        toast({
          title: "Success",
          description: realtime.message,
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  const onGetCurrentMode = async () => {
    setLoading(true);
    const mode = await onGetConversationMode(chatRoom!);
    if (mode) {
      setRealtime(mode.live);
      setLoading(false);
    }
  };

  useEffect(() => {
    if (chatRoom) {
      onGetCurrentMode();
    }
  }, [chatRoom]);

  const onSignOut = () => {
    signOut();
  };

  const onExpand = () => setExpand((prev) => !prev);

  return {
    expand,
    onExpand,
    page: pathname.split("/")[1],
    onSignOut,
    realtime,
    onActivateRealtime,
    loading,
  };
};
