import CModal from "@/components/antd/CModal";
import Button from "@/components/button/Button";
import CInput from "@/components/form/CInput";
import RHFBasicForm from "@/components/form/RHFBasicForm";
import RHFContext from "@/components/form/RHFContext";
import { customFetch } from "@/utils/fetchCollection";
import { useMutation } from "@tanstack/react-query";
import { Dispatch, SetStateAction, useRef, useState } from "react";
import { UseFormReturn } from "react-hook-form";
import { toast } from "sonner";
import TextArea from "@/components/form/TextArea";
import CSelect from "@/components/antd/CSelect";
import { useParams } from "next/navigation";
import { useInfo } from "@/app/tm/[uri]/_hooks/useInfo";
import { State_SwitchModals } from "../BoardCardHeader";
import DeleteCancel from "@/components/button/combine/DeleteCancel";

type FormFields = {
  title: string;
  description: string;
  boardId: string;
};

const defaultValues = {
  title: "",
};

type DeleteBoardModalProps = {
  open: boolean;
  setSwitchModals: Dispatch<SetStateAction<State_SwitchModals | null>>;
  boardId: string;
};

export default function DeleteBoardModal({
  open,
  setSwitchModals,
  boardId,
}: DeleteBoardModalProps) {
  const ref = useRef<UseFormReturn | null>(null);
  const { deleteBoard, tasks } = useInfo();

  const isTasks = tasks?.find((record) => {
    return record.boardId === boardId;
  });

  const { mutateAsync } = useMutation<any>({
    mutationFn: customFetch({
      endpoint: "/tm/board",
      method: "DELETE",
    }),
  });

  function afterCloseModal() {
    ref.current?.reset(defaultValues);
  }

  function closeModal() {
    setSwitchModals(null);
  }

  async function onDeleteBoard() {
    if (isTasks) {
      const isValidKey = await ref.current?.trigger("wordKey");
      console.log(isValidKey);

      if (isValidKey) {
        const { status, msg } = await mutateAsync({
          params: [boardId],
        });
        toast[status === "DELETED" ? "success" : "error"](msg);
        if (status === "DELETED") {
          setSwitchModals(null);
          deleteBoard(boardId);
        }
      }
    } else {
      deleteBoard(boardId);
    }
  }

  return (
    <>
      <CModal
        open={open}
        onCancel={closeModal}
        title="حذف تخته"
        afterClose={afterCloseModal}
      >
        <div className="space-y-5">
          {isTasks ? (
            <>
              <h4 className="text-white/75">
                در حال حاضر در تخته شما وظایفی وجود دارد در صورتی که هنوز هم
                مایل به حذف هستید کلمه{" "}
                <span className="text-red-500 text-lg font-bold">confirm</span>{" "}
                را وارد کرده سپس گزینه حذف را بزنید.
              </h4>
              <RHFBasicForm classNames={{ container: "space-y-5" }} ref={ref}>
                <RHFContext
                  name="wordKey"
                  rules={{
                    required: "کلمه کلیدی را وارد کنید",
                    pattern: {
                      value: /^confirm$/g,
                      message: "مقدار وارد شده با کلمه کلیدی مطابقت ندارد",
                    },
                  }}
                >
                  <CInput
                    inputConfigs={{
                      placeholder: "کلمه کلیدی را وارد کنید",
                    }}
                  />
                </RHFContext>
              </RHFBasicForm>
            </>
          ) : (
            <h4 className="text-white">ایا از حذف تخته اطمینان دارید!</h4>
          )}

          <DeleteCancel cancelClick={closeModal} deleteClick={onDeleteBoard} />
        </div>
      </CModal>
    </>
  );
}
