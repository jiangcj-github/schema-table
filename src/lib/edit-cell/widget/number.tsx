import React from "react";
import {InputNumber} from "antd";
import {IWidgetProps} from "./registry";
import { InputNumberProps } from "antd/lib/input-number";

export const NumberWidget = (props: IWidgetProps<number, InputNumberProps>) => {
    const {ui, record, dataIndex, tableModel, value} = props;
    
    const onChange = (val?: number | string) => {
        tableModel.edit(record, dataIndex, val);
        ui.onChange?.call(tableModel, record, val);
    }
    return (
        <InputNumber 
            {...ui}
            className="cell-input"
            value={value}
            onChange={onChange}
            autoFocus={true}
        />
    )
}