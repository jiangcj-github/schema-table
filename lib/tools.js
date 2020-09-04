"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TableContext = void 0;

var _react = _interopRequireDefault(require("react"));

var _model = require("./model");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var TableContext = /*#__PURE__*/_react.default.createContext(new _model.TableModel({}));

exports.TableContext = TableContext;