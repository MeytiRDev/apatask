"use client";
import { Children, cloneElement, ReactElement } from "react";
import {
  Controller,
  type RegisterOptions,
  useFormContext,
} from "react-hook-form";

export default function RHFContext({
  name,
  rules,
  children,
}: {
  name: string;
  children: ReactElement | ReactElement[];
  rules?: RegisterOptions;
}) {
  const {
    control,
    formState: { errors },
  } = useFormContext();
  return (
    <div>
      <Controller
        name={name}
        control={control}
        rules={rules}
        render={({ field }) => {
          const fields = Children.map(children, (child, i) => {
            return cloneElement<any>(child, { RHFConfigs: { field, name } });
          });

          return fields as any;
        }}
      />
      <p role="alert" className="empty:hidden text-red-500 text-sm mt-1">
        {errors[name]?.message as string}
      </p>
    </div>
  );
}
