import 'bootstrap/dist/css/bootstrap.min.css';

import './index.css';

import axios from 'axios';
import React, { useEffect, useMemo, useState } from 'react';
import { FilterValue, IdType, Row, useExpanded } from 'react-table';

import LoadingDataAnimation from '../components/LoadingDataAnimation';
import { Table } from './Table';

function filterGreaterThan(rows: Array<Row<any>>, id: Array<IdType<any>>, filterValue: FilterValue) {
  return rows.filter((row) => {
    const rowValue = row.values[id[0]];
    return rowValue >= filterValue;
  });
}

// This is an autoRemove method on the filter function that
// when given the new filter value and returns true, the filter
// will be automatically removed. Normally this is just an undefined
// check, but here, we want to remove the filter if it's not a number
filterGreaterThan.autoRemove = (val: any) => typeof val !== 'number';

type DynamictableProps = {
  url: string;
  canGroupBy?: boolean;
  canSort?: boolean;
  canResize?: boolean;
  canSelect?: boolean;
  canExpand?: boolean;
  actionColumn?: React.ReactNode;
};

export default function Dynamictable({
  url,
  actionColumn,
  canGroupBy,
  canSort,
  canResize,
  canSelect,
  canExpand,
}: DynamictableProps) {
  const [apiResult, setApiResult] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<null | any>(null);

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

  let apiResultColumns = useMemo(
    () =>
      apiResult[0]
        ? Object.keys(apiResult[0])
            .filter((key) => key !== 'rating' && key !== 'subRows')
            .map((key) => {
              if (key === 'image') {
                return {
                  Header: key,
                  accessor: key,
                  disableFilters: true,
                  // eslint-disable-next-line
                  Cell: (value: any) => {
                    return <img src={value.cell.value} className='h-25 w-25' alt='' />;
                  },
                };
              }

              return {
                Header: key,
                accessor: key,
                aggregate: 'count',
                Aggregated: ({ cell: { value } }: any) => `${value} Names`,
              };
            })
        : [],
    [apiResult]
  );

  const columns: any = useMemo(() => {
    if (canExpand) {
      return [
        {
          // Build our expander column
          id: 'expander', // Make sure it has an ID
          Header: '',
          Cell: ({ row }: any) =>
            // Use the row.canExpand and row.getToggleRowExpandedProps prop getter
            // to build the toggle for expanding a row
            row.canExpand ? (
              <span
                {...row.getToggleRowExpandedProps({
                  style: {
                    // We can even use the row.depth property
                    // and paddingLeft to indicate the depth
                    // of the row
                    paddingLeft: `${row.depth * 2}rem`,
                  },
                })}
              >
                {row.isExpanded ? <i className='arrow down'></i> : <i className='arrow right'></i>}
                {/* {row.isExpanded
                  ? ExpandIconDown === undefined
                    ? '👇'
                    : ExpandIconDown
                  : ExpandedIcon === undefined
                  ? '👉'
                  : ExpandedIcon} */}
              </span>
            ) : null,
        },
        ...apiResultColumns,
      ];
    }

    return apiResultColumns;
  }, [apiResultColumns]);

  useEffect(() => {
    fetchData(url);
  }, [url]);

  if (loading) return <LoadingDataAnimation />;

  return (
    <React.Fragment>
      <Table
        name={'myTable'}
        columns={columns}
        data={apiResult}
        canGroupBy={canGroupBy}
        canSort={canSort}
        canResize={canResize}
        actionColumn={actionColumn}
      />
    </React.Fragment>
  );
}
