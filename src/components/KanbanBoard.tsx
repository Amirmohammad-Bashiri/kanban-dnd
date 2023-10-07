import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { DndContext, DragOverlay, DragStartEvent } from "@dnd-kit/core";

import PlusIcon from "../icons/PlusIcon";

import { type Id, type Column } from "../types";
import ColumnList from "./ColumnList";
import ColumnItem from "./ColumnItem";

function KanbanBoard() {
  const [columns, setColumns] = useState<Column[]>([]);
  const [activeCol, setActiveCol] = useState<Column | null>();

  function handleCreateColumn() {
    const columnToAdd: Column = {
      id: uuidv4(),
      title: `Column ${columns.length + 1}`,
    };

    setColumns([...columns, columnToAdd]);
  }

  function deleteColumn(columnId: Id) {
    const filteredColumns = columns.filter(col => col.id !== columnId);

    setColumns(filteredColumns);
  }

  function onDragStart(event: DragStartEvent) {
    if (event.active.data.current?.type === "Column") {
      setActiveCol(event.active.data.current.column);
      return;
    }
  }

  return (
    <div className="m-auto w-full min-h-screen flex items-center overflow-x-auto overflow-y-hidden px-[40px]">
      <DndContext onDragStart={onDragStart}>
        <div className="flex gap-4 m-auto">
          <ColumnList columns={columns} deleteColumn={deleteColumn} />
          <button
            onClick={handleCreateColumn}
            className="h-[60px] w-[350px] min-w-[350px] cursor-pointer rounded-lg bg-mainBackgroundColor border-2 border-columnBackgroundColor p-4 ring-rose-500 hover:ring-2 flex gap-2">
            <PlusIcon /> Add Column
          </button>
        </div>
        <DragOverlay>
          {activeCol ? (
            <ColumnItem column={activeCol} deleteColumn={deleteColumn} />
          ) : null}
        </DragOverlay>
      </DndContext>
    </div>
  );
}

export default KanbanBoard;
