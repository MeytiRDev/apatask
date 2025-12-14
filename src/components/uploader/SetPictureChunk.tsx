"use client";
import { IoTrashOutline } from "react-icons/io5";
import CImage from "../next/CImage";
import { FilesInfoSchema } from "./FileUploader";

type SetPictureChunkProps = {
  filesInfo: FilesInfoSchema[];
  removeFile: (id: string) => void;
};

export default function SetPictureChunk({
  filesInfo,
  removeFile,
}: SetPictureChunkProps) {
  return (
    <div className="flex items-center justify-center size-full">
      {filesInfo.map((info) => {
        return (
          <div key={info.id} className="size-full relative group">
            <CImage imageProps={{ src: info.url }} />
            <div className="absolute inset-0 flex items-center justify-center bg-black/20 invisible group-hover:visible opacity-0 group-hover:opacity-100 transition-all">
              <button
                type="button"
                className="flex items-center justify-center size-10 bg-white rounded-full hover:scale-110 transition-all"
                onPointerUp={() => removeFile(info.id)}
              >
                <IoTrashOutline className="text-2xl text-green-600" />
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
}
