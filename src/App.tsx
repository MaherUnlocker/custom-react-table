import React from 'react';

import DynamicTable from './Table/DynamicTable';
import SelectAccountDropdown from './Table/SelectAccountDropdown';

export default function App() {
  return (
    <DynamicTable
      //put your backed api url
      url='https://fakestoreapi.com/products'
      // url='http://localhost:3004/products'
      //optionnal props
      actionColumn={<SelectAccountDropdown />}
      canGroupBy
      canSort
      canResize
      // canExpand
      // canSelect
      showGlobalFilter
      showFilterbyColomn
      showColomnIcon
    />
  );
}
