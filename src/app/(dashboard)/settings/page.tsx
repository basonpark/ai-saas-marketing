import React from "react";
import InfoBar from "@/components/infobar";
import BillingSettings from "@/components/settings/billing-settings";
import DarkModetoggle from "@/components/settings/dark-mode";
import ChangePassword from "@/components/settings/change-password";

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
        <DarkModetoggle />
        <ChangePassword />
      </div>
    </>
  );
};

export default Page;
