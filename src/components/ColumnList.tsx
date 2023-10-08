import { useMemo } from "react";
import {
  SortableContext,
  horizontalListSortingStrategy,
} from "@dnd-kit/sortable";

import ColumnItem from "./ColumnItem";

import { type Id, type Column } from "../types";

type ColumnListProps = {
  columns: Column[];
  deleteColumn: (columnId: Id) => void;
  updateColumnTitle: (colId: Id, title: string) => void;
};

function ColumnList({
  columns,
  deleteColumn,
  updateColumnTitle,
}: ColumnListProps) {
  const columnsId = useMemo(() => columns.map(col => col.id), [columns]);

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
          />
        ))}
      </SortableContext>
    </ul>
  );
}

export default ColumnList;
