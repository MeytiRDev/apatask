"use client"
import Button from "@/components/button/Button";
import CInput from "@/components/form/CInput";
import RHFBasicForm from "@/components/form/RHFBasicForm";
import RHFContext from "@/components/RHFContext";
import SecondryTitle from "@/components/title/SecondryTitle";
import { useState } from "react";
import { BiKey } from "react-icons/bi";
import { FiAtSign } from "react-icons/fi";

const flow = {
  step_1: {
    field: (
      <CInput
        inputConfigs={{
          placeholder: "نام کاربری یا ایمیل",
        }}
        icon={<FiAtSign className="text-white" />}
      />
    ),
  },
  step_2: {
    field: (
      <CInput
        inputConfigs={{
          placeholder: "",
        }}
        icon={<FiAtSign className="text-white" />}
      />
    ),
  },
  step_3: {
    field: (
      <div className="">
        <CInput
          inputConfigs={{
            placeholder: "رمز عبور جدید",
          }}
          icon={<BiKey className="text-lg text-white" />}
        />
        <CInput
          inputConfigs={{
            placeholder: "تایید رمز عبور",
          }}
          icon={<BiKey className="text-lg text-white" />}
        />
      </div>
    ),
  },
};

type ForgetPasswordProps = {
  changeSection: () => void;
};

const defaultFormData = {
  identifier: "",
  otpCode: "",
  newPassword: "",
};

export default function ForgetPassword({ changeSection }: ForgetPasswordProps) {
  const [step, setStep] = useState<keyof typeof flow>("step_1");

  function changeStep() {
    setStep((prev) => {
      const step = prev.split("_").at(1);
      const createStep = `step_${Number(step) + 1}` as keyof typeof flow;
      return createStep;
    });
  }

  function resetDataAndChangeSection() {
    changeSection();

    setTimeout(() => {
      setStep("step_1");
    }, 1000);
  }

  function submitHandler() {
    changeStep();
  }

  return (
    <div
      id="forget"
      className="absolute inset-0 flex items-center justify-center foregt inactive-section transition-all duration-1000"
    >
      <div className="relative">
        <div className="absolute -bottom-40 -left-20 bg-third size-52 rounded-full blur-[200px]"></div>

        <div className="rounded-lg overflow-hidden bg-black/10 backdrop-blur-lg border border-solid border-white/5 transition-all duration-1000">
          <div className="p-20 space-y-5">
            <SecondryTitle
              title="فراموشی رمز عبور"
              className="justify-center"
            />
            <RHFBasicForm submitHandler={submitHandler}>
              <div className="space-y-5">
                <RHFContext name="email">{flow[step].field}</RHFContext>

                <Button type="submit" title="ورود" />

                <p className="text-white text-center">
                  در صورتی که قبلا ثبت نام کردید{" "}
                  <button
                    type="button"
                    onClick={resetDataAndChangeSection}
                    className="text-blue-500"
                  >
                    ورود{" "}
                  </button>
                  کنید
                </p>
              </div>
            </RHFBasicForm>
          </div>
        </div>
      </div>
    </div>
  );
}
