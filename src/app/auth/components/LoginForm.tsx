"use client";
import Button from "@/components/button/Button";
import CInput from "@/components/form/CInput";
import RHFBasicForm from "@/components/form/RHFBasicForm";
import RHFContext from "@/components/form/RHFContext";
import SecondryTitle from "@/components/title/SecondryTitle";
import {
  requireGmail,
  requirePassword,
  structureGmail,
  structurePassword,
} from "@/store/errorCollection";
import { gmailRegex, passwordRegex } from "@/store/regexCollection";
import { customFetch } from "@/utils/fetchCollection";
import { useMutation } from "@tanstack/react-query";
import { BiKey } from "react-icons/bi";
import { FiAtSign } from "react-icons/fi";
import { AuthTypeValues } from "./LoginRegisterContainer";
import { useEffect, useRef } from "react";
import { UseFormReturn } from "react-hook-form";
import { useRouter } from "next/navigation";
import { useAuth } from "@/zustand/auth";
import { getPureCookie, setPureCookie } from "@/utils/clientCookiesCollection";

type LoginFormProps = {
  authType: AuthTypeValues;
  changeAuthType: () => void;
  changeSection: () => void;
};

const defaultFormData = {
  identifier: "",
  password: "",
};

export default function LoginForm({
  authType,
  changeAuthType,
  changeSection,
}: LoginFormProps) {
  const ref = useRef<UseFormReturn | null>(null);
  const router = useRouter();
  const { setIsLogin } = useAuth();

  const { mutateAsync } = useMutation({
    mutationFn: customFetch({
      endpoint: "/auth/login",
      method: "POST",
      sendToken: false,
      sendError: true,
    }),
  });

  async function submitHandler(data: any) {
    const { message, token } = (await mutateAsync({ body: data })) as any;
    if (message) {
      ref.current?.setError("root.server", {
        message,
      });
      return;
    }
    setPureCookie("token", token);
    const isToken = getPureCookie("token");
    if (isToken) {
      setIsLogin(true);
      router.push("/");
    }
  }

  useEffect(() => {
    if (authType === "regiter") {
      setTimeout(() => {
        ref.current?.reset(defaultFormData);
      }, 1000);
    }
  }, [authType]);

  return (
    <div className="text-white p-20 space-y-5">
      <SecondryTitle title="ورود به حساب کاربری" className="justify-center" />
      <RHFBasicForm
        submitHandler={submitHandler}
        defaultFormData={defaultFormData}
        ref={ref}
      >
        <div className="space-y-5">
          <RHFContext
            name="identifier"
            rules={{
              required: requireGmail,
              pattern: {
                value: gmailRegex,
                message: structureGmail,
              },
            }}
          >
            <CInput
              inputConfigs={{
                placeholder: "ایمیل",
              }}
              icon={<FiAtSign className="text-white" />}
            />
          </RHFContext>
          <RHFContext
            name="password"
            rules={{
              required: requirePassword,
              pattern: {
                value: passwordRegex,
                message: structurePassword,
              },
            }}
          >
            <CInput
              inputConfigs={{
                placeholder: "رمزعبور",
              }}
              icon={<BiKey className="text-white text-lg" />}
            />
          </RHFContext>
          <button
            type="button"
            className="text-blue-500 text-sm"
            onClick={changeSection}
          >
            فراموشی رمز عبور
          </button>
          <p className="empty:hidden text-red-500 bg-red-500/20 p-2 rounded-xl">
            {ref.current?.formState.errors.root?.server?.message as string}
          </p>
          <Button variant="secondry" type="submit" title="ورود" className="w-full" />

          <p className="text-white text-center">
            در صورت نداشتن حساب کاربری{" "}
            <button
              type="button"
              onClick={changeAuthType}
              className="text-blue-500"
            >
              ثبت نام{" "}
            </button>
            کنید
          </p>
        </div>
      </RHFBasicForm>
    </div>
  );
}
