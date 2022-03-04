import DotIcon from './Table/DotIcon.svg';
import DynamicTable from './Table/DynamicTable';
import React from 'react';

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

function SelectAccountDropdown2(props: any) {
  return (
    <div className='w-100 d-flex justify-content-center'>
      <div className='dropdown'>
        <button
          id='dropdownMenuButton1'
          data-bs-toggle='dropdown'
          // className=" dropdown-toggle"
        >
          test
        </button>
        <div className='dropdown-menu' aria-labelledby='dropdownMenuButton'>
          <div className='dropdown-item' onClick={() => console.log({ props })}>
            Accéder à la carte
          </div>
          <div className='dropdown-item'>Voir la liste des boutiques</div>
        </div>
      </div>
    </div>
  );
}
function FilterSideComponent(): JSX.Element {
  return (
    <div style={{ marginLeft: 200, backgroundColor: 'red' }}>
      <div>Afficher Categorie</div>
      <div>test</div>
    </div>
  );
}

interface customColumnProps {
  indexOFColumn: number;
  columnName: string;
  customJsx: Function;
}

let arrayOfCustomColumns: customColumnProps[] = [];

arrayOfCustomColumns.push(
  { indexOFColumn: 0, columnName: 'column1', customJsx: SelectAccountDropdown2 },
  { indexOFColumn: 2, columnName: 'column2', customJsx: SelectAccountDropdown }
);

export default function App() {
  const [filterActive, setLocalFilterActive] = React.useState<boolean>(false);

  return (
    <DynamicTable
      //put your backed api url
      // url=' http://localhost:4000/products'
      url='http://localhost:4000/client'
      // url='http://localhost:4000/cards'
      // url='http://localhost:3004/categories'
      //  url='http://localhost:3004/categories'
      //optionnal props
      actionColumn={SelectAccountDropdown}
      customJsxSideFilterButton={<FilterSideComponent />}
      // canGroupBy
      canSort
      canResize
      // canExpand
      canSelect
      showGlobalFilter
      showFilterbyColumn
      // showColumnIcon
      canDeleteOrDuplicate
      filterActive={filterActive}
      setLocalFilterActive={setLocalFilterActive}
      arrayOfCustomColumns={arrayOfCustomColumns}
    />
  );
}
