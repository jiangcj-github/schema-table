import React, {ReactNode} from "react";
import {ColumnGroupType, ColumnType} from "antd/lib/table";
import {TableModel, IRecordMD} from "./model";
import {TableRowSelection, TablePaginationConfig} from "antd/lib/table/interface";

export interface IColumnButton {
    text?: string;
    icon?: ReactNode;
    tooltip?: string;
    disabled?: (record: IRecordMD) => boolean;
    visible?: (record: IRecordMD) => boolean;
    onClick?: (record: IRecordMD) => void;
    children?: IColumnMenuButton[];
}

export interface IColumnMenuButton extends IColumnButton {
    type?: "divider";
}

export interface IColumnEditOpt {
    widget: string;
    onSave?: (record: IRecordMD, value: any) => void;
    onChange?: (record: IRecordMD, value: any) => void;
    [key: string]: any;
}
export type IColumnEdit = false | IColumnEditOpt | ((record: IRecordMD) => IColumnEditOpt | false);

export type IColumn = (ColumnGroupType<any> | ColumnType<any>) & {
    dataIndex?: string;
    editable?: IColumnEdit;
    buttons?: IColumnButton[];
}

export interface IRecord {
    [key: string]: any;
}

export interface IStatusButton {
    text?: string;
    icon?: ReactNode;
    tooltip?: string;
    disabled?: (selectedRecords: IRecordMD[]) => boolean;
    visible?: (selectedRecords: IRecordMD[]) => boolean;
    onClick?: (selectedRecords: IRecordMD[]) => void;
    children?: IStatusMenuButton[];
}

export interface IStatusMenuButton extends IStatusButton {
    type?: "divider";
}

export interface IStatusBar {
    defaultDisplayColumns?: string[];
    hideDisplayColumns?: boolean;
    hideExport?: boolean;
    buttons?: IStatusButton[];
}

export interface ISTProps {
    data?: IRecord[];
    columns?: IColumn[];
    statusBar?: IStatusBar;
    rowSelection?: TableRowSelection<any>;
    hideRowSelection?: boolean;
    hideStatusBar?: boolean;
    hidePagination?: boolean;
    pagination?: TablePaginationConfig;
    [key: string]: any;
}

export const TableContext = React.createContext(new TableModel({}));