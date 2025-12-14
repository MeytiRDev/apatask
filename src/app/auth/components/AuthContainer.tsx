"use client";
import { getElement } from "@/utils/domCollection";
import ForgetPasswordContainer from "./ForgetPasswordContainer";
import LoginRegisterContainer from "./LoginRegisterContainer";

export default function AuthContainer() {
  function changeSection() {
    const loginRegisterContainer = getElement(
      "#register-login"
    ) as HTMLDivElement;
    const forgetContainer = getElement("#forget") as HTMLDivElement;

    if (loginRegisterContainer.classList.contains("active-section")) {
      loginRegisterContainer.classList.replace(
        "active-section",
        "inactive-section"
      );
      forgetContainer.classList.replace("inactive-section", "active-section");
    } else {
      forgetContainer.classList.replace("active-section", "inactive-section");
      loginRegisterContainer.classList.replace(
        "inactive-section",
        "active-section"
      );
    }
  }

  return (
    <>
      <LoginRegisterContainer changeSection={changeSection} />
      <ForgetPasswordContainer changeSection={changeSection} />
    </>
  );
}
