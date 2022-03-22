import { DynamicTable } from './Table/DynamicTable';
import React from 'react';
import { VerticalDotsIcon } from '@aureskonnect/react-ui';
// eslint-disable-next-line
function SelectAccountDropdown(original: any) {
  return null;
  // <div className='w-100'>
  //   <div className='dropdown'>
  //     <VerticalDotsIcon
  //       height={25}
  //       width={25}
  //       id='dropdownMenuButton1'
  //       data-bs-toggle='dropdown'
  //       onClick={(e) => {
  //         // alert(original.selectedRow.original);
  //         e.stopPropagation();
  //       }}
  //       // className=" dropdown-toggle"
  //     />
  //     <div className='dropdown-menu' aria-labelledby='dropdownMenuButton'>
  //       <div
  //         className='dropdown-item'
  //         onClick={(e) => {
  //           alert(original.selectedRow.original);
  //           e.stopPropagation();
  //         }}
  //       >
  //         Accéder à la carte
  //       </div>
  //       <div className='dropdown-item'>Voirffffff la liste des boutiques</div>
  //     </div>
  //   </div>
  // </div>
}

function SelectAccountDropdown2({ row }: any) {
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

function FilterSideComponent(original: any): JSX.Element {
  return (
    <button
      className='mx-3'
      onClick={(e) => {
        alert('original.selectedRow.original');
        e.stopPropagation();
      }}
    >
      Custom Component
    </button>
  );
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
  { indexOFColumn: 2, columnName: 'column2', customJsx: FilterSideComponent }
);

export default function App(): JSX.Element {
  const [filterActive, setLocalFilterActive] = React.useState<boolean>(false);
  const [selectedRows, setSelectedRows] = React.useState<any[]>([]);
  const [dataIsUpdated, setDataIsUpdated] = React.useState<boolean | number>(false);

  return (
    <DynamicTable
      //put your backed api url it's obligation  to get your date from api
      // name="'mah'"
      url='http://localhost:4000/client'
      // url='http://localhost:4000/products'
      //optionnal props
      // --->here for add cusom component in the end of table
      actionColumn={SelectAccountDropdown}
      // --->here you can add component side Filter Button
      // customJsxSideFilterButton={<FilterSideComponent />}
      // --->here for grouping columns with same name
      // canGroupBy
      // --->here for sorting table
      canSort
      showColumnIcon
      // --->here for resising with of column
      canResize
      // --->here for row and subrows
      canExpand
      // --->here showing checkbox in the begin of RowTable with return you the checked rows
      // canSelect
      // setSelectedRows={setSelectedRows}
      // --->here showing golobal filter input on the top of table
      showGlobalFilter
      // --->here showing  filter button  on the top of table
      showFilter
      filterActive={filterActive}
      setLocalFilterActive={setLocalFilterActive}
      // --->here add action header with delete and duplicate
      canDeleteOrDuplicate
      // --->here you can add any column to the table in the specified place with custom name and customjsx
      // arrayOfCustomColumns={arrayOfCustomColumns}
      // --->here  if you dont have any other click in row you can use to get clicked row details

      // onClick={(row: any) => alert('row.original')}
      // when you update your backend set dataIsUpdated to true to render table
      setDataIsUpdated={setDataIsUpdated}
      dataIsUpdated={dataIsUpdated}
      // if you need your table is elevated in his parent
      elevationTable={3}
      //this for let you modify the height of the table and min height you can put number or string
      minHeight='70vh'
      maxHeight='80vh'
    />

    //  <p>Selected Rows: {selectedRows.length}</p>
    // <pre>
    //   <code>
    //     {JSON.stringify(
    //       {
    //         selectedRows,
    //       },
    //       null,
    //       2
    //     )}
    //   </code>
    // </pre>
  );
}
