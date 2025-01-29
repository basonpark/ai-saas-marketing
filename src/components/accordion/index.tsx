import React from "react";
import { Accordion as ShadcnAccordion } from "@/components/ui/accordion";
import { AccordionItem } from "@/components/ui/accordion";
import { AccordionTrigger } from "@/components/ui/accordion";
import { AccordionContent } from "@/components/ui/accordion";

type Props = {
  trigger: string;
  content: string;
};

const Accordion = ({ trigger, content }: Props) => {
  return (
    <ShadcnAccordion type="single" collapsible>
      <AccordionItem value="item-1">
        <AccordionTrigger>{trigger}</AccordionTrigger>
        <AccordionContent>{content}</AccordionContent>
      </AccordionItem>
    </ShadcnAccordion>
  );
};

export default Accordion;
