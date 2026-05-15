import { Init } from "./Init";
import { DashBoards } from "./DashBoards";
import { useAuth } from "../../../auth/hooks/useAuth";


export const HomePage = () => {
  const { user } = useAuth();

  return (
    <div>
      {user ? <DashBoards /> : <Init />}
    </div>
  );
};