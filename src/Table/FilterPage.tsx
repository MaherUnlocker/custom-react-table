import React, { FormEvent, ReactElement, useCallback } from "react";
import { TableInstance } from "react-table";
import { Popover } from "@material-ui/core";

type FilterPageProps<T extends Record<string, unknown>> = {
  instance: TableInstance<T>;
  anchorEl?: Element;
  onClose: () => void;
  show: boolean;
};

export function FilterPage<T extends Record<string, unknown>>({
  instance,
  anchorEl,
  onClose,
  show
}: FilterPageProps<T>): ReactElement {
  const { allColumns, setAllFilters } = instance;

  const onSubmit = useCallback(
    (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      onClose();
    },
    [onClose]
  );

  const resetFilters = useCallback(() => {
    setAllFilters([]);
  }, [setAllFilters]);

  return (
    <div>
      <Popover
        anchorEl={anchorEl}
        id={"popover-filters"}
        onClose={onClose}
        open={show}
      >
        <div>
          <form onSubmit={onSubmit}>
            <button color="primary" onClick={resetFilters}>
              Reset
            </button>
            <div>
              {allColumns
                .filter((it) => it.canFilter)
                .map((column) => (
                  <div key={column.id}>{column.render("Filter")}</div>
                ))}
            </div>
          </form>
        </div>
      </Popover>
    </div>
  );
}
