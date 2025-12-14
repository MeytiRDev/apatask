"use client";
import { twMerge } from "tailwind-merge";
import { ReactElement } from "react";
import "./style.css";

export type CustomInputProps = {
  RHFConfigs?: {
    name?: string | null;
    field?: object | null;
  };
  inputConfigs?: {
    type?: string;
    placeholder?: string;
    className?: string;
    label?: string;
    onInput?: () => void;
    onChange?: () => void;
  };
  viewConfigs?: {
    icon?: any;
  };
  events?: {
    onInput?: Function;
    onPaste?: Function;
    onBeforeInput?: Function;
  };

  varient?: keyof typeof varients;
  icon?: ReactElement;
};

const varients = {
  primary: "flex items-center gap-2 px-2 border-b border-solid border-white/10",
};

export default function CInput({
  RHFConfigs = { field: null, name: null },
  inputConfigs = {
    type: "text",
    placeholder: "",
    className: "",
    onChange: () => {},
    label: "",
  },
  events,
  varient = "primary",
  icon,
}: CustomInputProps) {
  function focusAndBlurFn(type: "focus" | "blur") {
    return (e: FocusEvent) => {
      const input = e.target as HTMLInputElement;
      const parent = input.parentElement as HTMLDivElement;
      if (type === "focus") {
        parent.classList.replace("border-gray-300", "border-green-600");
        return;
      }
      parent.classList.replace("border-green-600", "border-gray-300");
    };
  }

  return (
    <div className="w-full">
      <label className="font-dana-medium mb-10">{inputConfigs.label}</label>
      <div id="wrapper_input" className={varients[varient]}>
        {<div className="shrink-0">{icon}</div>}
        <input
          type={inputConfigs.type}
          onChange={inputConfigs.onChange}
          placeholder={inputConfigs.placeholder}
          autoComplete="off"
          className={twMerge(
            "w-72 h-10 placeholder:text-white/75",
            inputConfigs.className
          )}
          onFocus={focusAndBlurFn("focus") as any}
          onPaste={events?.onPaste as any}
          onBlur={focusAndBlurFn("blur") as any}
          onInput={events?.onInput as any}
          onBeforeInput={events?.onBeforeInput as any}
          {...(RHFConfigs?.field ? RHFConfigs?.field : {})}
        />
      </div>
    </div>
  );
}
