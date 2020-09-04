/// <reference types="react" />
import { IRecordMD, TableModel } from '../model';
import { IColumnEdit } from '../tools';
export interface IWidgetProps<V, T extends IColumnEdit = IColumnEdit> {
    ui: T;
    dataIndex: string;
    value: V;
    record: IRecordMD;
    tableModel: TableModel;
}
declare type IWidget = React.ComponentType<any>;
declare class WidgetRegistry {
    private _map;
    private _default;
    registry(name: string, widget: IWidget): void;
    setDefault(widget: IWidget): void;
    get(name: string): import("react").ComponentType<any>;
}
export declare const widgetRegistry: WidgetRegistry;
export {};
