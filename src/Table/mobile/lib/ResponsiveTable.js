'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _Hidden = require('@material-ui/core/Hidden');

var _Hidden2 = _interopRequireDefault(_Hidden);

var _styles = require('@material-ui/core/styles');

var _DataList = require('./DataList');

var _DataList2 = _interopRequireDefault(_DataList);

var _DataTable = require('./DataTable');

var _DataTable2 = _interopRequireDefault(_DataTable);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var styles = {
  root: {}

  /**
   * Responsive read-only table (desktop devices) <-> read-only expandable list (tablet/mobile devices) for material-ui 1.0-beta.
   */
};
var ResponsiveTable = function (_Component) {
  _inherits(ResponsiveTable, _Component);

  function ResponsiveTable() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, ResponsiveTable);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = ResponsiveTable.__proto__ || Object.getPrototypeOf(ResponsiveTable)).call.apply(_ref, [this].concat(args))), _this), _this.handleChangePage = function (event, page) {
      return _this.props.onChangePage(event, page);
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(ResponsiveTable, [{
    key: 'render',
    value: function render() {
      var _props = this.props,
          classes = _props.classes,
          columns = _props.columns,
          count = _props.count,
          checkboxSelection = _props.checkboxSelection,
          data = _props.data,
          rowsClassArray = _props.rowsClassArray,
          excludePrimaryFromDetails = _props.excludePrimaryFromDetails,
          noContentText = _props.noContentText,
          tableBreakpoints = _props.tableBreakpoints,
          listBreakpoints = _props.listBreakpoints,
          onSelectionChange = _props.onSelectionChange,
          page = _props.page,
          rowsPerPage = _props.rowsPerPage,
          showPagination = _props.showPagination,
          DataGridProps = _props.DataGridProps,
          implementation = _props.implementation,
          ExpansionPanelDetailsProps = _props.ExpansionPanelDetailsProps,
          ExpansionPanelDetailsTypographyProps = _props.ExpansionPanelDetailsTypographyProps,
          ExpansionPanelMoreIconProps = _props.ExpansionPanelMoreIconProps,
          ExpansionPanelProps = _props.ExpansionPanelProps,
          ExpansionPanelSummaryProps = _props.ExpansionPanelSummaryProps,
          ExpansionPanelSummaryTypographyProps = _props.ExpansionPanelSummaryTypographyProps,
          TableBodyCellProps = _props.TableBodyCellProps,
          TableBodyProps = _props.TableBodyProps,
          TableBodyRowProps = _props.TableBodyRowProps,
          TableHeadCellProps = _props.TableHeadCellProps,
          TableHeadProps = _props.TableHeadProps,
          TableHeadRowProps = _props.TableHeadRowProps,
          TablePaginationProps = _props.TablePaginationProps,
          TableProps = _props.TableProps,
          enableShouldComponentUpdate = _props.enableShouldComponentUpdate;


      return _react2.default.createElement(
        'div',
        { className: classes.root },
        _react2.default.createElement(
          _Hidden2.default,
          { only: tableBreakpoints || ['xs', 'sm', 'md'], implementation: implementation || 'js' },
          _react2.default.createElement(_DataTable2.default, {
            enableShouldComponentUpdate: enableShouldComponentUpdate,
            columns: columns,
            count: count,
            data: data,
            rowsClassArray: rowsClassArray,
            noContentText: noContentText,
            page: page,
            rowsPerPage: rowsPerPage,
            showPagination: showPagination,
            DataGridProps: DataGridProps,
            TableBodyCellProps: TableBodyCellProps,
            TableBodyProps: TableBodyProps,
            TableBodyRowProps: TableBodyRowProps,
            TableHeadCellProps: TableHeadCellProps,
            TableHeadProps: TableHeadProps,
            TableHeadRowProps: TableHeadRowProps,
            TablePaginationProps: TablePaginationProps,
            TableProps: TableProps,
            onChangePage: this.handleChangePage
          })
        ),
        _react2.default.createElement(
          _Hidden2.default,
          { only: listBreakpoints || ['lg', 'xl'], implementation: implementation || 'js' },
          _react2.default.createElement(_DataList2.default, {
            enableShouldComponentUpdate: enableShouldComponentUpdate,
            columns: columns,
            count: count,
            checkboxSelection: checkboxSelection,
            data: data,
            onSelectionChange: onSelectionChange,
            rowsClassArray: rowsClassArray,
            excludePrimaryFromDetails: excludePrimaryFromDetails,
            noContentText: noContentText,
            page: page,
            rowsPerPage: rowsPerPage,
            showPagination: showPagination,
            ExpansionPanelDetailsProps: ExpansionPanelDetailsProps,
            ExpansionPanelDetailsTypographyProps: ExpansionPanelDetailsTypographyProps,
            ExpansionPanelMoreIconProps: ExpansionPanelMoreIconProps,
            ExpansionPanelProps: ExpansionPanelProps,
            ExpansionPanelSummaryProps: ExpansionPanelSummaryProps,
            ExpansionPanelSummaryTypographyProps: ExpansionPanelSummaryTypographyProps,
            TablePaginationProps: TablePaginationProps,
            onChangePage: this.handleChangePage
          })
        )
      );
    }
  }]);

  return ResponsiveTable;
}(_react.Component);

exports.default = (0, _styles.withStyles)(styles)(ResponsiveTable);