import React from 'react'

import Dynamictable from '../src/Table/Dynamictable'

export default function App() {
  return (
    <div>
      <Dynamictable url='https://jsonplaceholder.typicode.com/comments' />
    </div>
  )
}
