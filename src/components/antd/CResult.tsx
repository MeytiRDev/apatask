import { Result, ResultProps } from "antd";

import { AiFillInfoCircle } from "react-icons/ai";

export default function CResult(props: ResultProps) {
  return (
    <Result
      icon={
        <div className="flex items-center justify-center">
          <AiFillInfoCircle className="text-9xl dark:text-secondry text-green-600" />
        </div>
      }
      status="success"
      title="در حال حاضر اطلاعاتی برای مسابقات درج نشده است!"
      classNames={{
        root: "w-full bg-green-600/10 dark:bg-green-600/15 rounded-xl",
        title: "dark:text-white!",
      }}
      {...props}
    />
  );
}
