import { onGetAllAccountDomains } from "@/actions/settings";
import React from "react";
import { Separator } from "@/components/ui/separator";
import Infobar from "@/components/infobar";
import ConversationMenu from "@/components/conversations";

type Props = {};

const ConversationPage = async (props: Props) => {
  const domains = await onGetAllAccountDomains();
  return (
    <div className="w-full h-full flex">
      <ConversationMenu domains={domains?.domains} />
      <Separator orientation="vertical" />
      <div className="w-full flex flex-col">
        <div className="px-5">
          <Infobar />
        </div>
        {/* <Messenger /> */}
      </div>
    </div>
  );
};

export default ConversationPage;
