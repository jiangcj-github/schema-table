"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ST = void 0;

var _react = _interopRequireDefault(require("react"));

var _antd = require("antd");

var _editCell = require("./edit-cell");

var _lodash = _interopRequireDefault(require("lodash"));

var _status = require("./status");

var _styledComponents = _interopRequireDefault(require("styled-components"));

var _tools = require("./tools");

var _model = require("./model");

var ICON = _interopRequireWildcard(require("@ant-design/icons"));

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _templateObject4() {
  var data = _taggedTemplateLiteral(["\n    .ant-table-thead > tr > th, .ant-table-tbody > tr > td{\n        padding: 8px 12px;\n    }\n    .ant-table-thead > tr > th {\n       font-weight: bold;\n    }\n    .ant-table-column-sorters {\n        padding: 0;\n    }\n    .ant-table-column-sorter-up.active, .ant-table-column-sorter-down.active, .ant-table-filter-trigger.active {\n        color: #000;\n    }\n    .ant-btn > .anticon + span {\n        margin-left: 4px;\n    }\n"]);

  _templateObject4 = function _templateObject4() {
    return data;
  };

  return data;
}

function _templateObject3() {
  var data = _taggedTemplateLiteral(["\n    min-width: 100px;\n    .ant-dropdown-menu-item {\n        text-align: center;\n    }\n"]);

  _templateObject3 = function _templateObject3() {
    return data;
  };

  return data;
}

function _templateObject2() {
  var data = _taggedTemplateLiteral(["\n    .ant-btn {\n        margin: 0 5px 0 0;\n        padding: 0;\n    }\n    .ant-divider {\n        margin: 0 5px 0 0;\n    }\n"]);

  _templateObject2 = function _templateObject2() {
    return data;
  };

  return data;
}

function _templateObject() {
  var data = _taggedTemplateLiteral(["\n    &.changed {\n        color: blue;\n    }\n"]);

  _templateObject = function _templateObject() {
    return data;
  };

  return data;
}

function _taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

