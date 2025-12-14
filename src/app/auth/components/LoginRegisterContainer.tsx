"use client";
import Image from "next/image";
import LoginForm from "./LoginForm";
import RegisterForm from "./RegisterForm";
import { getElement, getElementInfo } from "@/utils/domCollection";
import { useState } from "react";

type LoginRegisterContainerProps = {
  changeSection: () => void;
};

export type AuthTypeValues = "login" | "regiter";

export default function LoginRegisterContainer({
  changeSection,
}: LoginRegisterContainerProps) {
  const [authType, setAuthType] = useState<AuthTypeValues>("login");

  function changeAuthType() {
    const sideElement = getElement("#side") as HTMLDivElement;
    const sideElementWidth = getElementInfo(sideElement);

    if (!sideElement.style.left || sideElement.style.left === "0px") {
      sideElement.style.left = sideElementWidth?.width + "px";
    } else {
      sideElement.style.left = "0px";
    }

    setAuthType((prev) => (prev === "login" ? "regiter" : "login"));
  }

  return (
    <div
      id="register-login"
      className="absolute inset-0 flex items-center justify-center login-register active-section transition-all duration-1000"
    >
      <div className="relative">
        <div className="absolute -top-20 -left-20 bg-third size-96 rounded-full blur-[200px]"></div>
        <div className="absolute -bottom-20 -right-20 bg-third size-96 rounded-full blur-[200px]"></div>

        <div className="rounded-lg overflow-hidden bg-black/10 backdrop-blur-lg border border-solid border-white/5 transition-all duration-1000">
          <div
            id="side"
            className="absolute w-1/2 top-0 bottom-0 left-0 transition-all duration-1000"
          >
            <Image
              src="/pictures/auth.jpg"
              alt="any"
              width={200}
              height={200}
              className="size-full object-cover object-center"
            />
          </div>

          <div className="size-full flex items-center justify-between transition-all">
            <LoginForm
              authType={authType}
              changeAuthType={changeAuthType}
              changeSection={changeSection}
            />
            <RegisterForm authType={authType} changeAuthType={changeAuthType} />
          </div>
        </div>
      </div>
    </div>
  );
}
