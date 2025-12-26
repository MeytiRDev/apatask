import CModal from "@/components/antd/CModal";
import Button from "@/components/button/Button";
import CInput from "@/components/form/CInput";
import RHFBasicForm from "@/components/form/RHFBasicForm";
import RHFContext from "@/components/form/RHFContext";
import { customFetch } from "@/utils/fetchCollection";
import { useMutation } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import { useRef, useState } from "react";
import { UseFormReturn } from "react-hook-form";
import { BsPlus } from "react-icons/bs";
import { toast } from "sonner";
import { useInfo } from "../_hooks/useInfo";

const defaultValues = {
  title: "",
};

export default function AddBoardModal() {
  const [switchModal, setSwitchModal] = useState(false);

  const { uri } = useParams();
  const ref = useRef<UseFormReturn | null>(null);
  const { addBoard } = useInfo();

  const { mutateAsync } = useMutation<any>({
    mutationFn: customFetch({
      endpoint: "/tm/board",
      method: "POST",
    }),
  });

  function switchBoardModal() {
    setSwitchModal((prev) => !prev);
  }

  async function submitHandler({ title }: any) {
    const { status, msg, board } = await mutateAsync<any>({
      body: {
        title,
        projectId: uri,
      },
    });
    toast[status === "CREATED" ? "success" : "error"](msg);
    if (status === "CREATED") {
      addBoard(board);
      switchBoardModal();
    }
  }

  function afterCloseModal() {
    ref.current?.reset(defaultValues);
  }

  return (
    <>
      <Button
        variant="third"
        title="افزودن بورد"
        icon={<BsPlus className="text-xl" />}
        onClick={switchBoardModal}
      />

      <CModal
        open={switchModal}
        onCancel={switchBoardModal}
        title="اضافه کردن تخته جدید"
        afterClose={afterCloseModal}
      >
        <div className="mt-5">
          <RHFBasicForm
            submitHandler={submitHandler}
            classNames={{ container: "space-y-5" }}
            ref={ref}
          >
            <RHFContext
              name="title"
              rules={{
                required: "عنوان تخته الزامی میباشد",
              }}
            >
              <CInput
                inputConfigs={{
                  placeholder: "عنوان تخته",
                }}
              />
            </RHFContext>

            <Button
              type="submit"
              variant="secondry"
              title="اضافه کردن"
              className="w-full"
              loading={ref.current?.formState.isSubmitting}
            />
          </RHFBasicForm>
        </div>
      </CModal>
    </>
  );
}
