import React from "react";
import InfoBar from "@/components/infobar";
import BillingSettings from "@/components/settings/billing-settings";

type Props = {};

const Page = (props: Props) => {
  return (
    <>
      <InfoBar />
      <div
        className="overflow-y-auto w-full chat-windo flex-1 h-0 flex
      flex-col gap-10"
      >
        <BillingSettings />
      </div>
    </>
  );
};

export default Page;
