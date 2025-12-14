"use client";
import { ChangeEvent, useEffect, useState } from "react";
import { twMerge } from "tailwind-merge";
import {
  blobAndFileToURL,
  convertFilesToFileList,
} from "@/utils/converterCollection";
import NotPictureChunk from "./NotPictureChunk";
import SetPictureChunk from "./SetPictureChunk";
import { ControllerRenderProps, FieldValues } from "react-hook-form";

type FileUploaderProps = {
  multiple?: boolean;
  className?: string;
  RHFConfigs?: {
    field: ControllerRenderProps<FieldValues, string>;
    name: string;
    onChange: any;
  };
};

export type FilesInfoSchema = {
  id: string;
  url: string;
  file: File;
};

function FileUploader({
  multiple = false,
  className,
  RHFConfigs,
}: FileUploaderProps) {
  const [filesInfo, setFilesInfo] = useState<FilesInfoSchema[]>([]);

  function getFilesFromState() {
    const files = filesInfo.map(({ file }) => file);
    return files;
  }

  function getTargetElement() {
    const targetElement = document.querySelector(
      "#uploader"
    ) as HTMLInputElement;
    return targetElement;
  }

  function updateTargetElement() {
    getTargetElement().files = convertFilesToFileList(getFilesFromState());
  }

  function removeFile(id: string) {
    const filteredPreviews = filesInfo.filter((preview) => {
      const isRemoved = preview.id !== id;
      return isRemoved;
    });
    setFilesInfo(filteredPreviews);
    // RHFConfigs?.onChange(filteredPreviews.length ? filteredPreviews : null);
  }

  function setFilesInfoInState(packet: FilesInfoSchema[]) {
    if (multiple) {
      setFilesInfo([...filesInfo, ...packet]);
      // RHFConfigs?.onChange([...previews, ...packet.file]);
    } else {
      setFilesInfo(packet);
      // RHFConfigs?.onChange(packet.at(0)?.file);
    }
  }

  function changeHandler(e: ChangeEvent<HTMLInputElement>) {
    const targetElement = e.currentTarget as HTMLInputElement;
    const files = targetElement.files as FileList;

    if (!files.length && filesInfo.length) {
      updateTargetElement();
      return;
    }

    const completeFiles = [...files].map((file) => {
      return {
        id: crypto.randomUUID(),
        url: blobAndFileToURL(file) as string,
        file,
      };
    });
    setFilesInfoInState(completeFiles);
  }

  function rhfChange() {
    if (filesInfo.length) {
      if (multiple) {
        RHFConfigs?.onChange(getFilesFromState());
      } else {
        RHFConfigs?.onChange(filesInfo.at(0)?.file);
      }
    } else {
      RHFConfigs?.onChange(null);
    }
  }

  useEffect(() => {
    updateTargetElement();
    rhfChange();
  }, [filesInfo]);

  return (
    <div onClick={(e) => e.stopPropagation()}>
      <label
        htmlFor="uploader"
        className={twMerge(
          "block w-full h-52 rounded-xl bg-green-600/10 overflow-hidden cursor-pointer",
          className
        )}
      >
        {filesInfo.length ? (
          <SetPictureChunk filesInfo={filesInfo} removeFile={removeFile} />
        ) : (
          <NotPictureChunk />
        )}
      </label>
      <input
        id="uploader"
        type="file"
        onChange={changeHandler}
        multiple={multiple}
        hidden
      />
    </div>
  );
}

export default FileUploader;
