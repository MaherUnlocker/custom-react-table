"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _Grid = require("@material-ui/core/Grid");

var _Grid2 = _interopRequireDefault(_Grid);

var _Box = require("@material-ui/core/Box");

var _Box2 = _interopRequireDefault(_Box);

var _Checkbox = require("@material-ui/core/Checkbox");

var _Checkbox2 = _interopRequireDefault(_Checkbox);

var _Typography = require("@material-ui/core/Typography");

var _Typography2 = _interopRequireDefault(_Typography);

var _withStyles = require("@material-ui/core/styles/withStyles");

var _withStyles2 = _interopRequireDefault(_withStyles);

var _Renderer = require("./Renderer");

var _ExpandableListItem = require("./ExpandableListItem");

var _ExpandableListItem2 = _interopRequireDefault(_ExpandableListItem);

var _NoContent = require("./NoContent");

var _NoContent2 = _interopRequireDefault(_NoContent);

var _Pagination = require("./Pagination");

var _Pagination2 = _interopRequireDefault(_Pagination);

var _lodash = require("lodash.isequal");

var _lodash2 = _interopRequireDefault(_lodash);

var _lodash3 = require("lodash");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var styles = {
  selectAllBox: {
    padding: "12px 16px"
  },
  checkbox: {
    padding: "0 10px 5px 0"
  }
};

/**
 * List with expandable items - mobile table analogue
 */

