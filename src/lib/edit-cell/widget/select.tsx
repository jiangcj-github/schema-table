import React from "react";
import {Select} from "antd";
import {IWidgetProps} from "./registry";
import { match } from "pinyin-match";
import { SelectProps } from "antd/lib/select";

interface IOption {
    label: string;
    value: string;
    key?: number;
}

export const SelectWidget = (props: IWidgetProps<any, SelectProps<any>>) => {
    const {ui, record, dataIndex, tableModel, value} = props;
    
    const onChange = (val: any) => {
        tableModel.edit(record, dataIndex, val);
        ui.onChange?.call(tableModel, record, val);
    }

    const filterOption = (input: string, option: IOption) => {
        const filterOption = ui.filterOption ?? true;
        return filterOption ? !!match(option.label, input): true;
    }

    const options = ui?.options ?? [];
    options.forEach((e: any, idx: number) => {
        e.key = idx;
    });

    return (
        <Select 
            {...ui}
            value={value}
            onChange={onChange}
            options={options}
            className="cell-input"
            autoFocus={true}
            showSearch={true}
            allowClear={ui.allowClear ?? true}
            filterOption={filterOption as any}
        />
    )

}