import { useEffect, useState } from "react";
import { DashBoards } from "./DashBoards";
import { useAuth } from "../../../auth/hooks/useAuth";
import { AddItemModal } from "components/modal/addItem";


export const HomePage = () => {
  const { user } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const handleAdd = (item) => {
    console.log(item);
    setIsOpen(!isOpen);
  };

  useEffect(() => {}
  , [isOpen]);


  return (
    <div>
      {isOpen && <AddItemModal onClose={() => setIsOpen(false)} onAdd={handleAdd} />}
      <DashBoards handleAdd={handleAdd} />
    </div>
  );
};