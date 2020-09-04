"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.exportExcel = exportExcel;

var _xlsx = _interopRequireDefault(require("xlsx"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function exportExcel(headers, data) {
  var fileName = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : "file";

  var _headers = headers.map(function (item, i) {
    return Object.assign({}, {
      key: item.key,
      title: item.title,
      position: String.fromCharCode(65 + i) + 1
    });
  }).reduce(function (prev, next) {
    return Object.assign({}, prev, _defineProperty({}, next.position, {
      key: next.key,
      v: next.title
    }));
  }, {});

  var _data = data.map(function (item, i) {
    return headers.map(function (key, j) {
      return Object.assign({}, {
        content: item[key.key],
        position: String.fromCharCode(65 + j) + (i + 2)
      });
    });
  }) // 对刚才的结果进行降维处理（二维数组变成一维数组）
  .reduce(function (prev, next) {
    return prev.concat(next);
  }) // 转换成 worksheet 需要的结构
  .reduce(function (prev, next) {
    return Object.assign({}, prev, _defineProperty({}, next.position, {
      v: next.content
    }));
  }, {}); // 合并 headers 和 data


  var output = Object.assign({}, _headers, _data); // 获取所有单元格的位置

  var outputPos = Object.keys(output); // 计算出范围 ,["A1",..., "H2"]

  var ref = "".concat(outputPos[0], ":").concat(outputPos[outputPos.length - 1]); // 构建 workbook 对象

  var wb = {
    SheetNames: ['mySheet'],
    Sheets: {
      mySheet: Object.assign({}, output, {
        '!ref': ref,
        '!cols': [{
          wpx: 45
        }, {
          wpx: 100
        }, {
          wpx: 200
        }, {
          wpx: 80
        }, {
          wpx: 150
        }, {
          wpx: 100
        }, {
          wpx: 300
        }, {
          wpx: 300
        }]
      })
    }
  }; // 导出 Excel

  _xlsx.default.writeFile(wb, fileName + ".xlsx");
}