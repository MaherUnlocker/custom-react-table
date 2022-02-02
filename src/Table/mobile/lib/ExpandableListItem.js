'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

var _ExpandMore = require('@material-ui/icons/ExpandMore');

var _ExpandMore2 = _interopRequireDefault(_ExpandMore);

var _Accordion = require('@material-ui/core/Accordion');

var _Accordion2 = _interopRequireDefault(_Accordion);

var _AccordionSummary = require('@material-ui/core/AccordionSummary');

var _AccordionSummary2 = _interopRequireDefault(_AccordionSummary);

var _AccordionDetails = require('@material-ui/core/AccordionDetails');

var _AccordionDetails2 = _interopRequireDefault(_AccordionDetails);

var _Checkbox = require('@material-ui/core/Checkbox');

var _Checkbox2 = _interopRequireDefault(_Checkbox);

var _Typography = require('@material-ui/core/Typography');

var _Typography2 = _interopRequireDefault(_Typography);

var _withStyles = require('@material-ui/core/styles/withStyles');

var _withStyles2 = _interopRequireDefault(_withStyles);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var styles = {
  summaryText: {
    width: '100%'
  },
  detailsText: {
    opacity: 0.5,
    width: '100%'
  },
  checkbox: {
    padding: '0 10px 5px 0'
  }
};

/**
 * Expandable component with header text (summary) and expandable description text (details)
 */

var ExpandableListItem = function (_Component) {
  _inherits(ExpandableListItem, _Component);

  function ExpandableListItem() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, ExpandableListItem);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = ExpandableListItem.__proto__ || Object.getPrototypeOf(ExpandableListItem)).call.apply(_ref, [this].concat(args))), _this), _this.onSelect = function (event) {
      var _this$props = _this.props,
          onSelect = _this$props.onSelect,
          row = _this$props.row;


      onSelect(row);
      event.stopPropagation();
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(ExpandableListItem, [{
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps) {
      if (nextProps.selected && nextProps.scrollToSelected) {
        // @material-ui/core encourages ReactDOM until React find better way
        // https://@material-ui/core.com/getting-started/frequently-asked-questions/#how-can-i-access-the-dom-element-
        _reactDom2.default.findDOMNode(this).scrollIntoView(nextProps.scrollOptions || { behavior: 'smooth', block: 'center' });
      }
    }
  }, {
    key: 'render',
    value: function render() {
      var _props = this.props,
          classes = _props.classes,
          checkboxSelection = _props.checkboxSelection,
          panelClass = _props.panelClass,
          details = _props.details,
          selected = _props.selected,
          summary = _props.summary,
          ExpansionPanelDetailsProps = _props.ExpansionPanelDetailsProps,
          ExpansionPanelDetailsTypographyProps = _props.ExpansionPanelDetailsTypographyProps,
          ExpansionPanelMoreIconProps = _props.ExpansionPanelMoreIconProps,
          ExpansionPanelProps = _props.ExpansionPanelProps,
          ExpansionPanelSummaryProps = _props.ExpansionPanelSummaryProps,
          ExpansionPanelSummaryTypographyProps = _props.ExpansionPanelSummaryTypographyProps,
          SelectedExpansionPanelProps = _props.SelectedExpansionPanelProps;


      var rootProps = selected ? _extends({}, ExpansionPanelProps, SelectedExpansionPanelProps) : ExpansionPanelProps;

      return _react2.default.createElement(
        _Accordion2.default,
        _extends({ className: panelClass && panelClass }, rootProps),
        _react2.default.createElement(
          _AccordionSummary2.default,
          _extends({
            expandIcon: _react2.default.createElement(_ExpandMore2.default, ExpansionPanelMoreIconProps)
          }, ExpansionPanelSummaryProps),
          checkboxSelection && _react2.default.createElement(_Checkbox2.default, { className: classes.checkbox, checked: selected, onClick: this.onSelect }),
          _react2.default.createElement(
            _Typography2.default,
            _extends({
              classes: {
                root: classes.summaryText
              },
              gutterBottom: true,
              variant: 'subtitle1'
            }, ExpansionPanelSummaryTypographyProps),
            summary
          )
        ),
        _react2.default.createElement(
          _AccordionDetails2.default,
          ExpansionPanelDetailsProps,
          _react2.default.createElement(
            _Typography2.default,
            _extends({
              classes: {
                root: classes.detailsText
              },
              gutterBottom: true,
              component: 'div'
            }, ExpansionPanelDetailsTypographyProps),
            details
          )
        )
      );
    }
  }]);

  return ExpandableListItem;
}(_react.Component);

exports.default = (0, _withStyles2.default)(styles)(ExpandableListItem);