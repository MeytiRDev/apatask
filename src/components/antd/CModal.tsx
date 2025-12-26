import { Modal, ModalProps } from "antd";
import { ReactElement } from "react";
import { IoCloseOutline } from "react-icons/io5";

type CModalProps = {
  children: ReactElement;
} & ModalProps;

export default function CModal(props: CModalProps) {
  return (
    <Modal
      centered={true}
      footer={null}
      closeIcon={
        <IoCloseOutline className="text-xl text-white/75 hover:text-white transition-colors" />
      }
      styles={{
        container: {
          backgroundColor: "#12121a",
          border: "1px solid rgba(6, 182, 212, .3)",
        },
        title: {
          color: "white",
        },
      }}
      {...props}
    >
      {props.children}
    </Modal>
  );
}
