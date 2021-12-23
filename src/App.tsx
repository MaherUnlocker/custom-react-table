import React from 'react'

import Dynamictable from '../src/Table/Dynamictable'

export default function App() {
  function ActionColumn() {
    return (
      <React.Fragment>
        <button
          className='btn btn-secondary dropdown-toggle'
          type='button'
          id='dropdownMenuButton'
          data-toggle='dropdown'
          aria-expanded='false'
        >
          iyed
        </button>
      </React.Fragment>
    )
  }

  return (
    <div>
      <Dynamictable
        url='https://jsonplaceholder.typicode.com/comments'
        actionColumn={<ActionColumn />}
        canGroupBy={false}
        canSort={true}
        canResize={true}
      />
    </div>
  )
}
