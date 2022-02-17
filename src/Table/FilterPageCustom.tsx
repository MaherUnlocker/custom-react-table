import { DiskIcon, RefreshIcon, StyledButton, StyledIconButton } from '@aureskonnect/react-ui';
import { Box, Popover } from '@mui/material';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import { createStyles, makeStyles } from '@mui/styles';
import React, { FormEvent, ReactElement, useCallback } from 'react';
import { TableInstance } from 'react-table';
const useStyles = makeStyles(
  createStyles({
    columnsPopOver: {
      padding: 24,
      display: 'flex',
    },
    filtersResetButton: {
      position: 'absolute',
      top: 18,
      right: 21,
    },
    popoverTitle: {
      fontWeight: 500,
      padding: '0 24px 24px 0',
      textTransform: 'uppercase',
    },
    grid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(2, 218px)',
      '@media (max-width: 600px)': {
        gridTemplateColumns: 'repeat(1, 180px)',
      },
      gridColumnGap: 24,
      gridRowGap: 24,
    },
    cell: {
      width: '100%',
      display: 'flex',
      flexDirection: 'column',
    },
    hidden: {
      display: 'none',
    },
  })
);

type FilterPageCustomProps<T extends Record<string, unknown>> = {
  instance: TableInstance<T>;
  anchorEl?: Element;
  onClose?: () => void;
  show?: boolean;
  setLocalFilterActive: any;
  filterActive?: boolean;
};

export function FilterPageCustom<T extends Record<string, unknown>>({
  instance,
  anchorEl,
  onClose,
  show,
  filterActive,
  setLocalFilterActive,
}: FilterPageCustomProps<T>): ReactElement {
  const classes = useStyles({});
  const { allColumns, setAllFilters, rows, prepareRow } = instance;

  const onSubmit = useCallback(
    (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      // onClose();
    },
    [onClose]
  );

  // const resetFilters = useCallback(() => {
  //   setAllFilters([]);
  // }, [setAllFilters]);

  return (
    <div className={(classes.columnsPopOver, classes.grid, classes.cell)}>
      <form onSubmit={onSubmit} className={classes.cell}>
        <Box component='div' sx={{ borderBottom: '1px solid', marginX: 1, marginY: 2 }}>
          Filtrer
        </Box>
        <Box component='div' sx={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center' }}>
          <StyledButton rounded variant='info' style={{ margin: '5px' }}>
            Appliquer
          </StyledButton>
          <StyledIconButton icon='DiskIcon' style={{ margin: '5px', border: '1px solid' }}>
            <DiskIcon height={20} width={20} />
          </StyledIconButton>
          <StyledIconButton icon='RefreshIcon ' style={{ margin: '5px', border: '1px solid' }}>
            <RefreshIcon height={20} width={20} />
          </StyledIconButton>
        </Box>

        {/* <button onClick={resetFilters}>Reset</button> */}
        <Box component='div' sx={{ marginX: 1 }}>
          {allColumns

            .filter((it) => it.canFilter && it.id !== 'delete')
            .map((column) => {
              console.log({
                filterData: rows.map((row) => {
                  prepareRow(row);
                  return row.cells
                    .filter((cel: any) => {
                      const { key: cellKey } = cel.getCellProps();
                      return (cellKey as string).replace(/([^\_]*\_){2}/, '') === (column.id as string);
                    })
                    .map((cell: any) => {
                      return cell.value;
                    })[0];
                }),
              });

              let FilterArray: string[] = rows.map((row) => {
                prepareRow(row);
                return row.cells
                  .filter((cel: any) => {
                    const { key: cellKey } = cel.getCellProps();
                    return (cellKey as string).replace(/([^\_]*\_){2}/, '') === (column.id as string);
                  })

                  .map((cell: any) => {
                    return String(cell.value);
                  })[0];
              });
              let unique: any = FilterArray.filter((v, i, a) => a.indexOf(v) === i);

              return (
                <div key={column.id} className='d-flex mt-2'>
                  {column.render('Filter')}

                  <Autocomplete
                    disablePortal
                    id='combo-box-demo'
                    options={unique}
                    sx={{ width: 300 }}
                    renderInput={(params) => <TextField {...params} label={column.id} />}
                  />
                </div>
              );
            })}
        </Box>
      </form>
      <button
        onClick={() => {
          setLocalFilterActive(false);
        }}
      >
        fermer
      </button>
    </div>
  );
}
