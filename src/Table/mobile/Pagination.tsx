import React, { Component } from 'react'
import TableCell from '@mui/material/TableCell'
import TablePagination from '@mui/material/TablePagination'
export default class Pagination extends Component {
  handleChangePage = (event, page) => this.props.onChangePage(event, page)

  render() {
    const {
      component,
      count,
      rowsPerPage,
      page,
      TablePaginationProps,
    } = this.props

    return (
      <TablePagination
        {...TablePaginationProps}
        component={component || TableCell}
        count={count}
        rowsPerPage={rowsPerPage}
        rowsPerPageOptions={[rowsPerPage]}
        page={page}
        onPageChange={this.handleChangePage}
      />
    );
  }
}
