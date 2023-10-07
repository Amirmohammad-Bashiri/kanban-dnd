import ColumnItem from "./ColumnItem";

import { type Id, type Column } from "../types";

type ColumnListProps = {
  columns: Column[];
  setColumns: React.Dispatch<React.SetStateAction<Column[]>>;
};

function ColumnList({ columns, setColumns }: ColumnListProps) {
  function deleteColumn(columnId: Id) {
    const filteredColumns = columns.filter(col => col.id !== columnId);

    setColumns(filteredColumns);
  }

  return (
    <div className="flex gap-2">
      {columns.map(col => (
        <ColumnItem key={col.id} column={col} deleteColumn={deleteColumn} />
      ))}
    </div>
  );
}

export default ColumnList;
