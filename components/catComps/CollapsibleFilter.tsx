/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import {
  Collapsible,
  CollapsibleTrigger,
  CollapsibleContent,
} from "@/components/ui/collapsible";

const CollapsibleFilter = ({ title, children, defaultOpen = false }: any) => {
  const [isOpen, setIsOpen] = React.useState(defaultOpen);

  return (
    <Collapsible open={isOpen} onOpenChange={setIsOpen}>
      <CollapsibleTrigger className="flex w-full items-center justify-between py-2 font-semibold">
        {title}
        <span>{isOpen ? "-" : "+"}</span>
      </CollapsibleTrigger>
      <CollapsibleContent>{children}</CollapsibleContent>
    </Collapsible>
  );
};

export default CollapsibleFilter;
