import React from "react";
import {Button, Divider} from "antd";
import {TableContext} from "../tools";
import { ExportOutlined } from "@ant-design/icons";

export const Export = () => {
    const tableModel = React.useContext(TableContext);
   
    const onExport = () => {
        tableModel.exportXlsx("导出");
    }
    
    return (
        <>
            <Divider type="vertical" orientation="center"/>
            <Button 
                type="link" 
                onClick={onExport}
                className="op-btn"
                icon={<ExportOutlined />}>导出</Button>
        </>
    )
}