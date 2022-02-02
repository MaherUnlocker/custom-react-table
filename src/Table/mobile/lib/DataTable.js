"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _dataGrid = require("@material-ui/data-grid");

var _lodash = require("lodash.isequal");

var _lodash2 = _interopRequireDefault(_lodash);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * Material-ui DataGrid component
 */
var DataTable = function (_Component) {
  _inherits(DataTable, _Component);

  function DataTable() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, DataTable);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = DataTable.__proto__ || Object.getPrototypeOf(DataTable)).call.apply(_ref, [this].concat(args))), _this), _this.handleChangePage = function (params) {
      return _this.props.onChangePage(params);
    }, _this.getRowClass = function (index) {
      var rowsClassArray = _this.props.rowsClassArray;

      return rowsClassArray && rowsClassArray[index] ? rowsClassArray[index] : "";
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(DataTable, [{
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
      var _props2 = this.props,
          columns = _props2.columns,
          count = _props2.count,
          data = _props2.data,
          noContentText = _props2.noContentText,
          page = _props2.page,
          rowsPerPage = _props2.rowsPerPage,
          showPagination = _props2.showPagination,
          DataGridProps = _props2.DataGridProps;

      // if (
      //   !Array.isArray(data) ||
      //   data.length === 0 ||
      //   !Array.isArray(columns) ||
      //   columns.length === 0
      // ) {
      //   return <NoContent text={noContentText} />;
      // }

      return _react2.default.createElement(_dataGrid.DataGrid, _extends({
        columns: columns,
        rows: data,
        pageSize: rowsPerPage,
        page: page,
        rowCount: count,
        onPageChange: this.handleChangePage
      }, DataGridProps));
    }
  }]);

  return DataTable;
}(_react.Component);

exports.default = DataTable;