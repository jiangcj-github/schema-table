import React from "react";
import {ColumnGroupType, ColumnType} from "antd/lib/table";
import {TableModel, IRecordMD} from "./model";
import {TableRowSelection} from "antd/lib/table/interface";

export interface IColumnOp {
    text?: string;
    icon?: string;
    type?: "divider";
    tooltip?: string;
    disabled?: (record: IRecordMD) => boolean;
    visible?: (record: IRecordMD) => boolean;
    onClick?: (record: IRecordMD) => void;
    children?: IColumnOp[];
    [key: string]: any;
}

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

export interface IStatusBar {
    onSave?: (records: IRecord) => void | false;
    onAdd?: () => void | false;
    onCancel?: (changedRecords: IRecord[]) => void | false;
    onDelete?: (selectedRecords: IRecord[]) => void | false;
    onExport?: (records: IRecord[]) => void | false;
    includeColumns?: string[];
    excludeColumns?: string[];
    hideAdjustColumns?: boolean;
}

export type STSelection =  Omit<TableRowSelection<any>, "selectedRowKeys">;

export interface ISTProps {
    data?: IRecord[];
    columns?: IColumn[];
    statusBar?: IStatusBar;
    rowSelection?: STSelection;
    hideRowSelection?: boolean;
    hideStatusBar?: boolean;
    [key: string]: any;
}

export const TableContext = React.createContext(new TableModel({}));