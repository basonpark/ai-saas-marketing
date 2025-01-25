"use client";
import React from "react";
import { UseFormRegister, FieldValues } from "react-hook-form";
import { Card, CardDescription } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { User } from "lucide-react";
import { CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

type Props = {
  value: string;
  title: string;
  text: string;
  register: UseFormRegister<FieldValues>;
  userType: "owner" | "student";
  setUserType: React.Dispatch<React.SetStateAction<"owner" | "student">>;
};

const UserTypeCard = ({
  register,
  setUserType,
  text,
  title,
  value,
  userType,
}: Props) => {
  return (
    <Label htmlFor={value}>
      <Card
        className={cn(
          "w-full cursor-pointer",
          userType == value && "border-orange"
        )}
      >
        <CardContent className="flex justify-between p-2">
          <div className="flex items-center gap-3">
            <Card className={cn(userType == value && "border-orange")}>
              <User
                size={30}
                className={cn(
                  userType == value ? "text-orange" : "text-gray-400"
                )}
              />
            </Card>
            <div className="">
              <CardDescription className="text-iridium">
                {title}
              </CardDescription>
              <CardDescription className="text-gray-500">
                {text}
              </CardDescription>
            </div>
          </div>
          <div>
            <div
              className={cn(
                "w-4 h-4 rounded-full",
                userType == value ? "bg-peach" : "bg-transparent"
              )}
            >
              <Input
                {...register("type", {
                  onChange: (event) => setUserType(event.target.value),
                })}
                value={value}
                id={value}
                className="hidden"
                type="radio"
              />
            </div>
          </div>
        </CardContent>
      </Card>
    </Label>
  );
};

export default UserTypeCard;
