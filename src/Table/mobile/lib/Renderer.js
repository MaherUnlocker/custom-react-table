"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var CellRenderer = exports.CellRenderer = function CellRenderer(_ref) {
  var column = _ref.column,
      row = _ref.row,
      data = _ref.data;

  var cell = row[column.field];
  if (column.valueGetter) {
    cell = column.valueGetter(_defineProperty({ value: cell, data: row }, "data", data));
  }
  if (column.renderCell) {
    cell = column.renderCell(_defineProperty({ value: cell, data: row }, "data", data));
  }
  return cell;
};

var LabelRenderer = exports.LabelRenderer = function LabelRenderer(_ref2) {
  var column = _ref2.column,
      data = _ref2.data;
  return column.renderLabel ? column.renderLabel(column, data) : column.headerName.toUpperCase();
};