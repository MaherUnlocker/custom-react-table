import { StyledButton } from '@aureskonnect/react-ui';
import { Chip } from '@mui/material';
import { createStyles, makeStyles } from '@mui/styles';
import React, { ReactElement, useCallback } from 'react';
import { ColumnInstance, FilterValue, IdType, TableInstance } from 'react-table';
const useStyles = makeStyles(
  createStyles({
    filtersActiveLabel: {
      color: '#998',
      fontSize: '14px',
      paddingRight: 10,
    },
    chipZone: {
      padding: '18px 0 5px 10px',
      width: '100%',
    },
    chipLabel: {
      fontWeight: 500,
      marginRight: 5,
    },
    filterChip: {
      marginRight: '5px!important',
      marginBottom: '5px!important',
      color: '#222',
    },
  })
);

type FilterChipBarProps<T extends Record<string, unknown>> = {
  instance: TableInstance<T>;
};

const getFilterValue = (column: ColumnInstance<any>, filterValue: FilterValue) => {
  switch (column.filter) {
    case 'between':
      const min = filterValue[0];
      const max = filterValue[1];
      return min ? (max ? `${min}-${max}` : `>=${min}`) : `<=${max}`;
  }
  return filterValue;
};

export function FilterChipBar<T extends Record<string, unknown>>({
  instance,
}: FilterChipBarProps<T>): ReactElement | null {
  const classes = useStyles({});
  const {
    allColumns,
    setFilter,
    setAllFilters,
    state: { filters },
  } = instance;

  const handleDelete = useCallback(
    (id: string | number) => {
      setFilter(id as IdType<T>, undefined);
    },
    [setFilter]
  );

  const resetFilters = useCallback(() => {
    setAllFilters([]);
  }, [setAllFilters]);

  return Object.keys(filters).length > 0 ? (
    <div className={classes.chipZone}>
      <span
        className={classes.filtersActiveLabel}
        style={{ color: '#FF0000', textDecoration: 'underline', cursor: 'pointer', fontWeight: 'bold' }}
        onClick={() => resetFilters()}
      >
        Effacer tous
      </span>

      {filters &&
        allColumns.map((column) => {
          const filter = filters.find((f) => f.id === column.id);

          const value = filter && filter.value;
          return (
            value && (
              <Chip
                // sx={{ marginRight: '8px!important' }}
                className={classes.filterChip}
                key={column.id}
                label={
                  <>
                    <span className={classes.chipLabel}>{column.render('Header')}: </span>
                    {getFilterValue(column, value)}
                  </>
                }
                onDelete={() => handleDelete(column.id)}
                variant='outlined'
              />
            )
          );
        })}
    </div>
  ) : null;
}
