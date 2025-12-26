import Button from "../Button";

type DeleteCancelProps = {
  cancelClick: () => void;
  deleteClick: () => void;
};

export default function DeleteCancel({
  cancelClick,
  deleteClick,
}: DeleteCancelProps) {
  return (
    <div className="grid grid-cols-2 gap-4">
      <Button variant="secondry" title="انصراف" onClick={cancelClick} />
      <Button variant="delete" title="حذف" onClick={deleteClick} />
    </div>
  );
}
