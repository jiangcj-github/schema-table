import React from "react";
import {Input} from "antd";
import {IWidgetProps} from "./registry";

export const InputWidget = (props: IWidgetProps<string>) => {
    const {ui, record, dataIndex, tableModel, value} = props;
   
    const onChange = (e: any) => {
        const value = e.target.value;
        tableModel.edit(record, dataIndex, value);
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