import React, { Component } from "react";
import { DataGrid } from "@mui/x-data-grid";
import _isEqual from "lodash.isequal";

/**
 * Material-ui DataGrid component
 */
export default class DataTable extends Component {
  shouldComponentUpdate(nextProps) {
    const { enableShouldComponentUpdate, data } = this.props;
    if (enableShouldComponentUpdate) {
      return !_isEqual(nextProps.data, data);
    }
    return true;
  }

  handleChangePage = (params) => this.props.onChangePage(params);

  getRowClass = (index) => {
    const { rowsClassArray } = this.props;
    return rowsClassArray && rowsClassArray[index] ? rowsClassArray[index] : "";
  };

  render() {
    const {
      columns,
      count,
      data,
      noContentText,
      page,
      rowsPerPage,
      showPagination,
      DataGridProps,
    } = this.props;

    // if (
    //   !Array.isArray(data) ||
    //   data.length === 0 ||
    //   !Array.isArray(columns) ||
    //   columns.length === 0
    // ) {
    //   return <NoContent text={noContentText} />;
    // }

    return (
      <DataGrid
        columns={columns}
        rows={data}
        pageSize={rowsPerPage}
        page={page}
        rowCount={count}
        onPageChange={this.handleChangePage}
        {...DataGridProps}
      />
    );
  }
}
