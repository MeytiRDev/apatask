import Image from "next/image";
import { Server_ProjectSchema } from "./TM_Projects";
import Link from "next/link";

export default function TM_ProjectCard({
  id,
  projectImage,
  projectName,
}: Server_ProjectSchema) {
  return (
    <div className="bg-secondry rounded-xl overflow-hidden">
      <div className="h-56 bg-white/10">
        {projectImage ? (
          <Link href={`/tm/${id}`} className="block size-full">
            <Image
              src={`${process.env.NEXT_PUBLIC_BASE_API}/g/image/${projectImage}`}
              loader={({ src }) => src}
              alt="image"
              width={400}
              height={400}
              className="size-full object-cover object-center"
            />
          </Link>
        ) : null}
      </div>
      <div className="p-3">
        <Link href={`/tm/${id}`} className="text-xl text-white">{projectName}</Link>
      </div>
    </div>
  );
}
