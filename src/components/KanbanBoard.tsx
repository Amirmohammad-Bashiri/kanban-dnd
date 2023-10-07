import { useState } from "react";
import { v4 as uuidv4 } from "uuid";

import PlusIcon from "../icons/PlusIcon";

import { type Column } from "../types";
import ColumnList from "./ColumnList";

function KanbanBoard() {
  const [columns, setColumns] = useState<Column[]>([]);

  function handleCreateColumn() {
    const columnToAdd: Column = {
      id: uuidv4(),
      title: `Column ${columns.length + 1}`,
    };

    setColumns([...columns, columnToAdd]);
  }

  return (
    <div className="m-auto w-full min-h-screen flex items-center overflow-x-auto overflow-y-hidden px-[40px]">
      <div className="flex gap-2 m-auto">
        <ColumnList columns={columns} setColumns={setColumns} />
        <button
          onClick={handleCreateColumn}
          className="h-[60px] w-[350px] min-w-[350px] cursor-pointer rounded-lg bg-mainBackgroundColor border-2 border-columnBackgroundColor p-4 ring-rose-500 hover:ring-2 flex gap-2">
          <PlusIcon /> Add Column
        </button>
      </div>
    </div>
  );
}

export default KanbanBoard;
