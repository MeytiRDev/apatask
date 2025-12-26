"use client";
import {
  CSSProperties,
  forwardRef,
  ReactElement,
  useImperativeHandle,
} from "react";
import { FormProvider, useForm } from "react-hook-form";

type RHFBasicFormProps = {
  children: ReactElement | ReactElement[];
  defaultFormData?: object;
  submitHandler?: (data: any) => void;
  styles?: {
    container?: CSSProperties;
  };
  classNames?: {
    container?: string;
  };
};

function RHFBasicForm(
  {
    children,
    defaultFormData,
    submitHandler = () => {},
    styles,
    classNames,
  }: RHFBasicFormProps,
  ref: any
) {
  const methods = useForm({ defaultValues: defaultFormData });

  useImperativeHandle(ref, () => {
    return methods;
  });

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(submitHandler)}>
        <div style={{ ...styles?.container }} className={classNames?.container}>
          {children}
        </div>
      </form>
    </FormProvider>
  );
}

export default forwardRef(RHFBasicForm);
