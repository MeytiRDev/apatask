import { Server_ZoneSchema } from "../page";
import TM_ZoneHeader from "./TM_ZoneHeader";
import TM_ZoneTasks from "./TM_ZoneTasks";

export default function TM_Zone(info: Server_ZoneSchema) {
  return (
    <div className="shrink-0 h-screen bg-secondry rounded-xl overflow-hidden w-96">
      <TM_ZoneHeader {...info} />
      <TM_ZoneTasks zoneId={info.id} />
    </div>
  );
}
