import { useSelector } from "react-redux";
import UserStats from "./UserStats";
import AdminStats from "./AdminStats";

function Stats() {
  const { user } = useSelector((state) => state.auth);

  return user?.role === "user" ? <UserStats /> : <AdminStats />;
}

export default Stats;
