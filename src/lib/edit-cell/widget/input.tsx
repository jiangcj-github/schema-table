import React from "react";
import {Input} from "antd";
import {IWidgetProps} from "./registry";
import { InputProps } from "antd/lib/input";

export const InputWidget = (props: IWidgetProps<string, InputProps>) => {
    const {ui, record, dataIndex, tableModel, value} = props;
   
    const onChange = (e: any) => {
        const val = e.target.value;
        tableModel.edit(record, dataIndex, val);
        ui.onChange?.call(tableModel, record, val);
    }
    
    return (
        <Input 
            {...ui}
            className="cell-input"
            value={value}
            onChange={onChange}
            autoFocus={true}
            allowClear={ui.allowClear ?? true}
        />
    )
}