import React from 'react';

import Dynamictable from '../src/Table/Dynamictable';

export default function App() {
  return (
    <Dynamictable
      //put your backed api url
      url='http://localhost:3004/products'
      //optionnal props
      actionColumn={<div>put your component</div>}
      canGroupBy
      canSort
      canResize
      canSelect
      canExpand
    />
  );
}
