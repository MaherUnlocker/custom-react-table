import React, { Component } from 'react'
import Hidden from '@mui/material/Hidden'
import withStyles from '@mui/styles/withStyles';

import DataList from './DataList'
import DataTable from './DataTable'

const styles = {
  root: {},
}

/**
 * Responsive read-only table (desktop devices) <-> read-only expandable list (tablet/mobile devices) for material-ui 1.0-beta.
 */
class ResponsiveTable extends Component {
  handleChangePage = (event, page) => this.props.onChangePage(event, page);

  render() {
    const {
      classes,
      columns,
      count,
      checkboxSelection,
      data,
      rowsClassArray,
      excludePrimaryFromDetails,
      noContentText,
      tableBreakpoints,
      listBreakpoints,
      onSelectionChange,
      page,
      rowsPerPage,
      showPagination,
      DataGridProps,
      implementation,
      AccordionDetailsProps,
      AccordionDetailsTypographyProps,
      AccordionMoreIconProps,
      AccordionProps,
      AccordionSummaryProps,
      AccordionSummaryTypographyProps,
      TableBodyCellProps,
      TableBodyProps,
      TableBodyRowProps,
      TableHeadCellProps,
      TableHeadProps,
      TableHeadRowProps,
      TablePaginationProps,
      TableProps,
      enableShouldComponentUpdate,
    } = this.props;

    return (
      <div className={classes.root}>
        {/* DESKTOP BIG TABLE */}

        <Hidden only={tableBreakpoints || ['xs', 'sm', 'md']} implementation={implementation || 'js'}>
          <DataTable
            enableShouldComponentUpdate={enableShouldComponentUpdate}
            columns={columns}
            count={count}
            data={data}
            rowsClassArray={rowsClassArray}
            noContentText={noContentText}
            page={page}
            rowsPerPage={rowsPerPage}
            showPagination={showPagination}
            DataGridProps={DataGridProps}
            TableBodyCellProps={TableBodyCellProps}
            TableBodyProps={TableBodyProps}
            TableBodyRowProps={TableBodyRowProps}
            TableHeadCellProps={TableHeadCellProps}
            TableHeadProps={TableHeadProps}
            TableHeadRowProps={TableHeadRowProps}
            TablePaginationProps={TablePaginationProps}
            TableProps={TableProps}
            onChangePage={this.handleChangePage}
          />
        </Hidden>

        {/* MOBILE EXPANDABLE LIST OF CARDS */}

        <Hidden only={listBreakpoints || ['lg', 'xl']} implementation={implementation || 'js'}>
          <DataList
            enableShouldComponentUpdate={enableShouldComponentUpdate}
            columns={columns}
            count={count}
            checkboxSelection={checkboxSelection}
            data={data}
            onSelectionChange={onSelectionChange}
            rowsClassArray={rowsClassArray}
            excludePrimaryFromDetails={excludePrimaryFromDetails}
            noContentText={noContentText}
            page={page}
            rowsPerPage={rowsPerPage}
            showPagination={showPagination}
            AccordionDetailsProps={AccordionDetailsProps}
            AccordionDetailsTypographyProps={
              AccordionDetailsTypographyProps
            }
            AccordionMoreIconProps={AccordionMoreIconProps}
            AccordionProps={AccordionProps}
            AccordionSummaryProps={AccordionSummaryProps}
            AccordionSummaryTypographyProps={
              AccordionSummaryTypographyProps
            }
            TablePaginationProps={TablePaginationProps}
            onChangePage={this.handleChangePage}
          />
        </Hidden>
      </div>
    )
  }
}

export default withStyles(styles)(ResponsiveTable)
