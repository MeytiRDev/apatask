"use client";
import SecondryTitle from "@/components/title/SecondryTitle";
import { customFetch } from "@/utils/fetchCollection";
import { useQuery } from "@tanstack/react-query";
import Link from "next/link";
import { useParams } from "next/navigation";
import { BsArrowRightShort, BsPlus } from "react-icons/bs";
import AddBoardModal from "../_modals/AddBoardModal";
import AddEditTaskModal from "../_modals/AddTaskModal";

type ServerData_ProjectNameSchema = {
  title: string;
};

export default function TMZoneHeader() {
  const { uri } = useParams();

  const { data } = useQuery<ServerData_ProjectNameSchema>({
    queryKey: ["projectTitle", uri],
    queryFn: customFetch({
      endpoint: `/tm/project/name/${uri}`,
    }),
  });

  return (
    <>
      <div className="bg-[#12121a] py-10">
        <div className="c_container">
          <div className="space-y-5">
            <div className="flex items-end justify-between">
              <div className="grow space-y-5">
                <Link
                  href="/tm"
                  className="flex items-center gap-1 text-white/75 hover:text-white"
                >
                  <BsArrowRightShort className="text-xl" />
                  <span>بازگشت به پروژه ها</span>
                </Link>
                {data?.title ? <SecondryTitle title={data?.title} /> : null}
              </div>

              <div className="flex items-center justify-center gap-4">
                <AddBoardModal />
                <AddEditTaskModal type="CREATE" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
