import React from "react";
import { Spinner } from "../spinner";
import { cn } from "@/lib/utils";

type LoaderProps = {
  loading: boolean;
  children: React.ReactNode;
  className?: string;
  noPadding?: boolean;
};

export const Loader = ({
  loading,
  children,
  noPadding,
  className,
}: LoaderProps) => {
  if (loading) {
    return (
      <div className={cn(className || "w-full py-5 flex justify-center")}>
        <Spinner noPadding={noPadding} />
      </div>
    );
  }
  return children;
};
