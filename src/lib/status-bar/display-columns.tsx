import React from "react";
import {Checkbox, Dropdown, Button, Menu} from "antd";
import {TableContext} from "../tools";
import { TableOutlined } from "@ant-design/icons";

export const DisplayColumns = () => {

    const tableModel = React.useContext(TableContext);
    const { displayColumns, allColumns } = tableModel;
    
    const [visible, setVisible] = React.useState(false);
   
    const clickMenuItem = (item: number) => {
        tableModel.toggleDisplay(item);
    }
    
    const DropdownOverlay = 
        <Menu onClick={() => setVisible(true)} >
            {allColumns.map(e => (
                <Menu.Item key={e.$$id} onClick={() => clickMenuItem(e.$$id)}>
                    <Checkbox 
                        checked={displayColumns.includes(e.$$id)} 
                        onClick={e => e.stopPropagation()}>{e.title}</Checkbox>
                </Menu.Item>
            ))}
        </Menu>

    return (
        <Dropdown 
            className="display-columns"
            onVisibleChange={b => setVisible(b)}
            visible={visible}
            overlay={DropdownOverlay}>
            <Button type="link" icon={<TableOutlined />}>选择列</Button>
        </Dropdown>
    )
}