var ST = /*#__PURE__*/function (_React$Component) {
  _inherits(ST, _React$Component);

  var _super = _createSuper(ST);

  function ST() {
    var _this;

    _classCallCheck(this, ST);

    _this = _super.apply(this, arguments);
    _this.state = {
      model: new _model.TableModel(_this.props, function () {
        return _this.forceUpdate();
      }),
      prevProps: _this.props,
      update: function update() {
        return _this.forceUpdate();
      }
    };

    _this.renderEditable = function (col, _1, record, _2) {
      var tableModel = _this.state.model;
      var dataIndex = col.dataIndex;
      return /*#__PURE__*/_react.default.createElement(_editCell.EditCell, {
        col: col,
        record: record
      }, /*#__PURE__*/_react.default.createElement(EditSpan, {
        className: tableModel.isChanged(record, dataIndex) ? "changed" : ""
      }, col.render ? col.render(_1, record, _2) : _lodash.default.get(record, dataIndex), "\xA0", /*#__PURE__*/_react.default.createElement(ICON.EditOutlined, null)));
    };

    _this.renderButtonsOverlay = function (children, record) {
      var tableModel = _this.state.model;
      return /*#__PURE__*/_react.default.createElement(OverlayMenu, null, children.map(function (child, idx) {
        var _child$disabled$call, _child$disabled, _child$visible$call, _child$visible, _child$icon;

        var disabled = (_child$disabled$call = (_child$disabled = child.disabled) === null || _child$disabled === void 0 ? void 0 : _child$disabled.call(tableModel, record)) !== null && _child$disabled$call !== void 0 ? _child$disabled$call : false;
        var visible = (_child$visible$call = (_child$visible = child.visible) === null || _child$visible === void 0 ? void 0 : _child$visible.call(tableModel, record)) !== null && _child$visible$call !== void 0 ? _child$visible$call : true;

        if (!visible) {
          return null;
        }

        if (child.type === "divider") {
          return /*#__PURE__*/_react.default.createElement(_antd.Menu.Divider, {
            key: idx
          });
        }

        return /*#__PURE__*/_react.default.createElement(_antd.Menu.Item, {
          key: idx,
          disabled: disabled,
          icon: (_child$icon = child.icon) !== null && _child$icon !== void 0 ? _child$icon : /*#__PURE__*/_react.default.createElement(ICON.SettingOutlined, null),
          onClick: function onClick() {
            var _child$onClick;

            return (_child$onClick = child.onClick) === null || _child$onClick === void 0 ? void 0 : _child$onClick.call(tableModel, record);
          }
        }, child.text);
      }));
    };

    _this.renderOperation = function (col, record) {
      var _col$buttons;

      var tableModel = _this.state.model;
      var btns = (_col$buttons = col.buttons) === null || _col$buttons === void 0 ? void 0 : _col$buttons.map(function (button, idx) {
        var _button$disabled$call, _button$disabled, _button$visible$call, _button$visible, _button$icon;

        var disabled = (_button$disabled$call = (_button$disabled = button.disabled) === null || _button$disabled === void 0 ? void 0 : _button$disabled.call(tableModel, record)) !== null && _button$disabled$call !== void 0 ? _button$disabled$call : false;
        var visible = (_button$visible$call = (_button$visible = button.visible) === null || _button$visible === void 0 ? void 0 : _button$visible.call(tableModel, record)) !== null && _button$visible$call !== void 0 ? _button$visible$call : true;

        if (!visible) {
          return null;
        }

        if (button.type === "divider") {
          return /*#__PURE__*/_react.default.createElement(_antd.Divider, {
            key: idx,
            type: "vertical",
            orientation: "center"
          });
        }

        if (button.children) {
          return /*#__PURE__*/_react.default.createElement(_antd.Dropdown, {
            key: idx,
            overlay: _this.renderButtonsOverlay(button.children, record),
            disabled: disabled,
            placement: "bottomCenter"
          }, /*#__PURE__*/_react.default.createElement(_antd.Button, {
            type: "link"
          }, button.text, /*#__PURE__*/_react.default.createElement(ICON.DownOutlined, null)));
        }

        var btn = /*#__PURE__*/_react.default.createElement(_antd.Button, {
          key: idx,
          disabled: disabled,
          onClick: function onClick() {
            var _button$onClick;

            return (_button$onClick = button.onClick) === null || _button$onClick === void 0 ? void 0 : _button$onClick.call(tableModel, record);
          },
          icon: (_button$icon = button.icon) !== null && _button$icon !== void 0 ? _button$icon : /*#__PURE__*/_react.default.createElement(ICON.SettingOutlined, null),
          type: "link"
        }, button.text);

        if (button.tooltip) {
          return /*#__PURE__*/_react.default.createElement(_antd.Tooltip, {
            key: idx,
            placement: "bottom",
            title: button.tooltip
          }, btn);
        }

        return btn;
      });
      return /*#__PURE__*/_react.default.createElement(OperationWrap, null, btns);
    };

    return _this;
  }

  _createClass(ST, [{
    key: "render",
    value: function render() {
      var _this2 = this;

      var tableModel = this.state.model;
      var allColumns = tableModel.allColumns,
          displayColumns = tableModel.displayColumns,
          mergedData = tableModel.mergedData;
      var columns = allColumns.filter(function (e) {
        return displayColumns.includes(e.$$id);
      });
      var dealColumns = columns.map(function (col) {
        var nCol = _lodash.default.cloneDeep(col);

        if (col.editable && col.dataIndex) {
          Object.assign(nCol, {
            render: function render(_, record, index) {
              return _this2.renderEditable(col, _, record, index);
            }
          });
        }

        if (col.buttons) {
          Object.assign(nCol, {
            render: function render(_, record) {
              return _this2.renderOperation(col, record);
            }
          });
        }

        return nCol;
      });
      var rowSelectionMap = this.props.hideRowSelection === true ? {} : {
        rowSelection: _objectSpread(_objectSpread({
          selectedRowKeys: tableModel.selectedRows
        }, this.props.rowSelection), {}, {
          onChange: function onChange(selectedRowKeys, selectedRows) {
            var _this2$props$rowSelec, _this2$props, _this2$props$rowSelec2, _this2$props$rowSelec3;

            if (!((_this2$props$rowSelec = _this2.props.rowSelection) === null || _this2$props$rowSelec === void 0 ? void 0 : _this2$props$rowSelec.hasOwnProperty("selectedRowKeys"))) {
              tableModel.setSelectedRows(selectedRowKeys);
            }

            (_this2$props = _this2.props) === null || _this2$props === void 0 ? void 0 : (_this2$props$rowSelec2 = _this2$props.rowSelection) === null || _this2$props$rowSelec2 === void 0 ? void 0 : (_this2$props$rowSelec3 = _this2$props$rowSelec2.onChange) === null || _this2$props$rowSelec3 === void 0 ? void 0 : _this2$props$rowSelec3.call(tableModel, selectedRowKeys, selectedRows);
          }
        })
      };
      var paginationMap = this.props.hidePagination === true ? {
        pagination: false
      } : {
        pagination: _objectSpread(_objectSpread(_objectSpread({
          showLessItems: true,
          showQuickJumper: true,
          showSizeChanger: true,
          showTotal: function showTotal(total) {
            return /*#__PURE__*/_react.default.createElement("span", null, "\u5171", total, "\u6761");
          }
        }, tableModel.pageInfo), this.props.pagination), {}, {
          onChange: function onChange(current) {
            var _this2$props$paginati, _this2$props$paginati2, _this2$props$paginati3;

            if (!((_this2$props$paginati = _this2.props.pagination) === null || _this2$props$paginati === void 0 ? void 0 : _this2$props$paginati.hasOwnProperty("current"))) {
              tableModel.setPage(current);
            }

            (_this2$props$paginati2 = _this2.props.pagination) === null || _this2$props$paginati2 === void 0 ? void 0 : (_this2$props$paginati3 = _this2$props$paginati2.onChange) === null || _this2$props$paginati3 === void 0 ? void 0 : _this2$props$paginati3.call(tableModel, current);
          },
          onShowSizeChange: function onShowSizeChange(current, size) {
            var _this2$props$paginati4, _this2$props$paginati5, _this2$props$paginati6, _this2$props$paginati7;

            if (!((_this2$props$paginati4 = _this2.props.pagination) === null || _this2$props$paginati4 === void 0 ? void 0 : _this2$props$paginati4.hasOwnProperty("current"))) {
              tableModel.setPage(current);
            }

            if (!((_this2$props$paginati5 = _this2.props.pagination) === null || _this2$props$paginati5 === void 0 ? void 0 : _this2$props$paginati5.hasOwnProperty("pageSize"))) {
              tableModel.setPageSize(size);
            }

            (_this2$props$paginati6 = _this2.props.pagination) === null || _this2$props$paginati6 === void 0 ? void 0 : (_this2$props$paginati7 = _this2$props$paginati6.onShowSizeChange) === null || _this2$props$paginati7 === void 0 ? void 0 : _this2$props$paginati7.call(tableModel, current, size);
          }
        })
      };
      return /*#__PURE__*/_react.default.createElement(_tools.TableContext.Provider, {
        value: tableModel
      }, !this.props.hideStatusBar && /*#__PURE__*/_react.default.createElement(_status.StatusBar, this.props.statusBar), /*#__PURE__*/_react.default.createElement(StyleTable, _extends({}, this.props, {
        showSorterTooltip: false,
        dataSource: mergedData,
        rowKey: "$$id",
        columns: dealColumns
      }, paginationMap, rowSelectionMap)));
    }
  }, {
    key: "tableModel",
    get: function get() {
      return this.state.model;
    }
  }], [{
    key: "getDerivedStateFromProps",
    value: function getDerivedStateFromProps(nextProps, prevState) {
      var prevProps = prevState.prevProps;
      var nextState = {
        prevProps: nextProps
      };

      if (!_lodash.default.isEqual(prevProps.data, nextProps.data)) {
        nextState.model = new _model.TableModel(nextProps, prevState.update);
      }

      return nextState;
    }
  }]);

  return ST;
}(_react.default.Component);

exports.ST = ST;

var EditSpan = _styledComponents.default.span(_templateObject());

var OperationWrap = _styledComponents.default.span(_templateObject2());

var OverlayMenu = (0, _styledComponents.default)(_antd.Menu)(_templateObject3());
var StyleTable = (0, _styledComponents.default)(_antd.Table)(_templateObject4());