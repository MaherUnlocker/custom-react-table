import 'bootstrap/dist/css/bootstrap.min.css'

import axios from 'axios'
import React from 'react'
import { FilterValue, IdType, Row } from 'react-table'

import LoadingDataAnimation from './components/LoadingDataAnimation'
import { Table } from './Table'

function filterGreaterThan(rows: Array<Row<any>>, id: Array<IdType<any>>, filterValue: FilterValue) {
  return rows.filter((row) => {
    const rowValue = row.values[id[0]]
    return rowValue >= filterValue
  })
}

// This is an autoRemove method on the filter function that
// when given the new filter value and returns true, the filter
// will be automatically removed. Normally this is just an undefined
// check, but here, we want to remove the filter if it's not a number
filterGreaterThan.autoRemove = (val: any) => typeof val !== 'number'

const App: React.FC = () => {
  const [apiResult, setApiResult] = React.useState<any[]>([])
  const [loading, setLoading] = React.useState<boolean>(false)
  const [error, setError] = React.useState<null | any>(null)
  async function fetchData(url: any) {
    await axios
      .get(url)
      .then((response) => {
        setApiResult(response.data)
      })
      .catch((err) => {
        setError(err)
      })
      .finally(() => {
        setLoading(false)
      })
  }

  const apiResultColumns = React.useMemo(
    () =>
      apiResult[0]
        ? Object.keys(apiResult[0])
            .filter((key) => key !== 'rating')
            .map((key) => {
              if (key === 'image') {
                return {
                  Header: key,
                  accessor: key,
                  disableFilters: true,
                  Cell: (value: any) => {
                    return <img src={value.cell.value} className='h-25 w-25' alt='' />
                  },
                }
              }

              return {
                Header: key,
                accessor: key,
                aggregate: 'count',
                Aggregated: ({ cell: { value } }: any) => `${value} Names`,
              }
            })
        : [],
    [apiResult]
  )

  const columns: any = React.useMemo(() => apiResultColumns, [apiResultColumns])

  // const [data] = React.useMemo(() => [...apiResult], [apiResult])
  React.useEffect(() => {
    fetchData('https://fakestoreapi.com/products')
    // fetchData('https://jsonplaceholder.typicode.com/todos')
  }, [])
  if (loading) return <LoadingDataAnimation />
  if (error) return <div>Loading data error...</div>
  return (
    <div>
      <Table name={'testTable'} columns={columns} data={apiResult} />
    </div>
  )
}

export default App
