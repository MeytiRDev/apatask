import { Input } from "antd";

export default function OTPCode({ RHFConfigs: { field } }: any) {
  return (
    <Input.OTP
      length={4}
      size="large"
      className="size-20"
      style={{ direction: "ltr" }}
      {...(field ? field : {})}
    />
  );
}
