import _ from "lodash";
import {ISTProps, IColumn, IRecord} from "./tools";
import exportXlxs from "./export";

export type IColumnMD = IColumn & {
    $$id: number
};

export type IRecordMD = IRecord & {
    $$id: number;
    $$mode?: string;
    $$origin?: IRecordMD;
}

export class TableModel {

    private _data: IRecordMD[] = [];
    private _changed: IRecordMD[] = [];
    private _maxId = 0;
    private _editId = 0;

    private _allColumns: IColumnMD[] = [];
    private _displayColumns: number[] = [];

    private _selectedRows: number[] = [];

    constructor(props: ISTProps, update?: () => void) {
        const { data, columns, statusBar } = props;
        const includeColumns = statusBar?.includeColumns;
        const excludeColumns = statusBar?.excludeColumns;

        data?.forEach((e, idx) => {
            e.$$id = idx;
        })
        columns?.forEach((e, idx) => {
            (e as IColumnMD).$$id = idx;
        });

        this._allColumns = columns || [] as any;
        if(includeColumns) {
            this._displayColumns = this._allColumns
                .filter(e => includeColumns?.includes(e.title as string))
                .map(e => e.$$id);
        } 
        else if(excludeColumns) {
            this._displayColumns = this._allColumns
                .filter(e => !excludeColumns?.includes(e.title as string))
                .map(e => e.$$id);
        }
        else {
            this._displayColumns = this._allColumns
                .map(e => e.$$id);
        }
        this._data = data || [] as any;
        this._maxId = this._data.length;
        if(update) {
            this._update = update;
            this._debounceUpdate = _.debounce(update, 1000 / 30);
        }
    }

    get displayColumns() {
        return this._displayColumns;
    }

    get allColumns() {
        return this._allColumns;
    }

    public setDisplayColumns(cols: number[]) {
        this._displayColumns = cols;
        this._update();
    }

    public toggleDisplay(item: number) {
        const idx = this._displayColumns.findIndex(e => e === item);
        idx < 0 ?
            this._displayColumns.push(item): 
            this._displayColumns.splice(idx, 1);
        this._update();
    }

    public edit(record: IRecordMD, dataIndex: string, val: any) {
        if(record.$$mode === "modify") {
            _.set(record, dataIndex, val);
            _.isMatch(record, record.$$origin as IRecordMD) && _.pull(this._changed, record);
        }
        else if(record.$$mode) {
            _.set(record, dataIndex, val);
        }
        else {
            const nRec = Object.assign(_.cloneDeep(record), {
                $$mode: "modify",
                $$origin: record,
            });
            _.set(nRec, dataIndex, val);
            this._changed.push(nRec);
        }
        this._debounceUpdate();
    }

    public delete(record: IRecordMD) {
        if(record.$$mode === "add") {
            _.pull(this._changed, record);
        }
        else if(record.$$mode) {
            record.$$mode = "delete";
        }
        else {
            const nRec = _.cloneDeep(record);
            nRec.$$mode = "delete";
            this._changed.push(nRec);
        }
        this._selectedRows.includes(record.$$id) && _.pull(this._selectedRows, record.$$id);
        this._debounceUpdate();
    }

    public deleteSelection() {
        const data = this.mergedData;
        const selected = this.selectedRows;
        selected.forEach(id => {
            const record = data.find(e => e.$$id === id);
            record && this.delete(record);
        });
    }

    public add() {
        const nRec = {
            $$id: this._maxId + 1,
            $$mode: "add"
        };
        this._changed.push(nRec);
        this._maxId ++;
        this._update();
    }

    public copy(record: IRecordMD) {
        const nRec = Object.assign(_.cloneDeep(record), {
            $$id: this._maxId + 1,
            $$mode: "add",
            $$origin: undefined,
        });
        this._changed.push(nRec);
        this._maxId ++;
        this._update();
    }

    public get changedInfo() {
        const adds = this._changed.filter(e => e.$$mode === "add");
        const modifies = this._changed.filter(e => e.$$mode === "modify");
        const dels = this._changed.filter(e => e.$$mode === "delete");
        return {adds, modifies, dels};
    }

    get mergedData() {
        const { adds, modifies, dels } = this.changedInfo;
        return _(adds)
            .concat(this._data)
            .differenceBy(dels, "$$id")
            .map(e => modifies.find(ee => ee.$$id === e.$$id) || e)
            .value();
    }

    get changed() {
        return this._changed;
    }

    public resetEdit() {
        this._changed = [];
        this._editId = Math.random();
        this._update();
    }

    public get editId() {
        return this._editId;
    }

    public isChanged(record: IRecordMD, dataIndex: string) {
        if(record.$$mode === "modify") {
            return _.get(record, dataIndex) !== _.get(record.$$origin, dataIndex);
        }
        else if(record.$$mode) {
            return true;
        }
        return false;
    }

    get selectedRows() {
        return [...this._selectedRows];
    }

    get selectedRecords() {
        const selected = this.selectedRows;
        const data = this.mergedData;
        return data.filter(e => selected.includes(e.$$id));
    }

    public setSelectedRows(rows: number[]) {
        this._selectedRows = rows || [];
        this._update();
    }

    private _update() {}
    private _debounceUpdate() {}

    public exportXlsx(name?: string) {
        const columns = this.allColumns.filter(e => e.dataIndex);
        const data = this.mergedData;
        const initColumn = columns.map(e => ({
            title: e.title,
            dataIndex: e.dataIndex,
            key: e.dataIndex,
        }));
        const attendanceInfoList = data.map(e => {
            return initColumn.reduce((iv, ee: any) => {
                return Object.assign(iv, {
                    [ee.dataIndex]: _.get(e, ee.dataIndex),
                });
            }, {})
        });
        exportXlxs(initColumn, attendanceInfoList, name)
    }

}