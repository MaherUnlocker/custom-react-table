import React from 'react';

import _uniqby from 'lodash.uniqby';
// import { useTranslation } from 'react-i18next';
import { FilterProps } from 'react-table';

import { findFirstColumn } from './Table';
import { StyledLabel } from '../components/assets/StyledLabel';
import { StyledSelectInput } from '../components/assets/StyledSelectInput';
import NoOptionsMessage from './NoOptionsMessage';

export default function DefaultColumnFilter<T extends Record<string, unknown>>({
  columns,
  column,
  rows,
  prepareRow,
}: FilterProps<T>): React.ReactElement {
  // const { t } = useTranslation();
  const { filterValue, setFilter, render, preFilteredRows, id } = column;
  const [, setValue] = React.useState(filterValue || '');

  const listOptions = React.useMemo(() => {
    const options = new Set();

    preFilteredRows.forEach((row: any) => {
      row.values[id] !== undefined &&
        row.values[id] !== '' &&
        row.values[id] !== null &&
        options.add({ value: row.values[id], label: row.values[id] });
    });
    return [...options.values()];
  }, [id, preFilteredRows]);

  // his uniquby from lodash for get unique array of object
  const unique: any = _uniqby(listOptions, 'label'); //using lodash function to filter and get unique opjects

  // this uniquby from lodash for get unique array of object
  // FilterArray = _uniqby(FilterArray, 'label'); //using lodash function to filter and get unique opjects
  // let unique: any = [...new Set(_without(FilterArray, undefined, null, 'null', 'undefined'))]; // FilterArray.filter((v, i, a) => a.indexOf(v) === i);

  const isFirstColumn = findFirstColumn(columns) === column;
  const [selecteFiltersColumn, setSelectedValueState] = React.useState<any[]>([]);
  console.log('🚀 ~ file: DefaultColumnFilter.tsx ~ line 51 ~ selecteFiltersColumn', { filterValue });

  function handleSelectOnChangeEvent(selectedOption: any, action: any) {
    if (selectedOption) {
      setSelectedValueState(selectedOption);
      // setFilter((prevState: any) => selectedOption.map((elm: any) => elm.value));
    }
  }
  React.useEffect(() => {
    setFilter((prevState: any) => selecteFiltersColumn.map((elm: any) => elm.value));
  }, [selecteFiltersColumn]);

  // ensure that reset loads the new value
  React.useEffect(() => {
    setValue(filterValue || '');
  }, [filterValue]);
  return (
    <React.Fragment>
      <StyledLabel htmlFor={column.id}>{render('Header')}</StyledLabel>
      <StyledSelectInput
        menuPlacement='auto'
        menuPosition='fixed'
        isMulti
        closeMenuOnSelect={false}
        value={selecteFiltersColumn}
        id={column.id}
        name={column.id}
        options={unique}
        placeholder={listOptions.length > 0 ? 'Sélectionner...' : 'Aucune'}
        onChange={handleSelectOnChangeEvent}
        // onInputChange={handleSelectOnChangeEvent}
        autoFocus={isFirstColumn}
        components={{ NoOptionsMessage }}
      />
    </React.Fragment>
  );
}
