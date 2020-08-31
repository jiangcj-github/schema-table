import React from "react";
import {Select} from "antd";

export const SelectWidget = (props: any) => {

    const { ui } = props;

    const options = ui?.options ?? [];
    options.map((e: any, idx: number) => e.key = idx);

    return (
        <Select 
            options={options}
            className="cell-input"
            placeholder="请选择"
        />
    )

}