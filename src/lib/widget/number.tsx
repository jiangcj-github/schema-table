import React from "react";
import {InputNumber} from "antd";
import {IWidgetProps} from "./registry";

export const NumberWidget = (props: IWidgetProps) => {

    const {ui, record, dataIndex, tableModel, value} = props;
   
    const onChange = (val?: number | string) => {
        tableModel.edit(record, dataIndex, val);
    }

    return (
        <InputNumber 
            className="cell-input"
            placeholder={ui.placeholder}
            value={value}
            onChange={onChange}
            autoFocus={true}
        />
    )
    
}