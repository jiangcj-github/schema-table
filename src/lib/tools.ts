import React from "react";
import {ColumnGroupType, ColumnType} from "antd/lib/table";
import {TableModel, IRecordMD} from "./model";

export interface IColumnBtn {
    text: string;
    onClick?: (record: IRecordMD) => void;
    children?: IColumnOp[];
    [key: string]: any;
}

export type IColumnOp = IColumnBtn | string;

export interface IColumnEdit {
    widget: string;
    [key: string]: any;
}

export type IColumn = (ColumnGroupType<any> | ColumnType<any>) & {
    dataIndex?: string;
    editable?: IColumnEdit;
    buttons?: IColumnOp[];
}

export interface IRecord {
    [key: string]: any;
}

export interface ISTProps {
    data?: IRecord[];
    columns?: IColumn[];
    [key: string]: any;
}

export const TableContext = React.createContext(new TableModel({}));