import _ from "lodash";
import {ISTProps, IColumn, IRecord} from "./tools";

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

    constructor(props: ISTProps, update?: () => void) {
        const { data, columns } = props;
        data?.forEach((e, idx) => {
            e.$$id = idx;
        })
        columns?.forEach((e, idx) => {
            (e as IColumnMD).$$id = idx;
        });

        this._allColumns = columns || [] as any;
        this._displayColumns = this._allColumns.map(e => e.$$id);
        this._data = data || [] as any;
        this._maxId = this._data.length;
        update && (this._update = _.debounce(update, 1000 / 30));
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
        this._update();
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
        this._update();
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

    private _update() {}

}