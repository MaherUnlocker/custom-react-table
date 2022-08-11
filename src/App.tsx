import { DynamicTable } from './Table/DynamicTable';

//import { DynamicTable } from '@maherunlocker/custom-react-table';
import React from 'react';
import { stringify } from 'querystring';
import VerticalDotsIcon from './components/assets/VerticalDotsIcon';
import { I18nextProvider } from 'react-i18next';
import i18next from './i18n';
import './index.css';
import { useManyClickHandlers } from './components/useManyClickHandlers';
import ControlledCheckbox from './components/ControlledCheckbox';

// eslint-disable-next-line
function SelectAccountDropdown(original: any) {
  return null;
}

interface customColumnProps {
  indexOFColumn: number;
  columnName: string;
  customJsx: React.ReactNode;
}

// eslint-disable-next-line

const IndeterminateCheckbox = React.forwardRef(({ indeterminate, ...rest }: any, ref: any) => {
  const defaultRef = React.useRef();
  const resolvedRef = ref || defaultRef;

  React.useEffect(() => {
    resolvedRef.current.indeterminate = indeterminate;
  }, [resolvedRef, indeterminate]);

  return <input type='checkbox' ref={resolvedRef} {...rest} />;
});

export default function App(): JSX.Element {
  const [filterActive, setLocalFilterActive] = React.useState<boolean>(false);
  const [selectedRows, setSelectedRows] = React.useState<any[]>([]);

  const [data, setData] = React.useState<any[]>([]);
  console.log('🚀 ~ file: App.tsx ~ line 42 ~ App ~ data', data);
  const [dataIsUpdated, setDataIsUpdated] = React.useState<boolean | number>(false);

  const [disableElment, setDesableElment] = React.useState(false);

  function SelectAccountDropdown2(original: any) {
    const [open, setOpen] = React.useState(false);
    return (
      <div className={disableElment ? 'w-100 disabledbutton' : 'w-100'}>
        <div className='dropdown'>
          <button
            id='dropdownMenuButton1'
            data-bs-toggle='dropdown'
            // className=" dropdown-toggle"
          >
            {open ? <div>One</div> : 'colum1'}
          </button>
          <div className='dropdown-menu' aria-labelledby='dropdownMenuButton'>
            {[1, 2, 3].map((elm, index) => (
              <div
                key={index}
                onClick={() => {
                  // alert(stringify(original.selectedRow));
                  setDataIsUpdated(true);
                  setDesableElment(true);
                  // setOpen(true);
                }}
              >
                elm
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  function FilterSideComponent(original: any): JSX.Element {
    return (
      <span
        style={{ boxShadow: '0px 0px 4px' }}
        className='badge border border-dark rounded-circle badge-light p-2  rounded'
      >
        3
      </span>
    );
  }

  let arrayOfCustomColumns: customColumnProps[] = [];
  arrayOfCustomColumns.push(
    // { indexOFColumn: 0, columnName: 'checkbox', customJsx: IndeterminateCheckbox },
    { indexOFColumn: 1, columnName: '_', customJsx: SelectAccountDropdown }
  );

  return (
    // <React.Suspense fallback={null}>
    <I18nextProvider i18n={i18next}>
      <DynamicTable
        //put your backed api url it's obligation  to get your date from api
        // name="'mah'"
        // url='http://192.168.2.14:4000/categories'
        url='http://192.168.2.14:4000/client'
        // url='http://192.168.2.14:4000/products'

        setData={setData}
        //optionnal props
        // --->here for add cusom component in the end of table
        actionColumn={() => null}
        // --->here you can add component side Filter Button
        customJsxSideFilterButton={<FilterSideComponent />}
        // --->here for grouping columns with same name

        // canGroupBy
        // --->here for sorting table
        canSort
        // showColumnIcon
        // --->here for resising with of column
        canResize
        // --->here for row and subrows
        canExpand
        // --->here showing checkbox in the begin of RowTable with return you the checked rows
        canSelect
        customSelect
        setSelectedRows={setSelectedRows}
        selectedRows={selectedRows}
        // --->here showing golobal filter input on the top of table
        showGlobalFilter
        // --->here showing  filter button  on the top of table
        showFilter
        filterActive={filterActive}
        setLocalFilterActive={setLocalFilterActive}
        // --->here add action header with delete and duplicate
        canDeleteOrDuplicate
        // --->here you can add any column to the table in the specified place with custom name and customjsx
        arrayOfCustomColumns={arrayOfCustomColumns}
        // --->here  if you dont have any other click in row you can use to get clicked row details

        // onClick={(row: any) => alert('row.original')}
        // when you update your backend set dataIsUpdated to true to render table
        setDataIsUpdated={setDataIsUpdated}
        dataIsUpdated={dataIsUpdated}
        elevationTable={0} //this for let you modify the height of the table and min height you can put number or string
        minHeight='70vh'
        maxHeight='80vh'
        requestHeader={{ 'Accept-Language': 'es' }}
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
    </I18nextProvider>
    // </React.Suspense>
  );
}
