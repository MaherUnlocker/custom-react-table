import { Popover } from '@mui/material';
import { createStyles, makeStyles } from '@mui/styles';
import { FormEvent, ReactElement, useCallback } from 'react';
import React from 'react';
import { TableInstance } from 'react-table';
// const useStyles = makeStyles(
//   createStyles({
//     columnsPopOver: {
//       padding: 24,
//       display: 'flex',
//     },
//     filtersResetButton: {
//       position: 'absolute',
//       top: 18,
//       right: 21,
//     },
//     popoverTitle: {
//       fontWeight: 500,
//       padding: '0 24px 24px 0',
//       textTransform: 'uppercase',
//     },
//     grid: {
//       display: 'grid',
//       gridTemplateColumns: 'repeat(2, 218px)',
//       '@media (max-width: 600px)': {
//         gridTemplateColumns: 'repeat(1, 180px)',
//       },
//       gridColumnGap: 24,
//       gridRowGap: 24,
//     },
//     cell: {
//       width: '100%',
//       display: 'flex',
//       flexDirection: 'column',
//     },
//     hidden: {
//       display: 'none',
//     },
//   })
// );
type FilterPageProps<T extends Record<string, unknown>> = {
  instance: TableInstance<T>;

  onClose: () => void;
};

export function FilterPage<T extends Record<string, unknown>>({
  instance,

  onClose,
}: FilterPageProps<T>): ReactElement {
  // const classes = useStyles({});
  const { setFilter, allColumns, setAllFilters } = instance;

  const resetFilters = useCallback(() => {
    setAllFilters([]);
  }, [setAllFilters]);

  return (
    <div>
      <div style={{ display: 'flex' }}>
        {allColumns
          .filter((it) => it.canFilter && it.isVisible)
          .map((column) => (
            <div key={column.id} className='d-flex px-2'>
              {console.log({ cc: column.id })}
              {column.render('Filter')}
            </div>
          ))}
      </div>
    </div>
  );
}
