import CModal from "@/components/antd/CModal";
import { customFetch } from "@/utils/fetchCollection";
import { useMutation } from "@tanstack/react-query";
// import { useRef } from "react";
// import { UseFormReturn } from "react-hook-form";
import { toast } from "sonner";
import { useInfo } from "@/app/tm/[uri]/_hooks/useInfo";
import DeleteCancel from "@/components/button/combine/DeleteCancel";

type EditBoardModalProps = {
  open: boolean;
  closeModal: () => void;
  boardId: string;
  taskId: string;
};

export default function DeleteTaskModal({
  open,
  closeModal,
  boardId,
  taskId,
}: EditBoardModalProps) {
  //   const ref = useRef<UseFormReturn | null>(null);
  const { deleteTask } = useInfo();

  const { mutateAsync } = useMutation<any>({
    mutationFn: customFetch({
      endpoint: "/tm/task",
      method: "DELETE",
    }),
  });

  async function onDeleteBoard() {
    const { msg, status } = await mutateAsync({
      params: [taskId],
    });
    toast[status === "DELETED" ? "success" : "error"](msg);
    if (status === "DELETED") {
      deleteTask(boardId, taskId);
      closeModal();
    }
  }

  return (
    <>
      <CModal open={open} onCancel={closeModal} title="حذف تسک">
        <div className="space-y-5">
          <h4 className="text-white">آیا از حذف این تسک اطمینان دارید!</h4>
          <DeleteCancel cancelClick={closeModal} deleteClick={onDeleteBoard} />
        </div>
      </CModal>
    </>
  );
}
