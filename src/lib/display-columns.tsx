import React from "react";
import {Checkbox, Dropdown, Button, Menu} from "antd";
import {TableContext} from "./tools";

export const DisplayColumns = () => {

    const tableModel = React.useContext(TableContext);
    const { displayColumns, allColumns } = tableModel;
    
    const [visible, setVisible] = React.useState(false);
    const options = allColumns.map(e => ({label: e.title, value: e.$$id}));

    const onCheckGroupChange = (value: number[]) => {
        tableModel.setDisplayColumns(value);
    }
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

    return <>
        <Dropdown 
            onVisibleChange={b => setVisible(b)}
            visible={visible}
            overlay={DropdownOverlay}>
            <Button type="link">选择显示列</Button>
        </Dropdown>
        <Checkbox.Group
            options={options}
            value={displayColumns}
            onChange={onCheckGroupChange as any}
        />
    </>
}