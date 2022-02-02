import React from 'react';

import DynamicTable from './Table/Dynamictable';
import SelectAccountDropdown from './Table/SelectAccountDropdown';

export default function App() {
  return (
    <DynamicTable
      //put your backed api url
      url='http://localhost:4000/client'
      // url='http://localhost:4000/person'
      // url='http://localhost:3004/categories'
      //optionnal props
      actionColumn={SelectAccountDropdown}
      canGroupBy
      canSort
      canResize
      canExpand
      canSelect
      showGlobalFilter
      showFilterbyColumn
      showColumnIcon
      canDeleteOrDuplicate
    />
  );
}
