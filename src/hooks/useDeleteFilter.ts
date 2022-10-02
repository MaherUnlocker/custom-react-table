import { useCallback } from "react";
import { Filters, IdType } from "react-table";

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export function useDeleteFilter<T extends Record<string, unknown>>(filters: Filters<T>, setFilter: (columnId: IdType<T>, updater: any) => void) {
    return useCallback(
        (id: string | number, selectedFilterValue: string | number) => {
            const filtered = filters.find((f) => f.id === id);
            const newValues = filtered !== undefined && filtered?.value.filter((f: any) => f !== selectedFilterValue);
            setFilter(id as IdType<T>, newValues?.length > 0 ? newValues : undefined);
        },
        [setFilter, filters]
    );
}