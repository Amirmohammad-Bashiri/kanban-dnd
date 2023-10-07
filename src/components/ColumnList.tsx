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
};

function ColumnList({ columns, deleteColumn }: ColumnListProps) {
  const columnsId = useMemo(() => columns.map(col => col.id), [columns]);

  return (
    <ul className="flex gap-4">
      <SortableContext
        strategy={horizontalListSortingStrategy}
        items={columnsId}>
        {columns.map(col => (
          <ColumnItem key={col.id} column={col} deleteColumn={deleteColumn} />
        ))}
      </SortableContext>
    </ul>
  );
}

export default ColumnList;
