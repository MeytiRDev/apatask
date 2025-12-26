import CModal from "@/components/antd/CModal";
import Button from "@/components/button/Button";
import CInput from "@/components/form/CInput";
import RHFBasicForm from "@/components/form/RHFBasicForm";
import RHFContext from "@/components/form/RHFContext";
import { customFetch } from "@/utils/fetchCollection";
import { useMutation } from "@tanstack/react-query";
import { useRef } from "react";
import { UseFormReturn } from "react-hook-form";
import { toast } from "sonner";
import { useParams } from "next/navigation";
import { useInfo } from "@/app/tm/[uri]/_hooks/useInfo";

type FormFields = {
  nTitle: string;
};

type EditBoardModalProps = {
  open: boolean;
  closeModal: () => void;
  boardId: string;
  title: string;
};

const resetFormValues = {
  title: "",
};

export default function EditBoardModal({
  open,
  closeModal,
  boardId,
  title,
}: EditBoardModalProps) {
  const ref = useRef<UseFormReturn | null>(null);
  const { updateBoard, boards } = useInfo();

  const { mutateAsync } = useMutation<any>({
    mutationFn: customFetch({
      endpoint: "/tm/board",
      method: "PUT",
    }),
  });

  async function submitHandler(data: FormFields) {
    const { status, msg } = await mutateAsync<any>({
      body: { ...data },
      params: [boardId],
    });
    toast[status === "UPDATED" ? "success" : "error"](msg);
    if (status === "UPDATED") {
      updateBoard({ id: boardId, title: data.nTitle });
      closeModal();
    }
  }

  function afterCloseModal() {
    ref.current?.reset(resetFormValues);
  }

  const defaultValues = {
    title,
  };

  return (
    <>
      <CModal
        open={open}
        onCancel={closeModal}
        title="حذف تخته"
        afterClose={afterCloseModal}
      >
        <div className="mt-5">
          <RHFBasicForm
            submitHandler={submitHandler}
            classNames={{ container: "space-y-5" }}
            defaultFormData={defaultValues}
            ref={ref}
          >
            <RHFContext
              name="nTitle"
              rules={{
                required: "عنوان تسک الزامی میباشد",
              }}
            >
              <CInput
                inputConfigs={{
                  placeholder: "عنوان تسک",
                  className: "w-full",
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
