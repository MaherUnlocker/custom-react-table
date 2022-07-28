import * as React from 'react';

import Checkbox from '@mui/material/Checkbox';
import { useManyClickHandlers } from './useManyClickHandlers';
import { TableDispatch } from 'react-table';
type ControlledCheckboxPropsType = {
  row: any;
  //dispatchSelectedRows: any;
  dispatchSelectedRows: TableDispatch<any>;
  selectedRows: any[];
};

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export default function ControlledCheckbox({ row, dispatchSelectedRows, selectedRows }: ControlledCheckboxPropsType) {
  console.log('🚀 ~ file: ControlledCheckbox.tsx ~ line 16 ~ ControlledCheckbox ~ row', row);
  const [checked, setChecked] = React.useState(selectedRows.filter((elm: any) => elm.id === row.id).length > 0);

  const singleClickHandler = (e: React.UIEvent<HTMLElement>) => {
    selectedRows.filter((elm: any) => elm.id === row.id).length > 0
      ? dispatchSelectedRows({
          type: 'customUnSelectRow',
          payload: row.id,
        })
      : dispatchSelectedRows({ type: 'customSelectRow', payload: row });
    setChecked(!checked);
  };
  const doubleClickHandler = (e: React.UIEvent<HTMLElement>) => {
    setChecked(!checked);
  };

  const clickHandler = useManyClickHandlers(singleClickHandler, doubleClickHandler);

  return (
    <div onClick={clickHandler}>
      <Checkbox checked={checked} inputProps={{ 'aria-label': 'controlled' }} />
    </div>
  );
}
