import {IRecordMD, TableModel} from '../model';
import {IColumnEdit} from '../tools';

import { InputWidget } from './input';
import { SelectWidget } from './select';
import { NumberWidget } from './number';
import { SwitchWidget } from './switch';
import { DatePickerWidget } from './datepicker';

export interface IWidgetProps<V, T extends IColumnEdit = IColumnEdit> {
    ui: T;
    dataIndex: string;
    value: V;
    record: IRecordMD;
    tableModel: TableModel;
}

type IWidget = React.ComponentType<any>; 

interface WidgetMap {
    [key: string]: IWidget;
}

class WidgetRegistry {
    private _map: WidgetMap = [] as any;
    private _default!: IWidget;

    public registry(name: string, widget: IWidget) {
        this._map[name] = widget;
    }

    public setDefault(widget: IWidget) {
        this._default = widget;
    }

    public get(name: string) {
        return this._map[name] || this._default;
    }
}

export const widgetRegistry = new WidgetRegistry();

widgetRegistry.registry("input", InputWidget);
widgetRegistry.registry("select", SelectWidget);
widgetRegistry.registry("number", NumberWidget);
widgetRegistry.registry("switch", SwitchWidget);
widgetRegistry.registry("datepicker", DatePickerWidget);
widgetRegistry.setDefault(InputWidget);