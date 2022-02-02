import React, { Component } from "react";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Checkbox from "@mui/material/Checkbox";
import Typography from "@mui/material/Typography";
import withStyles from '@mui/styles/withStyles';

import { CellRenderer, LabelRenderer } from "./Renderer";
import ExpandableListItem from "./ExpandableListItem";
import NoContent from "./NoContent";
import Pagination from "./Pagination";
import _isEqual from "lodash.isequal";
import { cloneDeep } from "lodash";

const styles = {
  selectAllBox: {
    padding: `12px 16px`,
  },
  checkbox: {
    padding: `0 10px 5px 0`,
  },
};

/**
 * List with expandable items - mobile table analogue
 */
class DataList extends Component {
  constructor(props) {
    super(props);
    this.state = { selection: [] };
  }

  shouldComponentUpdate(nextProps) {
    const { enableShouldComponentUpdate, data } = this.props;
    if (enableShouldComponentUpdate) {
      return !_isEqual(nextProps.data, data);
    }
    return true;
  }

  handleChangePage = (event, page) => this.props.onChangePage({ event, page });

  handleSelection = (row) => {
    const { onSelectionChange } = this.props;
    const { selection } = this.state;
    const newSelection = cloneDeep(selection);
    if (newSelection.indexOf(row.id) === -1) {
      newSelection.push(row.id);
    } else {
      newSelection.splice(newSelection.indexOf(row.id), 1);
    }
    this.setState({ selection: newSelection });
    onSelectionChange({ rowIds: newSelection });
  };

  handleSelectAll = () => {
    const { onSelectionChange, data, rowsPerPage } = this.props;
    const { selection } = this.state;
    let newSelection = cloneDeep(selection);
    if (newSelection.length > 0) {
      newSelection = [];
    } else {
      newSelection = data.map((row) => row.id);
    }
    this.setState({ selection: newSelection });
    onSelectionChange({ rowIds: newSelection });
  };

  getRowClass = (index) => {
    const { rowsClassArray } = this.props;
    return rowsClassArray && rowsClassArray[index] ? rowsClassArray[index] : "";
  };

  createListItemTitle = (columns, row, data) => {
    const primaryColumns = columns.filter((column) => column.primary);
    return primaryColumns.length === 0 ? (
      <CellRenderer column={columns[0]} row={row} data={data} />
    ) : (
      primaryColumns
        .map((column) => (
          <CellRenderer
            key={column.field}
            column={column}
            row={row}
            data={data}
          />
        ))
        .reduce((prev, next) => [prev, " ", next])
    ); // divide item headers by space
  };

  createListItemDescription = (columns, row, data, excludePrimary) => (
    <div>
      {columns
        .filter((column) => !excludePrimary || !column.primary)
        .map((column, index) => (
          <Grid key={`${column.headerName}-${index}`} container>
            <Grid item xs>
              <LabelRenderer column={column} data={data} />
            </Grid>
            <Grid item xs>
              <CellRenderer column={column} row={row} data={data} />
            </Grid>
          </Grid>
        ))}
    </div>
  );

  render() {
    const {
      classes,
      columns,
      count,
      checkboxSelection,
      data,
      excludePrimaryFromDetails,
      noContentText,
      page,
      rowsPerPage,
      scrollToSelected,
      scrollOptions,
      showPagination,
      AccordionDetailsProps,
      AccordionDetailsTypographyProps,
      AccordionMoreIconProps,
      AccordionProps,
      AccordionSummaryProps,
      AccordionSummaryTypographyProps,
      SelectedExpansionPanelProps,
      TablePaginationProps,
    } = this.props;
    const { selection } = this.state;
    if (
      !Array.isArray(data) ||
      data.length === 0 ||
      !Array.isArray(columns) ||
      columns.length === 0
    ) {
      return <NoContent text={noContentText} />;
    }

    return (
      <div>
        {checkboxSelection && (
          <Box className={classes.selectAllBox}>
            <Checkbox
              className={classes.checkbox}
              checked={selection.length}
              indeterminate={selection.length > 0}
              onClick={this.handleSelectAll}
            />
            <Typography component={`span`}>Select All</Typography>
          </Box>
        )}
        {data.map((row, index) => (
          <ExpandableListItem
            key={index}
            onSelect={this.handleSelection}
            panelClass={this.getRowClass(index)}
            summary={this.createListItemTitle(columns, row, data)}
            row={row}
            details={this.createListItemDescription(
              columns,
              row,
              data,
              excludePrimaryFromDetails
            )}
            checkboxSelection={checkboxSelection}
            selected={selection.indexOf(row.id) !== -1}
            scrollToSelected={scrollToSelected}
            scrollOptions={scrollOptions}
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
            SelectedExpansionPanelProps={SelectedExpansionPanelProps}
          />
        ))}
        {showPagination && (
          <Pagination
            component="div"
            count={count}
            rowsPerPage={rowsPerPage}
            page={page}
            TablePaginationProps={TablePaginationProps}
            onChangePage={this.handleChangePage}
          />
        )}
      </div>
    );
  }
}

export default withStyles(styles)(DataList);
