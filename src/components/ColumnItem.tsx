import { useState } from "react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { clsx } from "clsx";

import TrashIcon from "../icons/TrashIcon";

import { type Column, type Id } from "../types";

type ColumnItemProps = {
  column: Column;
  deleteColumn: (columnId: Id) => void;
};

function ColumnItem({ column, deleteColumn }: ColumnItemProps) {
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
  });

  const style = {
    transition,
    transform: CSS.Transform.toString(transform),
  };

  return (
    <li
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      onClick={() => setEditMode(true)}
      className={clsx(
        "touch-none bg-columnBackgroundColor w-[350px] h-[500px] max-h-[500px] rounded-md flex flex-col",
        isDragging && "border-2 border-rose-500 opacity-40"
      )}>
      <div className="bg-mainBackgroundColor text-md h-[60px] cursor-grab rounded rounded-b-none p-3 font-bold border-columnBackgroundColor border-4 flex items-center justify-between">
        <div className="flex gap-2">
          <div className="flex items-center justify-center px-2 py-1 text-sm rounded-full bg-columnBackgroundColor">
            0
          </div>
          {!editMode ? column.title : <input />}
        </div>
        <button
          onClick={() => deleteColumn(column.id)}
          className="px-1 py-2 rounded stroke-gray-500 hover:stroke-white hover:bg-columnBackgroundColor">
          <TrashIcon />
        </button>
      </div>
      <div className="flex flex-grow">Content</div>
      <div>Footer</div>
    </li>
  );
}

export default ColumnItem;
