import { InputWidget } from './input';
import { SelectWidget } from './select';


class WidgetRegistry {

    private _map: any = [];
    private _default: any;

    public registry(name: string, widget: any) {
        this._map[name] = widget;
    }

    public setDefault(widget: any) {
        this._default = widget;
    }

    public get(name: string) {
        return this._map[name] || this._default;
    }

}

export const widgetRegistry = new WidgetRegistry();

widgetRegistry.registry("input", InputWidget);
widgetRegistry.registry("select", SelectWidget);
widgetRegistry.setDefault(InputWidget);