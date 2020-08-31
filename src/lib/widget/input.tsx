import React from "react";
import {Input} from "antd";

export const InputWidget = (props: any) => {

    return (
        <Input 
            className="cell-input"
            placeholder="请输入"
            autoFocus={true}
        />
    )
    
}