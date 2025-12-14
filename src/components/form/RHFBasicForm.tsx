"use client";
import { forwardRef, ReactElement, useImperativeHandle } from "react";
import { FormProvider, useForm } from "react-hook-form";

type RHFBasicFormProps = {
  children: ReactElement | ReactElement[];
  defaultFormData: object;
  submitHandler: (data: any) => void;
};

function RHFBasicForm(
  { children, defaultFormData, submitHandler }: RHFBasicFormProps,
  ref: any
) {
  const methods = useForm({ defaultValues: defaultFormData });

  useImperativeHandle(ref, () => {
    return methods;
  });

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(submitHandler)}>{children}</form>
    </FormProvider>
  );
}

export default forwardRef(RHFBasicForm);
