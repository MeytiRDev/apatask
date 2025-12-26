import CInput from "@/components/form/CInput";
import { State_ProjectSchema } from "./TMProjects";
import Button from "@/components/button/Button";
import PrimaryFlex from "@/components/flex/PrimaryFlex";
import { IoIosList } from "react-icons/io";
import { setLocalStorage } from "@/utils/localstorageCollection";
import { CiGrid41, CiStar } from "react-icons/ci";
import { BsPlus } from "react-icons/bs";

type TMProjectsToolsProps = {
  changeStateProxy: (nStates: Partial<State_ProjectSchema>) => void;
};

export default function TMProjectsTools({
  changeStateProxy,
  viewType,
  queries,
}: TMProjectsToolsProps & State_ProjectSchema) {
  function onChange(e: any) {
    changeStateProxy({ queries: { search: e.target.value } });
  }

  function changeViewType(viewType: State_ProjectSchema["viewType"]) {
    const isExists = setLocalStorage("project_view_type", viewType);
    if (isExists) {
      changeStateProxy({ viewType });
    }
  }

  return (
    <PrimaryFlex justifyContent="space-between">
      <PrimaryFlex gap={12}>
        <Button
          icon={<BsPlus className="text-xl" />}
          title="پروژه جدید"
          variant="secondry"
        />
        <CInput
          inputConfigs={{
            placeholder: "جست و جوی پروژه ها",
            onChange: onChange,
          }}
        />
        <Button
          variant="activity"
          active={queries.favorites}
          icon={<CiStar className="text-xl" />}
          onClick={() =>
            changeStateProxy({ queries: { favorites: !queries.favorites } })
          }
          title="مورد علاقه ها"
        />
      </PrimaryFlex>

      <PrimaryFlex gap={12}>
        <Button
          variant="activityMinimal"
          icon={<IoIosList className="text-xl" />}
          onClick={() => changeViewType("LIST")}
          active={viewType === "LIST"}
        />
        <Button
          variant="activityMinimal"
          icon={<CiGrid41 className="text-xl" />}
          onClick={() => changeViewType("GRID")}
          active={viewType === "GRID"}
        />
      </PrimaryFlex>
    </PrimaryFlex>
  );
}
