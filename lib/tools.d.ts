import React, { ReactNode } from "react";
import { ColumnGroupType, ColumnType } from "antd/lib/table";
import { TableModel, IRecordMD } from "./model";
import { TableRowSelection, TablePaginationConfig } from "antd/lib/table/interface";
export interface IColumnOp {
    text?: string;
    icon?: ReactNode;
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
export declare type IColumn = (ColumnGroupType<any> | ColumnType<any>) & {
    dataIndex?: string;
    editable?: IColumnEdit | ((record: IRecordMD) => IColumnEdit);
    buttons?: IColumnOp[];
};
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
    buttons?: {
        text?: string;
        icon?: ReactNode;
        onClick?: () => void;
    }[];
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
export declare const TableContext: React.Context<TableModel>;
