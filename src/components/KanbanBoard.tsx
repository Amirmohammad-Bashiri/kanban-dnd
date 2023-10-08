import { useState } from "react";
import { createPortal } from "react-dom";
import { v4 as uuidv4 } from "uuid";
import {
  DndContext,
  DragEndEvent,
  DragOverlay,
  DragStartEvent,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import { arrayMove } from "@dnd-kit/sortable";

import PlusIcon from "../icons/PlusIcon";

import { type Id, type Column, type Task } from "../types";
import ColumnList from "./ColumnList";
import ColumnItem from "./ColumnItem";

function KanbanBoard() {
  const [columns, setColumns] = useState<Column[]>([]);
  const [tasks, setTasks] = useState<Task[]>([]);
  const [activeCol, setActiveCol] = useState<Column | null>();

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 5,
      },
    })
  );

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

  function updateColumnTitle(colId: Id, title: string) {
    const newCols = columns.map(col => {
      if (col.id !== colId) return col;
      return { ...col, title };
    });

    setColumns(newCols);
  }

  function createTask(colId: Id) {
    const newTask: Task = {
      id: uuidv4(),
      columnId: colId,
      content: `Task ${tasks.length + 1}`,
    };

    setTasks(prevTasks => [...prevTasks, newTask]);
  }

  function onDragStart(event: DragStartEvent) {
    if (event.active.data.current?.type === "Column") {
      setActiveCol(event.active.data.current.column);
      return;
    }
  }

  function onDragEnd(event: DragEndEvent) {
    const { active, over } = event;

    if (!over) return;

    const activeColumnId = active.id;
    const overColumnId = over.id;

    if (activeColumnId === overColumnId) return;

    setColumns(cols => {
      const activeColIndex = cols.findIndex(col => col.id === activeColumnId);
      const overColIndex = cols.findIndex(col => col.id === overColumnId);

      return arrayMove(columns, activeColIndex, overColIndex);
    });
  }

  return (
    <div className="m-auto w-full min-h-screen flex items-center overflow-x-auto overflow-y-hidden px-[40px]">
      <DndContext
        sensors={sensors}
        onDragStart={onDragStart}
        onDragEnd={onDragEnd}>
        <div className="flex gap-4 m-auto">
          <ColumnList
            columns={columns}
            updateColumnTitle={updateColumnTitle}
            deleteColumn={deleteColumn}
            createTask={createTask}
          />
          <button
            onClick={handleCreateColumn}
            className="h-[60px] w-[350px] min-w-[350px] cursor-pointer rounded-lg bg-mainBackgroundColor border-2 border-columnBackgroundColor p-4 ring-rose-500 hover:ring-2 flex gap-2">
            <PlusIcon /> Add Column
          </button>
        </div>
        {createPortal(
          <DragOverlay>
            {activeCol ? (
              <ColumnItem
                column={activeCol}
                updateColumnTitle={updateColumnTitle}
                deleteColumn={deleteColumn}
                createTask={createTask}
              />
            ) : null}
          </DragOverlay>,
          document.body
        )}
      </DndContext>
    </div>
  );
}

export default KanbanBoard;
