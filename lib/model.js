"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TableModel = void 0;

var _lodash = _interopRequireDefault(require("lodash"));

var _xlsx = require("./xlsx");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var TableModel = /*#__PURE__*/function () {
  function TableModel(props, update) {
    var _data$length, _pagination$defaultPa, _pagination$defaultCu;

    _classCallCheck(this, TableModel);

    this._data = [];
    this._changed = [];
    this._maxId = 0;
    this._editId = 0;
    this._allColumns = [];
    this._displayColumns = [];
    this._selectedRows = [];
    this._page = 1;
    this._pageSize = 10;
    this._total = 0;
    var data = props.data,
        columns = props.columns,
        statusBar = props.statusBar,
        pagination = props.pagination;
    var includeColumns = statusBar === null || statusBar === void 0 ? void 0 : statusBar.includeColumns;
    var excludeColumns = statusBar === null || statusBar === void 0 ? void 0 : statusBar.excludeColumns;
    data === null || data === void 0 ? void 0 : data.forEach(function (e, idx) {
      e.$$id = idx;
    });
    columns === null || columns === void 0 ? void 0 : columns.forEach(function (e, idx) {
      e.$$id = idx;
    });
    this._allColumns = columns || [];

    if (includeColumns) {
      this._displayColumns = this._allColumns.filter(function (e) {
        return includeColumns === null || includeColumns === void 0 ? void 0 : includeColumns.includes(e.title);
      }).map(function (e) {
        return e.$$id;
      });
    } else if (excludeColumns) {
      this._displayColumns = this._allColumns.filter(function (e) {
        return !(excludeColumns === null || excludeColumns === void 0 ? void 0 : excludeColumns.includes(e.title));
      }).map(function (e) {
        return e.$$id;
      });
    } else {
      this._displayColumns = this._allColumns.map(function (e) {
        return e.$$id;
      });
    }

    this._data = data || [];
    this._maxId = this._data.length;

    if (update) {
      this._update = update;
      this._debounceUpdate = _lodash.default.debounce(update, 1000 / 30);
    }

    this._total = (_data$length = data === null || data === void 0 ? void 0 : data.length) !== null && _data$length !== void 0 ? _data$length : 0;
    this._pageSize = (_pagination$defaultPa = pagination === null || pagination === void 0 ? void 0 : pagination.defaultPageSize) !== null && _pagination$defaultPa !== void 0 ? _pagination$defaultPa : 10;
    this._page = (_pagination$defaultCu = pagination === null || pagination === void 0 ? void 0 : pagination.defaultCurrent) !== null && _pagination$defaultCu !== void 0 ? _pagination$defaultCu : 1;
  }

  _createClass(TableModel, [{
    key: "toggleDisplay",
    value: function toggleDisplay(item) {
      var idx = this._displayColumns.findIndex(function (e) {
        return e === item;
      });

      idx < 0 ? this._displayColumns.push(item) : this._displayColumns.splice(idx, 1);

      this._update();
    }
  }, {
    key: "edit",
    value: function edit(record, dataIndex, val) {
      if (record.$$mode === "modify") {
        _lodash.default.set(record, dataIndex, val);

        _lodash.default.isMatch(record, record.$$origin) && _lodash.default.pull(this._changed, record);
      } else if (record.$$mode) {
        _lodash.default.set(record, dataIndex, val);
      } else {
        var nRec = Object.assign(_lodash.default.cloneDeep(record), {
          $$mode: "modify",
          $$origin: record
        });

        _lodash.default.set(nRec, dataIndex, val);

        this._changed.push(nRec);
      }

      this._debounceUpdate();
    }
  }, {
    key: "delete",
    value: function _delete(record) {
      if (record.$$mode === "add") {
        _lodash.default.pull(this._changed, record);
      } else if (record.$$mode) {
        record.$$mode = "delete";
      } else {
        var nRec = _lodash.default.cloneDeep(record);

        nRec.$$mode = "delete";

        this._changed.push(nRec);
      }

      this._selectedRows.includes(record.$$id) && _lodash.default.pull(this._selectedRows, record.$$id);
      this._total--;

      this._recalculatePage();

      this._debounceUpdate();
    }
  }, {
    key: "deleteSelection",
    value: function deleteSelection() {
      var _this = this;

      var data = this.mergedData;
      var selected = this.selectedRows;
      selected.forEach(function (id) {
        var record = data.find(function (e) {
          return e.$$id === id;
        });
        record && _this.delete(record);
      });
    }
  }, {
    key: "add",
    value: function add() {
      var nRec = {
        $$id: this._maxId + 1,
        $$mode: "add"
      };

      this._changed.unshift(nRec);

      this._maxId++;
      this._total++;
      this._page = 1;

      this._update();
    }
  }, {
    key: "copy",
    value: function copy(record) {
      var nRec = Object.assign(_lodash.default.cloneDeep(record), {
        $$id: this._maxId + 1,
        $$mode: "add",
        $$origin: undefined
      });

      this._changed.unshift(nRec);

      this._maxId++;
      this._total++;
      this._page = 1;

      this._update();
    }
  }, {
    key: "resetEdit",
    value: function resetEdit() {
      this._changed = [];
      this._editId = Math.random();
      this._page = 1;
      this._total = this._data.length;

      this._update();
    }
  }, {
    key: "isChanged",
    value: function isChanged(record, dataIndex) {
      if (record.$$mode === "modify") {
        return _lodash.default.get(record, dataIndex) !== _lodash.default.get(record.$$origin, dataIndex);
      } else if (record.$$mode) {
        return true;
      }

      return false;
    }
  }, {
    key: "setSelectedRows",
    value: function setSelectedRows(rows) {
      this._selectedRows = rows || [];

      this._update();
    }
  }, {
    key: "_update",
    value: function _update() {}
  }, {
    key: "_debounceUpdate",
    value: function _debounceUpdate() {}
  }, {
    key: "exportXlsx",
    value: function exportXlsx(name) {
      var columns = this.allColumns.filter(function (e) {
        return e.dataIndex;
      });
      var data = this.mergedData;
      var initColumn = columns.map(function (e) {
        return {
          title: e.title,
          dataIndex: e.dataIndex,
          key: e.dataIndex
        };
      });
      var attendanceInfoList = data.map(function (e) {
        return initColumn.reduce(function (iv, ee) {
          return Object.assign(iv, _defineProperty({}, ee.dataIndex, _lodash.default.get(e, ee.dataIndex)));
        }, {});
      });
      (0, _xlsx.exportExcel)(initColumn, attendanceInfoList, name);
    }
  }, {
    key: "setPage",
    value: function setPage(page) {
      if (page > 0) {
        this._page = page;
      } else if (page < 0) {
        var maxPage = Math.ceil(this._total / this._pageSize);
        this._page = maxPage + page + 1;
      }

      this._update();
    }
  }, {
    key: "setPageSize",
    value: function setPageSize(pageSize) {
      if (pageSize > 0) {
        this._pageSize = pageSize;
      }

      this._update();
    }
  }, {
    key: "_recalculatePage",
    value: function _recalculatePage() {
      this._total <= (this._page - 1) * this._pageSize && this._page--;
      this._page <= 1 && (this._page = 1);
    }
  }, {
    key: "displayColumns",
    get: function get() {
      return this._displayColumns;
    }
  }, {
    key: "allColumns",
    get: function get() {
      return this._allColumns;
    }
  }, {
    key: "changedInfo",
    get: function get() {
      var adds = this._changed.filter(function (e) {
        return e.$$mode === "add";
      });

      var modifies = this._changed.filter(function (e) {
        return e.$$mode === "modify";
      });

      var dels = this._changed.filter(function (e) {
        return e.$$mode === "delete";
      });

      return {
        adds: adds,
        modifies: modifies,
        dels: dels
      };
    }
  }, {
    key: "mergedData",
    get: function get() {
      var _this$changedInfo = this.changedInfo,
          adds = _this$changedInfo.adds,
          modifies = _this$changedInfo.modifies,
          dels = _this$changedInfo.dels;
      return (0, _lodash.default)(adds).concat(this._data).differenceBy(dels, "$$id").map(function (e) {
        return modifies.find(function (ee) {
          return ee.$$id === e.$$id;
        }) || e;
      }).value();
    }
  }, {
    key: "changed",
    get: function get() {
      return this._changed;
    }
  }, {
    key: "editId",
    get: function get() {
      return this._editId;
    }
  }, {
    key: "selectedRows",
    get: function get() {
      return _toConsumableArray(this._selectedRows);
    }
  }, {
    key: "selectedRecords",
    get: function get() {
      var selected = this.selectedRows;
      var data = this.mergedData;
      return data.filter(function (e) {
        return selected.includes(e.$$id);
      });
    }
  }, {
    key: "pageInfo",
    get: function get() {
      return {
        current: this._page,
        pageSize: this._pageSize,
        total: this._total
      };
    }
  }]);

  return TableModel;
}();

exports.TableModel = TableModel;