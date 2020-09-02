import React from "react";
import {Select} from "antd";
import {IWidgetProps} from "./registry";

export const SelectWidget = (props: IWidgetProps) => {

    const {ui, record, dataIndex, tableModel, value} = props;
    
    const onChange = (val: any) => {
        tableModel.edit(record, dataIndex, val);
    }

    const options = ui?.options ?? [];
    options.forEach((e: any, idx: number) => {
        e.key = idx;
    });

    return (
        <Select 
            value={value}
            onChange={onChange}
            options={options}
            className="cell-input"
            placeholder={ui.placeholder}
        />
    )

}