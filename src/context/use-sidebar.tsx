import React, { useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { useToast } from "@/components/ui/use-toast";
import { useClerk } from "@clerk/nextjs";
import { useChatContext } from "@/context/user-chat-context";

type Props = {};

const useSideBar = (props: Props) => {
  const [expand, setExpand] = useState<boolean | undefined>(undefined);
  const router = useRouter();
  const pathname = usePathname();
  const { toast } = useToast();
  const [realtime, setRealtime] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  const { chatRoom } = useChatContext();

  return <div>use-sidebar</div>;
};

export default useSideBar;
