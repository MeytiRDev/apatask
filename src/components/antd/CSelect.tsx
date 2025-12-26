import { Select, SelectProps } from "antd";

type CSelectProps = {
  RHFConfigs?: {
    field?: object | null;
  };
};

const customizeStyles: SelectProps["styles"] = {
  root: {
    width: "100%",
    height: 40,
    backgroundColor: "rgba(6, 182, 212, .1)",
    border: "1px solid rgba(6, 182, 212, .3)",
    borderRadius: 12,
    color: "white",
    outline: "none",
  },
  popup: {
    root: {
      backgroundColor: "#12121a",
      border: "1px solid rgba(6, 182, 212, .3)",
      borderRadius: 12,
    },
  },
  placeholder: {
    color: "rgba(255,255,255,.75)",
  },
};

export default function CSelect(props: CSelectProps & SelectProps) {
  return (
    <Select
      styles={customizeStyles}
      {...props}
      {...props.RHFConfigs?.field}
    ></Select>
  );
}
