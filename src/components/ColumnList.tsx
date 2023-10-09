import { useMemo, useState } from "react";
import { createPortal } from "react-dom";
import { v4 as uuidv4 } from "uuid";
import {
  SortableContext,
  horizontalListSortingStrategy,
} from "@dnd-kit/sortable";
import { DragOverlay } from "@dnd-kit/core";

import ColumnItem from "./ColumnItem";

import { type Id, type Column, type Task } from "../types";

type ColumnListProps = {
  columns: Column[];
  deleteColumn: (columnId: Id) => void;
  updateColumnTitle: (colId: Id, title: string) => void;
  activeCol: Column | null | undefined;
};

function ColumnList({
  columns,
  deleteColumn,
  updateColumnTitle,
  activeCol,
}: ColumnListProps) {
  const [tasks, setTasks] = useState<Task[]>([]);

  const columnsId = useMemo(() => columns.map(col => col.id), [columns]);

  function createTask(colId: Id) {
    const newTask: Task = {
      id: uuidv4(),
      columnId: colId,
      content: `Task ${tasks.length + 1}`,
    };

    setTasks(prevTasks => [...prevTasks, newTask]);
  }

  function getTasks(colId: Id) {
    return tasks.filter(task => task.columnId === colId);
  }

  return (
    <ul className="flex gap-4">
      <SortableContext
        strategy={horizontalListSortingStrategy}
        items={columnsId}>
        {columns.map(col => (
          <ColumnItem
            key={col.id}
            column={col}
            deleteColumn={deleteColumn}
            updateColumnTitle={updateColumnTitle}
            createTask={createTask}
            tasks={getTasks(col.id)}
            setTasks={setTasks}
          />
        ))}
      </SortableContext>
      {createPortal(
        <DragOverlay>
          {activeCol ? (
            <ColumnItem
              column={activeCol}
              updateColumnTitle={updateColumnTitle}
              deleteColumn={deleteColumn}
              createTask={createTask}
              tasks={getTasks(activeCol.id)}
              setTasks={setTasks}
            />
          ) : null}
        </DragOverlay>,
        document.body
      )}
    </ul>
  );
}

export default ColumnList;
