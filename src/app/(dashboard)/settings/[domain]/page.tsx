import React from "react";
import { onGetCurrentDomainInfo } from "@/actions/settings";
import { redirect } from "next/navigation";
import Infobar from "@/components/infobar";
import SettingsForm from "@/components/forms/settings/form";
import BotTrainingForm from "@/components/forms/settings/bot-training";
type Props = {
  params: {
    domain: string;
  };
};

const DomainSettingsPage = async ({ params }: Props) => {
  const domain = await onGetCurrentDomainInfo(params.domain);
  if (!domain) redirect("/dashboard");

  return (
    <>
      <Infobar />
      <div className="overflow-y-auto w-full chat-window flex-1 h-0">
        <SettingsForm
          plan={domain.subscription?.plan}
          chatBot={domain.domains[0].chatBot}
          id={domain.domains[0].id}
          name={domain.domains[0].id}
        />
        <BotTrainingForm id={domain.domains[0].id} />
      </div>
    </>
  );
};

export default DomainSettingsPage;
