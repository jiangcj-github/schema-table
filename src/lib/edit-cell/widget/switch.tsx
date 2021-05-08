import React from "react";
import {Switch} from "antd";
import {IWidgetProps} from "./registry";
import { SwitchProps } from "antd/lib/switch";

export const SwitchWidget = (props: IWidgetProps<boolean, SwitchProps>) => {
    const {ui, record, dataIndex, tableModel, value} = props;
    
    const onChange = (val: boolean) => {
        tableModel.edit(record, dataIndex, val);
        ui.onChange?.call(tableModel, record, val);
    }
    return (
        <Switch 
            {...ui}
            checked={value}
            onChange={onChange}
            autoFocus={true}
        />
    )
}