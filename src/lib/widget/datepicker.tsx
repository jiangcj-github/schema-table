import React from "react";
import {DatePicker} from "antd";
import {IWidgetProps} from "./registry";
import moment, {Moment} from "moment";
import {IColumnEdit} from "../tools";

export interface DatePickerUI extends IColumnEdit {
    toVal: (moment: Moment) => DatePickerVAL;
    formVal: (val: DatePickerVAL) => Moment;
}
export type DatePickerVAL = number | string;

export const DatePickerWidget = (props: IWidgetProps<DatePickerVAL, DatePickerUI>) => {
    const {ui, record, dataIndex, tableModel, value} = props;
    ui.toVal = ui.toVal || ((moment: Moment) => moment.valueOf());
    ui.formVal = ui.formVal || ((val: DatePickerVAL) => moment(val));
    
    const onChange = (moment: Moment | null) => {
        const value = moment ? ui.toVal(moment) : undefined;
        tableModel.edit(record, dataIndex, value);
    }
    const _value = value ? ui.formVal(value) : null;

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