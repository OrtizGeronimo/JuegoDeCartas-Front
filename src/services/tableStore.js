import { useLayoutEffect, useState } from "react";
import { Subject } from "rxjs";
import { Table } from "../services/tableService";

let currentTable;

const tableSubject = new Subject();

export function useCurrentTable() {
  const [table, setTable] = useState(currentTable);

  useLayoutEffect(() => {
    const subscription = tableSubject.subscribe((newState) => {
      setTable(newState);
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  return table;
}

export function setCurrentTable(table) {
  currentTable = table;
  setTimeout(() => tableSubject.next(currentTable), 0);
}

