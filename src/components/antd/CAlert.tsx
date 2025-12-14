import { Alert, AlertProps } from "antd";
import { AiFillInfoCircle } from "react-icons/ai";

type CAlertProps = {
  alertProps: AlertProps;
};

export default function CAlert({ alertProps }: CAlertProps) {
  return (
    <Alert
      showIcon
      type="info"
      icon={<AiFillInfoCircle className="text-xl dark:text-secondry! text-green-600!" />}
      classNames={{
        root: "bg-green-600/10! dark:bg-green-600/15! border-green-600/10! dark:border-green-600/20!",
        title: "font-dana-medium! dark:text-white! text-base!",
      }}
      {...alertProps}
    />
  );
}
