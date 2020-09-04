import React from "react";
import { IWidgetProps } from "./registry";
import { Moment } from "moment";
import { IColumnEdit } from "../tools";
export interface DatePickerUI extends IColumnEdit {
    toVal: (moment: Moment) => DatePickerVAL;
    formVal: (val: DatePickerVAL) => Moment;
}
export declare type DatePickerVAL = number | string;
export declare const DatePickerWidget: (props: IWidgetProps<React.ReactText, DatePickerUI>) => JSX.Element;
