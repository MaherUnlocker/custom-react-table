import React from 'react';

import DotIcon from './Table/DotIcon.svg';
import DynamicTable from './Table/DynamicTable';

function SelectAccountDropdown(props: any) {
  return (
    <div className='w-100'>
      <div className='dropdown'>
        <img
          src={DotIcon}
          id='dropdownMenuButton1'
          data-bs-toggle='dropdown'
          // className=" dropdown-toggle"
          alt='parmetrage'
        />
        <div className='dropdown-menu' aria-labelledby='dropdownMenuButton'>
          <div className='dropdown-item'>Accéder à la carte</div>
          <div className='dropdown-item'>Voir la liste des boutiques</div>
        </div>
      </div>
    </div>
  );
}

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
      // canExpand
      canSelect
      showGlobalFilter
      showFilterbyColumn
      showColumnIcon
      canDeleteOrDuplicate
    />
  );
}
