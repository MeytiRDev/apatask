"use client";
import Button from "@/components/button/Button";
import CInput from "@/components/form/CInput";
import RHFBasicForm from "@/components/form/RHFBasicForm";
import RHFContext from "@/components/form/RHFContext";
import SecondryTitle from "@/components/title/SecondryTitle";
import {
  requireGmail,
  requirePassword,
  requireUserName,
  structureGmail,
  structurePassword,
  structureUserName,
} from "@/store/errorCollection";
import {
  gmailRegex,
  passwordRegex,
  userNameRegex,
} from "@/store/regexCollection";
import { customFetch } from "@/utils/fetchCollection";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { BiKey } from "react-icons/bi";
import { FiAtSign } from "react-icons/fi";
import { RiUser4Line } from "react-icons/ri";
import { AuthTypeValues } from "./LoginRegisterContainer";
import { useEffect, useRef } from "react";
import { UseFormReturn } from "react-hook-form";

type RegisterFormProps = {
  changeAuthType: () => void;
  authType: AuthTypeValues;
};

const defaultFormData = {
  userName: "",
  fullName: "",
  gmail: "",
  password: "",
};

export default function RegisterForm({
  authType,
  changeAuthType,
}: RegisterFormProps) {
  const ref = useRef<UseFormReturn | null>(null);
  const router = useRouter();

  const { mutateAsync } = useMutation({
    mutationFn: customFetch({ endpoint: "/auth/register", method: "POST" }),
    onSuccess: () => {},
    onError: () => {},
  });

  const { mutateAsync: ajax } = useMutation({
    mutationFn: customFetch({ endpoint: "/ajax/v/un", method: "POST" }),
    onSuccess: () => {},
    onError: () => {},
  });

  async function submitHandler(data: any) {
    const { token } = await mutateAsync({ body: data });
    if (token) {
      document.cookie = `token=${token}`;
      router.push("/");
    }
  }

  async function ajaxValidation(value: string) {
    const { isAllowed, message } = await ajax({
      body: {
        userName: value,
      },
    });
    if (!isAllowed) {
      return message;
    }
    return null;
  }

  useEffect(() => {
    if (authType === "login") {
      setTimeout(() => {
        ref.current?.reset(defaultFormData);
      }, 1000);
    }
  }, [authType]);

  return (
    <div className="text-white p-20 space-y-5">
      <SecondryTitle title="به آپاتسک خوش آمدید" className="justify-center" />
      <RHFBasicForm submitHandler={submitHandler} ref={ref}>
        <div className="space-y-5">
          <RHFContext
            name="userName"
            rules={{
              required: requireUserName,
              pattern: {
                value: userNameRegex,
                message: structureUserName,
              },
              validate: ajaxValidation,
            }}
          >
            <CInput
              inputConfigs={{
                placeholder: "نام کاربری",
              }}
              icon={<RiUser4Line className="text-white" />}
            />
          </RHFContext>
          <RHFContext name="fullName">
            <CInput
              inputConfigs={{
                placeholder: "نام کامل",
              }}
            />
          </RHFContext>
          <RHFContext
            name="gmail"
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
          <Button type="submit" title="ثبت نام" />
          <p className="text-white text-center">
            در صورتی که قبلا ثبت نام کردید{" "}
            <button
              type="button"
              onClick={changeAuthType}
              className="text-blue-500"
            >
              ورود{" "}
            </button>
            کنید
          </p>
        </div>
      </RHFBasicForm>
    </div>
  );
}
