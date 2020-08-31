import React from "react";

export class TableModel {

    private _page = 1;
    private _pageSize = 2;
    private _total = 9;
    private _data = [
        {idx: 1, name: "小王", age: 18, birth: "2020-09-08"},
        {idx: 2, name: "小红", age: 18, birth: "2020-09-09"},
        {idx: 3, name: "小明", age: 18, birth: "2020-09-18"},
        {idx: 4, name: "小明", age: 18, birth: "2020-09-18"},
        {idx: 5, name: "小明", age: 18, birth: "2020-09-18"},
        {idx: 6, name: "小明", age: 18, birth: "2020-09-18"},
        {idx: 7, name: "小明", age: 18, birth: "2020-09-18"},
        {idx: 8, name: "小明", age: 18, birth: "2020-09-18"},
        {idx: 9, name: "小明", age: 18, birth: "2020-09-18"},
    ];

    private _allColumns = [
        {
            idx: 1, 
            title: "姓名", 
            dataIndex: "name",
            width: "200px",
            editable: {
                widget: "select",
                options: [
                    {label: "小明", value: "小明"},
                    {label: "小明", value: "小红"},
                    {label: "小明", value: "小红"},
                ]
            },
        },
        {
            idx: 2, 
            title: "年龄", 
            dataIndex: "age",
            width: "200px",
            editable: {
                widget: "input",
            }
        },
        {
            idx: 3, 
            title: "出生日期", 
            dataIndex: "birth"
        },
    ];
    private _displayColumns: number[] = [1, 2, 3];

    constructor(props: any, update: any) {
        update && (this._update = update);
    }

    get displayColumns() {
        return this._displayColumns;
    }

    public setDisplayColumns(columns: any) {
        this._displayColumns = columns;
        this._update();
    }

    public toggleDisplay(item: number) {
        const idx = this._displayColumns.findIndex(e => e === item);
        idx < 0 ?
            this._displayColumns.push(item): 
            this._displayColumns.splice(idx, 1);
        this._update();
    }

    get allColumns() {
        return this._allColumns;
    }

    get data() {
        return this._data;
    }

    private setPage() {

    }

    public setPageSize() {
    
    }

    private _update() {}

}

export function useTable(props: any) {
    const [, update] = React.useState()
   

    const tableModel = React.useMemo(() => {
        return new TableModel(props, () => update(Math.random()))
    }, []);


    return tableModel;
}