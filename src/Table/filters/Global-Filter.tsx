import React, { useState } from "react";
import { useAsyncDebounce } from "react-table";

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export default function GlobalFilter({
    preGlobalFilteredRows,
    setGlobalFilter,
    customCssClass, //add your custom css class to edit serach input
}: any) {
    const count = preGlobalFilteredRows.length;
    const [value, setValue] = useState<string>("");
    const onChange = useAsyncDebounce((value) => {
        setGlobalFilter(value || undefined);
    }, 300);

    return (
        <input
            className={`form-control ${customCssClass}`}
            value={value || ""}
            onChange={(e) => {
                setValue(e.target.value);
                onChange(value);
                // setGlobalFilter(value || undefined);
            }}
            placeholder={`Search ${count} records...`}
        />
    );
}