var DataList = function (_Component) {
  _inherits(DataList, _Component);

  function DataList(props) {
    _classCallCheck(this, DataList);

    var _this = _possibleConstructorReturn(this, (DataList.__proto__ || Object.getPrototypeOf(DataList)).call(this, props));

    _this.handleChangePage = function (event, page) {
      return _this.props.onChangePage({ event: event, page: page });
    };

    _this.handleSelection = function (row) {
      var onSelectionChange = _this.props.onSelectionChange;
      var selection = _this.state.selection;

      var newSelection = (0, _lodash3.cloneDeep)(selection);
      if (newSelection.indexOf(row.id) === -1) {
        newSelection.push(row.id);
      } else {
        newSelection.splice(newSelection.indexOf(row.id), 1);
      }
      _this.setState({ selection: newSelection });
      onSelectionChange({ rowIds: newSelection });
    };

    _this.handleSelectAll = function () {
      var _this$props = _this.props,
          onSelectionChange = _this$props.onSelectionChange,
          data = _this$props.data,
          rowsPerPage = _this$props.rowsPerPage;
      var selection = _this.state.selection;

      var newSelection = (0, _lodash3.cloneDeep)(selection);
      if (newSelection.length > 0) {
        newSelection = [];
      } else {
        newSelection = data.map(function (row) {
          return row.id;
        });
      }
      _this.setState({ selection: newSelection });
      onSelectionChange({ rowIds: newSelection });
    };

    _this.getRowClass = function (index) {
      var rowsClassArray = _this.props.rowsClassArray;

      return rowsClassArray && rowsClassArray[index] ? rowsClassArray[index] : "";
    };

    _this.createListItemTitle = function (columns, row, data) {
      var primaryColumns = columns.filter(function (column) {
        return column.primary;
      });
      return primaryColumns.length === 0 ? _react2.default.createElement(_Renderer.CellRenderer, { column: columns[0], row: row, data: data }) : primaryColumns.map(function (column) {
        return _react2.default.createElement(_Renderer.CellRenderer, {
          key: column.field,
          column: column,
          row: row,
          data: data
        });
      }).reduce(function (prev, next) {
        return [prev, " ", next];
      }); // divide item headers by space
    };

    _this.createListItemDescription = function (columns, row, data, excludePrimary) {
      return _react2.default.createElement(
        "div",
        null,
        columns.filter(function (column) {
          return !excludePrimary || !column.primary;
        }).map(function (column, index) {
          return _react2.default.createElement(
            _Grid2.default,
            { key: column.headerName + "-" + index, container: true },
            _react2.default.createElement(
              _Grid2.default,
              { item: true, xs: true },
              _react2.default.createElement(_Renderer.LabelRenderer, { column: column, data: data })
            ),
            _react2.default.createElement(
              _Grid2.default,
              { item: true, xs: true },
              _react2.default.createElement(_Renderer.CellRenderer, { column: column, row: row, data: data })
            )
          );
        })
      );
    };

    _this.state = { selection: [] };
    return _this;
  }

  _createClass(DataList, [{
    key: "shouldComponentUpdate",
    value: function shouldComponentUpdate(nextProps) {
      var _props = this.props,
          enableShouldComponentUpdate = _props.enableShouldComponentUpdate,
          data = _props.data;

      if (enableShouldComponentUpdate) {
        return !(0, _lodash2.default)(nextProps.data, data);
      }
      return true;
    }
  }, {
    key: "render",
    value: function render() {
      var _this2 = this;

      var _props2 = this.props,
          classes = _props2.classes,
          columns = _props2.columns,
          count = _props2.count,
          checkboxSelection = _props2.checkboxSelection,
          data = _props2.data,
          excludePrimaryFromDetails = _props2.excludePrimaryFromDetails,
          noContentText = _props2.noContentText,
          page = _props2.page,
          rowsPerPage = _props2.rowsPerPage,
          scrollToSelected = _props2.scrollToSelected,
          scrollOptions = _props2.scrollOptions,
          showPagination = _props2.showPagination,
          ExpansionPanelDetailsProps = _props2.ExpansionPanelDetailsProps,
          ExpansionPanelDetailsTypographyProps = _props2.ExpansionPanelDetailsTypographyProps,
          ExpansionPanelMoreIconProps = _props2.ExpansionPanelMoreIconProps,
          ExpansionPanelProps = _props2.ExpansionPanelProps,
          ExpansionPanelSummaryProps = _props2.ExpansionPanelSummaryProps,
          ExpansionPanelSummaryTypographyProps = _props2.ExpansionPanelSummaryTypographyProps,
          SelectedExpansionPanelProps = _props2.SelectedExpansionPanelProps,
          TablePaginationProps = _props2.TablePaginationProps;
      var selection = this.state.selection;

      if (!Array.isArray(data) || data.length === 0 || !Array.isArray(columns) || columns.length === 0) {
        return _react2.default.createElement(_NoContent2.default, { text: noContentText });
      }

      return _react2.default.createElement(
        "div",
        null,
        checkboxSelection && _react2.default.createElement(
          _Box2.default,
          { className: classes.selectAllBox },
          _react2.default.createElement(_Checkbox2.default, {
            className: classes.checkbox,
            checked: selection.length,
            indeterminate: selection.length > 0,
            onClick: this.handleSelectAll
          }),
          _react2.default.createElement(
            _Typography2.default,
            { component: "span" },
            "Select All"
          )
        ),
        data.map(function (row, index) {
          return _react2.default.createElement(_ExpandableListItem2.default, {
            key: index,
            onSelect: _this2.handleSelection,
            panelClass: _this2.getRowClass(index),
            summary: _this2.createListItemTitle(columns, row, data),
            row: row,
            details: _this2.createListItemDescription(columns, row, data, excludePrimaryFromDetails),
            checkboxSelection: checkboxSelection,
            selected: selection.indexOf(row.id) !== -1,
            scrollToSelected: scrollToSelected,
            scrollOptions: scrollOptions,
            ExpansionPanelDetailsProps: ExpansionPanelDetailsProps,
            ExpansionPanelDetailsTypographyProps: ExpansionPanelDetailsTypographyProps,
            ExpansionPanelMoreIconProps: ExpansionPanelMoreIconProps,
            ExpansionPanelProps: ExpansionPanelProps,
            ExpansionPanelSummaryProps: ExpansionPanelSummaryProps,
            ExpansionPanelSummaryTypographyProps: ExpansionPanelSummaryTypographyProps,
            SelectedExpansionPanelProps: SelectedExpansionPanelProps
          });
        }),
        showPagination && _react2.default.createElement(_Pagination2.default, {
          component: "div",
          count: count,
          rowsPerPage: rowsPerPage,
          page: page,
          TablePaginationProps: TablePaginationProps,
          onChangePage: this.handleChangePage
        })
      );
    }
  }]);

  return DataList;
}(_react.Component);

exports.default = (0, _withStyles2.default)(styles)(DataList);