import React from "react";
import {Switch} from "antd";
import {IWidgetProps} from "./registry";

export const SwitchWidget = (props: IWidgetProps<boolean>) => {
    const {ui, record, dataIndex, tableModel, value} = props;
    
    const onChange = (val: boolean) => {
        tableModel.edit(record, dataIndex, val);
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