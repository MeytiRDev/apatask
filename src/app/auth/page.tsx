import AuthContainer from "./components/AuthContainer";
import "./style.css";

export default function AuthPage() {
  return (
    <div className="relative h-screen auth-gradient-bg overflow-hidden">
      <AuthContainer />
      {/* <h4 className="fixed right-0 left-0 bottom-5 flex items-center justify-center gap-1 text-sm">
        <span className=" text-white/75">توسعه داده شده در شرکت مهندسی</span>
        <a href="https://inova-omega.vercel.app/" className="text-blue-500" target="_blank">اینوا - inova</a>
      </h4> */}
    </div>
  );
}
