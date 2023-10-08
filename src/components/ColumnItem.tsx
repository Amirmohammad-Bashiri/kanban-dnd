import { useState } from "react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { clsx } from "clsx";

import TrashIcon from "@/icons/TrashIcon";
import PlusIcon from "@/icons/PlusIcon";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { Task, type Column, type Id } from "@/types";

type ColumnItemProps = {
  column: Column;
  deleteColumn: (columnId: Id) => void;
  updateColumnTitle: (colId: Id, title: string) => void;
  createTask: (colId: Id) => void;
  tasks: Task[];
};

function ColumnItem({
  column,
  deleteColumn,
  updateColumnTitle,
  createTask,
  tasks,
}: ColumnItemProps) {
  const [editMode, setEditMode] = useState(false);

  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: column.id,
    data: {
      type: "Column",
      column,
    },
    disabled: editMode,
  });

  const style = {
    transition,
    transform: CSS.Transform.toString(transform),
  };

  return (
    <li>
      <Card
        ref={setNodeRef}
        style={style}
        {...attributes}
        {...listeners}
        className={clsx(
          "touch-none bg-columnBackgroundColor border-none text-white w-[350px] h-[500px] max-h-[500px] rounded-md flex flex-col",
          isDragging && "border-2 border-rose-500 opacity-40"
        )}>
        <CardHeader
          onClick={() => setEditMode(true)}
          className="bg-mainBackgroundColor text-md h-[60px] cursor-grab rounded rounded-b-none p-3 font-bold border-columnBackgroundColor border-4 flex flex-row items-center justify-between">
          <CardTitle className="flex items-center gap-2 text-lg">
            <div className="flex items-center justify-center px-2 py-1 text-sm rounded-full bg-columnBackgroundColor">
              0
            </div>
            {!editMode ? (
              column.title
            ) : (
              <Input
                autoFocus
                value={column.title}
                onChange={e => updateColumnTitle(column.id, e.target.value)}
                onKeyDown={e => {
                  if (e.key !== "Enter") return;
                  setEditMode(false);
                }}
                onBlur={() => setEditMode(false)}
                className="px-2 bg-black border-2 rounded outline-none focus:border-rose-500 focus-visible:ring-offset-0"
              />
            )}
          </CardTitle>
          <button
            onClick={() => deleteColumn(column.id)}
            className="px-1 py-2 rounded stroke-gray-500 hover:stroke-white hover:bg-columnBackgroundColor">
            <TrashIcon />
          </button>
        </CardHeader>
        <CardContent className="flex flex-grow">
          {tasks.map(task => (
            <div key={task.id}>{task.content}</div>
          ))}
        </CardContent>
        <CardFooter className="p-0">
          <button
            onClick={() => createTask(column.id)}
            className="flex items-center flex-grow gap-2 p-4 border-2 rounded-md border-columnBackgroundColor border-x-columnBackgroundColor hover:bg-mainBackgroundColor hover:text-rose-500 active:bg-black">
            <PlusIcon /> Add task
          </button>
        </CardFooter>
      </Card>
    </li>
  );
}

export default ColumnItem;
