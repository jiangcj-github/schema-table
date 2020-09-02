import React, {ChangeEvent} from "react";
import {Input} from "antd";
import {IWidgetProps} from "./registry";

export const InputWidget = (props: IWidgetProps) => {

    const {ui, record, dataIndex, tableModel, value} = props;
   
    const onChange = (e: ChangeEvent) => {
        const value = (e.target as any).value;
        tableModel.edit(record, dataIndex, value);
    }

    return (
        <Input 
            className="cell-input"
            placeholder={ui.placeholder}
            value={value}
            onChange={onChange}
            autoFocus={true}
        />
    )
}