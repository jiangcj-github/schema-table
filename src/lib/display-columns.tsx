import React from "react";
import {TableContext} from "./st"
import {Checkbox, Dropdown, Button, Menu} from "antd";

export const DisplayColumns = () => {

    const tableModel = React.useContext(TableContext);
    const { displayColumns, allColumns } = tableModel;

    const [visible, setVisible] = React.useState(false);

    const options = allColumns.map(e => ({label: e.title, value: e.idx}));

    const onCheckGroupChange = (value: any) => {
        tableModel.setDisplayColumns(value);
    }

    const clickMenuItem = (event: any, item: number) => {
        tableModel.toggleDisplay(item);
    }
    
    const DropdownOverlay = 
        <Menu onClick={() => setVisible(true)} >
            {allColumns.map(e => (
                <Menu.Item key={e.idx} onClick={(event) => clickMenuItem(event, e.idx)}>
                    <Checkbox 
                        checked={displayColumns.includes(e.idx)} 
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
            onChange={onCheckGroupChange}
        />
    </>
}