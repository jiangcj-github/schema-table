import React from "react"
import {Button, Divider, Dropdown, Tooltip, Menu} from "antd";
import styled from "styled-components";
import {TableContext, IStatusBar, IStatusMenuButton} from "../tools";
import {DisplayColumns} from "./display-columns";
import * as ICON from "@ant-design/icons";
import { OverlayMenu } from "../st";
import { Export } from "./export";

export const StatusBar = (props: IStatusBar) => {
    const tableModel = React.useContext(TableContext);
    const { selectedRecords } = tableModel;
  
    const renderButtonsOverlay = (children: IStatusMenuButton[]) => {
        return (
            <OverlayMenu>
                {children.map((child: IStatusMenuButton, idx: number) => {
                    const disabled = child.disabled?.call(tableModel, selectedRecords) ?? false;
                    const visible = child.visible?.call(tableModel, selectedRecords) ?? true;
                    if(!visible) {
                        return null;
                    }
                    if(child.type === "divider") {
                        return <Menu.Divider key={idx}/>
                    }
                    return (
                        <Menu.Item 
                            key={idx} 
                            disabled={disabled}
                            icon={child.icon ?? <ICON.SettingOutlined />}
                            onClick={() => child.onClick?.call(tableModel, selectedRecords)}>
                            {child.text}
                        </Menu.Item>
                    )
                })}
            </OverlayMenu>
        )
    }

    const renderButtons = () => {
        const btns = props.buttons?.map((button, idx) => {
            const disabled = button.disabled?.call(tableModel, selectedRecords) ?? false;
            const visible = button.visible?.call(tableModel, selectedRecords) ?? true;
            if(!visible) {
                return null;
            }
            if(button.children) {
                return (
                    <Dropdown 
                        key={idx} 
                        overlay={renderButtonsOverlay(button.children)} 
                        disabled={disabled} 
                        placement="bottomCenter">
                        <Button type="link" className="op-btn">
                            {button.text}<ICON.DownOutlined />
                        </Button>
                    </Dropdown>
                )
            }
            const btn = (
                <Button 
                    key={idx} 
                    disabled={disabled} 
                    className="op-btn"
                    onClick={() => button.onClick?.call(tableModel, selectedRecords)} 
                    icon={button.icon ?? <ICON.SettingOutlined />}
                    type="link">
                    {button.text}
                </Button>
            )
            if(button.tooltip) {
                return (
                    <Tooltip key={idx} placement="bottom" title={button.tooltip}>
                        {btn}
                    </Tooltip>
                )
            }
            return btn;
        }) ?? [];
        const dividerBtns = [];
        for(let i=0; i<btns.length; i++) {
            dividerBtns.push(<Divider key={`divider_${i}`} type="vertical" orientation="center"/>)
            dividerBtns.push(btns[i]); 
        }
        return <div>{dividerBtns}</div>;
    }

    return (
        <Div>
            {!props.hideDisplayColumns && <DisplayColumns />}
            {!props.hideExport && <Export />}
            {renderButtons()}
        </Div>
    );
}

const Div = styled.div`
    display: flex;
    align-items: center;
    padding: 0 12px;
    .display-columns {
        padding-right: 0;
    }
    .op-btn {
        padding: 0;
    }
    .ant-btn > .anticon + span {
        margin-left: 4px;
    }
`