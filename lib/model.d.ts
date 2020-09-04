import { ISTProps, IColumn, IRecord } from "./tools";
export declare type IColumnMD = IColumn & {
    $$id: number;
};
export declare type IRecordMD = IRecord & {
    $$id: number;
    $$mode?: string;
    $$origin?: IRecordMD;
};
export declare class TableModel {
    private _data;
    private _changed;
    private _maxId;
    private _editId;
    private _allColumns;
    private _displayColumns;
    private _selectedRows;
    private _page;
    private _pageSize;
    private _total;
    constructor(props: ISTProps, update?: () => void);
    get displayColumns(): number[];
    get allColumns(): IColumnMD[];
    toggleDisplay(item: number): void;
    edit(record: IRecordMD, dataIndex: string, val: any): void;
    delete(record: IRecordMD): void;
    deleteSelection(): void;
    add(): void;
    copy(record: IRecordMD): void;
    get changedInfo(): {
        adds: IRecordMD[];
        modifies: IRecordMD[];
        dels: IRecordMD[];
    };
    get mergedData(): IRecordMD[];
    get changed(): IRecordMD[];
    resetEdit(): void;
    get editId(): number;
    isChanged(record: IRecordMD, dataIndex: string): boolean;
    get selectedRows(): number[];
    get selectedRecords(): IRecordMD[];
    setSelectedRows(rows: number[]): void;
    private _update;
    private _debounceUpdate;
    exportXlsx(name?: string): void;
    get pageInfo(): {
        current: number;
        pageSize: number;
        total: number;
    };
    setPage(page: number): void;
    setPageSize(pageSize: number): void;
    private _recalculatePage;
}
