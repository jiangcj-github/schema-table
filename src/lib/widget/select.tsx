import React from "react";
import {Select} from "antd";
import {IWidgetProps} from "./registry";
import { match } from "pinyin-match";

interface IOption {
    label: string;
    value: string;
    key?: number;
}

export const SelectWidget = (props: IWidgetProps<any>) => {
    const {ui, record, dataIndex, tableModel, value} = props;
    
    const onChange = (val: any) => {
        tableModel.edit(record, dataIndex, val);
    }

    const filterOption = (input: string, option: IOption) => {
        const filterOption = ui.filterOption ?? true;
        return filterOption ? !!match(option.label, input): true;
    }

    const options = ui?.options ?? [];
    options.forEach((e: IOption, idx: number) => {
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