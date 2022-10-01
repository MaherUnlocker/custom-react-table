import React from 'react';

import _uniqby from 'lodash.uniqby';
// import { useTranslation } from 'react-i18next';
import { FilterProps } from 'react-table';

import { findFirstColumn } from './Table';
import { StyledLabel } from '../components/assets/StyledLabel';
import { StyledSelectInput } from '../components/assets/StyledSelectInput';
import NoOptionsMessage from './NoOptionsMessage';
import { OptionProps } from 'react-select';

export default function DefaultColumnFilter<T extends Record<string, unknown>>({
  columns,
  column,
  rows,
  prepareRow,
}: FilterProps<T>): React.ReactElement {
  // const { t } = useTranslation();
  const { filterValue, setFilter, render, filter, preFilteredRows, id } = column;
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

  // ensure that reset loads the new value
  React.useEffect(() => {
    setValue(filterValue || '');
  }, [filterValue]);

  const FilterArray: any[] = rows.map((row: any) => {
    prepareRow(row);
    return (
      row.cells
        .filter((cel: any) => {
          const { key: cellKey } = cel.getCellProps();
          // eslint-disable-next-line
          return (cellKey as string).replace(/([^\_]*\_){2}/, '') === (column.id as string);
        })
        // eslint-disable-next-line
        .map((cell: any) => {
          return { label: String(cell.value), value: String(cell.value) };
        })[0]
    );
  });

  // his uniquby from lodash for get unique array of object
  const unique: any = _uniqby(listOptions, 'label'); //using lodash function to filter and get unique opjects

  // this uniquby from lodash for get unique array of object
  // FilterArray = _uniqby(FilterArray, 'label'); //using lodash function to filter and get unique opjects
  // let unique: any = [...new Set(_without(FilterArray, undefined, null, 'null', 'undefined'))]; // FilterArray.filter((v, i, a) => a.indexOf(v) === i);

  const isFirstColumn = findFirstColumn(columns) === column;
  const [, setSelectedValueState] = React.useState<any[]>([]);

  function handleSelectOnChangeEvent(selectedOption: any) {
    console.log(
      '🚀 ~ file: DefaultColumnFilter.tsx ~ line 65 ~ handleSelectOnChangeEvent ~ selectedOption',
      selectedOption
    );
    if (selectedOption) {
      setSelectedValueState(selectedOption);

      setFilter((prevState: any) => {
        console.log('🚀 ~ file: DefaultColumnFilter.tsx ~ line 59 ~ setFilter ~ prevState', prevState);
        return selectedOption.map((elm: any) => elm.value);
      });
      //setFilter(selectedValue.value);
    }
  }

  return (
    <React.Fragment>
      <StyledLabel htmlFor={column.id}>{render('Header')}</StyledLabel>
      <StyledSelectInput
        menuPlacement='auto'
        menuPosition='fixed'
        isMulti
        closeMenuOnSelect={false}
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
