import React from "react";
import {Checkbox} from "antd";
import {IWidgetProps} from "./registry";
import { CheckboxProps, CheckboxChangeEvent } from "antd/lib/checkbox";

export const CheckBoxWidget = (props: IWidgetProps<boolean, CheckboxProps>) => {
    const {ui, record, dataIndex, tableModel, value} = props;
    
    const onChange = (event: CheckboxChangeEvent) => {
        const val = event.target.checked;
        tableModel.edit(record, dataIndex, val);
        ui.onChange?.call(tableModel, record, val);
    }
    
    return (
        <Checkbox 
            {...ui}
            checked={value}
            onChange={onChange}
            autoFocus={true}
        />
    )
}