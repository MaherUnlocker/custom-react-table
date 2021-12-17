import { CssBaseline, MenuItem, TextField } from "@material-ui/core";
import axios from "axios";
import React, { useCallback } from "react";
import {
  CellProps,
  FilterProps,
  FilterValue,
  IdType,
  Row,
  TableInstance
} from "react-table";

import { Table } from "./Table";
import { PersonData, makeData } from "./utils";
import "bootstrap/dist/css/bootstrap.min.css";

// This is a custom aggregator that
// takes in an array of values and
// returns the rounded median

function filterGreaterThan(
  rows: Array<Row<any>>,
  id: Array<IdType<any>>,
  filterValue: FilterValue
) {
  return rows.filter((row) => {
    const rowValue = row.values[id[0]];
    return rowValue >= filterValue;
  });
}

// This is an autoRemove method on the filter function that
// when given the new filter value and returns true, the filter
// will be automatically removed. Normally this is just an undefined
// check, but here, we want to remove the filter if it's not a number
filterGreaterThan.autoRemove = (val: any) => typeof val !== "number";

function SelectColumnFilter({
  column: { filterValue, render, setFilter, preFilteredRows, id }
}: FilterProps<PersonData>) {
  const options = React.useMemo(() => {
    const options = new Set<any>();
    preFilteredRows.forEach((row) => {
      options.add(row.values[id]);
    });
    return [...Array.from(options.values())];
  }, [id, preFilteredRows]);

  return (
    <TextField
      select
      label={render("Header")}
      value={filterValue || ""}
      onChange={(e) => {
        setFilter(e.target.value || undefined);
      }}
    >
      <li value={""}>All</li>
      {options.map((option, i) => (
        <MenuItem key={i} value={option}>
          {option}
        </MenuItem>
      ))}
    </TextField>
  );
}

const App: React.FC = () => {
  const [apiResult, setApiResult] = React.useState<any[]>([]);
  const [loading, setLoading] = React.useState<boolean>(false);
  const [error, setError] = React.useState<null | any>(null);
  async function fetchData(url: any) {
    await axios
      .get(url)
      .then((response) => {
        setApiResult(response.data);
      })
      .catch((err) => {
        setError(err);
      })
      .finally(() => {
        setLoading(false);
      });
  }
  // const [apiResult] = React.useState<PersonData[]>(() => makeData(10000));
  const apiResultColumns = React.useMemo(
    () =>
      apiResult[0]
        ? Object.keys(apiResult[0])
            .filter((key) => key !== "rating")
            .map((key) => {
              if (key === "image") {
                return {
                  Header: key,
                  accessor: key,
                  disableFilters: true,
                  Cell: (value: any) => {
                    return (
                      <img
                        src={value.cell.value}
                        className="h-25 w-25"
                        alt=""
                      />
                    );
                  }
                };
              }

              return {
                Header: key,
                accessor: key,
                aggregate: "count",
                Aggregated: ({ cell: { value } }: CellProps) => `${value} Names`
              };
            })
        : [],
    [apiResult]
  );

  // const columns: any = React.useMemo(() => apiResultColumns, [
  //   apiResultColumns
  // ]);

  // const [apiResult] = React.useState<PersonData[]>(() => makeData(10000));
  // const [data] = React.useMemo(() => [...apiResult], [apiResult]);
  React.useEffect(() => {
    fetchData("https://jsonplaceholder.typicode.com/todos");
  }, []);

  // console.log(columns);
  // console.log(data);
  return (
    <div>
      <CssBaseline />
      <Table name={"testTable"} columns={apiResultColumns} data={apiResult} />
    </div>
  );
};

export default App;
