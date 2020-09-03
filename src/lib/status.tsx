import React from "react"
import {Button, Divider} from "antd";
import styled from "styled-components";
import {TableContext, IStatusBar} from "./tools";
import {DisplayColumns} from "./display-columns";
import * as ICON from "@ant-design/icons";

export const StatusBar = (props: IStatusBar) => {
    const tableModel = React.useContext(TableContext);
    const {adds, modifies, dels} = tableModel.changedInfo;
    const hasChanged = !!adds.length || !!modifies.length || !!dels.length;
    const { selectedRows } = tableModel;
    const hasSelected = !!selectedRows.length;
    
    const onSave = () => {
        if(props.onSave?.call(tableModel, tableModel.changed) === false) {
            return;
        }
        console.log(tableModel.changed);
    }
    const onCancel = () => {
        if(props.onCancel?.call(tableModel, tableModel.changed) === false) {
            return;
        }
        tableModel.resetEdit();
    }
    const onAdd = () => {
        if(props.onAdd?.call(tableModel) === false) {
            return;
        }
        tableModel.add();
    }
    const onExport = () => {
        if(props.onExport?.call(tableModel, tableModel.mergedData) === false) {
            return;
        }
        tableModel.exportXlsx("下载");
    }
    const onDeleteSelection = () => {
        if(props.onDelete?.call(tableModel, tableModel.selectedRecords) === false) {
            return;
        }
        tableModel.deleteSelection();
    }

    return <Div>
        {!props.hideAdjustColumns && <DisplayColumns />}
        <div>
            <Divider type="vertical" orientation="center" />
            <Button type="link" onClick={onAdd} className="op-btn" icon={<ICON.PlusCircleOutlined />}>添加</Button>
            <Divider type="vertical" orientation="center" />
            <Button type="link" onClick={onExport} className="op-btn" icon={<ICON.ExportOutlined />}>导出</Button>
            {props.buttons?.map((e, idx) => <React.Fragment key={idx}>
                <Divider type="vertical" orientation="center" />
                <Button type="link" onClick={() => e.onClick?.call(tableModel)} 
                    icon={e.icon ?? <ICON.SettingOutlined />} className="op-btn">{e.text}</Button>
            </React.Fragment>)}
        </div>
        {hasSelected && 
            <div className="selection">
                <Divider type="vertical" orientation="center" />
                <span className="sel-tip">已选中{selectedRows.length}项</span>
                <Button type="link" onClick={onDeleteSelection} icon={<ICON.DeleteOutlined />}>删除</Button>
            </div>}
       
        {hasChanged &&
            <div className="changed">
                <Divider type="vertical" orientation="center" />
                {!!adds.length && <span className="cg-tip">新增[{adds.length}]</span>}
                {!!modifies.length && <span className="cg-tip">修改[{modifies.length}]</span>}
                {!!dels.length && <span className="cg-tip">删除[{dels.length}]</span>}
                <Button type="link" onClick={onSave} icon={<ICON.CloudUploadOutlined />}>保存</Button>
                <Button type="link" onClick={onCancel} icon={<ICON.RedoOutlined />}>撤销</Button>
            </div>}
    </Div>
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
    .changed {
        .cg-tip {
            margin-right: 5px;
        }
        .ant-btn {
            padding: 0;
            margin-left: 5px;
        }
    }
    .selection {
        .ant-btn {
            padding: 0;
            margin-left: 5px;
        }
    }
    .ant-btn > .anticon + span {
        margin-left: 4px;
    }
`