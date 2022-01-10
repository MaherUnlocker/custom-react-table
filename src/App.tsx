import React from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

import Dynamictable from '../src/Table/Dynamictable';
import SelectAccountDropdown from './Table/SelectAccountDropdown';

export default function App() {
  return (
    <DndProvider backend={HTML5Backend}>
      <Dynamictable
        //put your backed api url
        url='https://fakestoreapi.com/products'
        // url='http://localhost:3004/products'
        //optionnal props
        actionColumn={<SelectAccountDropdown />}
        canGroupBy
        canSort
        canResize
        // canExpand
        canSelect
        showGlobalFilter
        showFilterbyColomn
        showColomnIcon
      />
    </DndProvider>
  );
}
