import { Init } from "./Init";
import { useAuth } from "../../../features/auth/hooks/useAuth";


export const TestPage = () => {
  const { user } = useAuth();

  return (
    <div>
      <Init />
    </div>
  );
};