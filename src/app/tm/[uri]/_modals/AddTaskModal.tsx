"use client";
import CModal from "@/components/antd/CModal";
import Button from "@/components/button/Button";
import CInput from "@/components/form/CInput";
import RHFBasicForm from "@/components/form/RHFBasicForm";
import RHFContext from "@/components/form/RHFContext";
import { customFetch } from "@/utils/fetchCollection";
import { useMutation } from "@tanstack/react-query";
import { useRef, useState } from "react";
import { UseFormReturn } from "react-hook-form";
import { BsPlus } from "react-icons/bs";
import { toast } from "sonner";
import { useInfo } from "../_hooks/useInfo";
import TextArea from "@/components/form/TextArea";
import CSelect from "@/components/antd/CSelect";
import { useParams } from "next/navigation";

type FormFields = {
  title: string;
  description: string;
  boardId: string;
};

type AddEditTaskModalProps = {
  open?: boolean;
  type?: "CREATE" | "UPDATE";
  defaultValues?: Omit<FormFields, "boardId">;
  taskId?: string;
  closeModal?: () => void;
};

const resetFormValues = {
  title: "",
  description: "",
  boardId: "",
};

type ServerResponse_CETask = {
  status: "CREATED" | "UPDATED" | "ERROR";
  msg: string;
  task: any;
};

export default function AddEditTaskModal({
  open,
  type,
  defaultValues,
  taskId,
  closeModal,
}: AddEditTaskModalProps) {
  const [switchModal, setSwitchModal] = useState(false);

  const ref = useRef<UseFormReturn | null>(null);
  const { uri } = useParams();
  const { updateTaskInfo, createTask, boards } = useInfo();

  const { mutateAsync } = useMutation<
    ServerResponse_CETask,
    Omit<ServerResponse_CETask, "task">
  >({
    mutationFn: customFetch({
      endpoint: "/tm/task",
      method: type === "CREATE" ? "POST" : "PUT",
    }),
    onSuccess: ({ status, msg, task }) => {
      toast.success(msg);
      if (status === "CREATED") {
        createTask(task);
      } else {
        updateTaskInfo(task);
      }
      switchBoardModal();
    },
    onError: ({ msg }) => {
      toast.error(msg);
    },
  });

  function switchBoardModal() {
    setSwitchModal((prev) => !prev);
  }

  async function submitHandler(data: FormFields) {
    try {
      await mutateAsync<any>({
        body: type === "CREATE" ? { ...data, projectId: uri } : data,
        params: type === "UPDATE" ? [taskId] : null,
      });
    } catch (err) {}
  }

  function afterCloseModal() {
    ref.current?.reset(resetFormValues);
  }

  return (
    <>
      {type === "CREATE" ? (
        <Button
          variant="secondry"
          title="افزودن تسک"
          icon={<BsPlus className="text-xl" />}
          onClick={switchBoardModal}
        />
      ) : null}

      <CModal
        open={open || switchModal}
        onCancel={closeModal || switchBoardModal}
        title="افزودن تسک"
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
              name="title"
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
            <RHFContext
              name="description"
              rules={{
                required: "توضیحات الزامی میباشد",
              }}
            >
              <TextArea
                inputConfigs={{
                  placeholder: "عنوان تسک",
                  className: "size-full min-h-32",
                }}
              />
            </RHFContext>
            {type === "CREATE" ? (
              <RHFContext
                name="boardId"
                rules={{
                  required: "تخته مورد نظر را انتخاب کنید",
                }}
              >
                <CSelect
                  placeholder="تخته مورد نظر را انتخاب کنید"
                  options={boards}
                  fieldNames={{
                    label: "title",
                    value: "id",
                  }}
                  optionRender={({ label }) => {
                    return (
                      <div>
                        <p className="text-white">{label}</p>
                      </div>
                    );
                  }}
                />
              </RHFContext>
            ) : null}

            <Button
              type="submit"
              variant="secondry"
              title={type === "CREATE" ? "اضافه کردن" : "بروزرسانی"}
              className="w-full"
              loading={ref.current?.formState.isSubmitting}
            />
          </RHFBasicForm>
        </div>
      </CModal>
    </>
  );
}
