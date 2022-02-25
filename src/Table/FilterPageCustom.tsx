import {
  CrossIcon,
  DiskIcon,
  RefreshIcon,
  StyledButton,
  StyledH2,
  StyledIconButton,
  StyledLabel,
  StyledSelectInput,
  VerticalDotsIcon,
} from '@aureskonnect/react-ui';
import { Box, Popover } from '@mui/material';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import { createStyles, makeStyles } from '@mui/styles';
import React, { FormEvent, ReactElement, useCallback } from 'react';
import { TableInstance } from 'react-table';

import { FilterChipBar } from './FilterChipBar';

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
  onClose,
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

  const resetFilters = useCallback(() => {
    setAllFilters([]);
  }, [setAllFilters]);
  let testarray = [
    {
      label: 'background',
      value: 'background',
    },
    {
      label: 'principal',
      value: 'principal',
    },
    {
      label: 'secondary',
      value: 'secondary',
    },
    {
      label: 'disabledButtonBorder',
      value: 'disabledButtonBorder',
    },
    {
      label: 'disabled',
      value: 'disabled',
    },
    {
      label: 'white',
      value: 'white',
    },
    {
      label: 'text',
      value: 'text',
    },
    {
      label: 'danger',
      value: 'danger',
    },
    {
      label: 'reminder',
      value: 'reminder',
    },
    {
      label: 'success',
      value: 'success',
    },
    {
      label: 'info',
      value: 'info',
    },
    {
      label: 'warning',
      value: 'warning',
    },
  ];
  return (
    <>
      <div className={(classes.columnsPopOver, classes.grid, classes.cell)}>
        <StyledLabel style={{ borderBottom: '2px solid', marginX: 1, marginTop: 10 }}>Filtres enregistrés</StyledLabel>

        <Box component='div' sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <div style={{ width: ' 100%', marginTop: 10 }}>
            <StyledLabel htmlFor='savedFilter'>Sélectionner un filtre</StyledLabel>
            <StyledSelectInput
              // defaultValue={selectedValueState}
              // value={selectedValueState}
              id='savedFilter'
              name='savedFilter'
              options={testarray}
              placeholder={testarray.length > 0 ? 'Sélectionner ...' : 'Aucune'}
              // onChange={handleChange}
              // onChange={handleSelectOnChangeEvent}
              // autoFocus={isFirstColumn}
              // onBlur={(e: any) => {
              //   console.log(e.target);
              //   // setFilter(e.target.value || undefined);
              // }}
            />
          </div>

          <Box component='div' sx={{ display: 'flex', alignItems: 'end' }}>
            <StyledIconButton icon='DiskIcon' style={{ margin: '5px', marginBottom: '0', border: '1px solid' }}>
              <DiskIcon height={20} width={20} />
            </StyledIconButton>

            <StyledIconButton icon='VerticalDotsIcon' style={{ margin: '5px', marginBottom: '0', border: '1px solid' }}>
              <VerticalDotsIcon height={20} width={20} />
            </StyledIconButton>
          </Box>
        </Box>

        <StyledLabel style={{ borderBottom: '2px solid', marginX: 1, marginTop: 10 }}>Filtrer</StyledLabel>

        {Object.keys(instance.state.filters).length > 0 ? (
          <Box
            component='div'
            style={{ maxHeight: '10vh', overflow: 'auto', alignItems: 'center', overflowY: 'auto' }}
            sx={{ marginLeft: 1, marginRight: 1 }}
          >
            <FilterChipBar instance={instance} />{' '}
          </Box>
        ) : (
          <StyledButton rounded variant='light' style={{ width: '100%' }}>
            Aucun filtre actif
          </StyledButton>
        )}

        <Box
          component='div'
          style={{ height: '60vh', overflow: 'auto', alignItems: 'center' }}
          sx={{ marginLeft: 1, marginRight: 1 }}
        >
          {allColumns
            .filter((it) => it.canFilter && it.id !== 'delete' && it.isVisible)
            .map((column) => {
              return (
                <div
                  className='my-2'
                  // sx={{ height: 50, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}
                >
                  {column.render('Filter')}
                </div>
              );
            })}
        </Box>
      </div>
    </>
  );
}
