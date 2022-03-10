import DynamicTable from './Table/DynamicTable';
import React from 'react';
import { VerticalDotsIcon } from '@aureskonnect/react-ui';
// eslint-disable-next-line
function SelectAccountDropdown(props: any) {
  return (
    <div className='w-100'>
      <div className='dropdown'>
        <VerticalDotsIcon
          height={25}
          width={25}
          id='dropdownMenuButton1'
          data-bs-toggle='dropdown'
          // className=" dropdown-toggle"
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
          {[1, 2, 3].map((elm) => {
            return <div>elm</div>;
          })}
        </div>
      </div>
    </div>
  );
}

function FilterSideComponent(): JSX.Element {
  return <button className='mx-3'>Custom Component</button>;
}

interface customColumnProps {
  indexOFColumn: number;
  columnName: string;
  customJsx: React.ReactNode;
}

// eslint-disable-next-line
let arrayOfCustomColumns: customColumnProps[] = [];
arrayOfCustomColumns.push(
  { indexOFColumn: 4, columnName: 'column1', customJsx: SelectAccountDropdown2 },
  { indexOFColumn: 2, columnName: 'column2', customJsx: SelectAccountDropdown }
);

export default function App(): JSX.Element {
  const [filterActive, setLocalFilterActive] = React.useState<boolean>(false);
  const [selectedRows, setSelectedRows] = React.useState<any[]>([]);

  return (
    <>
      <DynamicTable
        //put your backed api url it's obligation  to get your date from api
        
        url='http://localhost:4000/client'
        // url='http://localhost:4000/cards'

        //optionnal props
        // --->here for add cusom component in the end of table
        actionColumn={SelectAccountDropdown}
        // --->here you can add component side Filter Button
        customJsxSideFilterButton={<FilterSideComponent />}
        // --->here for grouping columns with same name
        canGroupBy
        // --->here for sorting table
        canSort
        // --->here for resising with of column
        canResize
        // --->here for row and subrows
        canExpand
        // --->here showing checkbox in the begin of RowTable with return you the checked rows
        canSelect
        setSelectedRows={setSelectedRows}
        // --->here showing golobal filter input on the top of table
        showGlobalFilter
        // --->here showing  filter button  on the top of table
        showFilter
        // --->here add action header with delete and duplicate
        canDeleteOrDuplicate
        filterActive={filterActive}
        setLocalFilterActive={setLocalFilterActive}
        // --->here you can add any column to the table in the specified place with custom name and customjsx
        arrayOfCustomColumns={arrayOfCustomColumns}
        // --->here  if you dont have any other click in row you can use to get clicked row details
        
        onClick={(row: any) => console.log(row.original)}
      />
      <p>Selected Rows: {selectedRows.length}</p>
      <pre>
        <code>
          {JSON.stringify(
            {
              selectedRows,
            },
            null,
            2
          )}
        </code>
      </pre>
    </>
  );
}
