import React from "react";
import {DatePicker} from "antd";
import {IWidgetProps} from "./registry";
import moment, {Moment} from "moment";
import { DatePickerProps } from "antd/lib/date-picker";

export const DatePickerWidget = (props: IWidgetProps<any, DatePickerProps>) => {
    const {ui, record, dataIndex, tableModel, value} = props;
    const _value: any = value instanceof moment ? value : moment(value);
   
    const onChange = (val: Moment | null) => {
        const format = ui.format ?? "YYYY-MM-DD";
        tableModel.edit(record, dataIndex, val?.format(format.toString()));
        ui.onChange?.call(tableModel, record, val);
    }
   
    return (
        <DatePicker 
            {...ui}
            value={_value}
            onChange={onChange}
            autoFocus={true}
            allowClear={ui.allowClear ?? true}
        />
    )
}