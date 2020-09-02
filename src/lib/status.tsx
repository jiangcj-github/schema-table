import React from "react"
import {Button, Divider} from "antd";
import styled from "styled-components";
import {TableContext} from "./tools";
import {DisplayColumns} from "./display-columns";
import {DeleteOutlined, ExportOutlined, CloudUploadOutlined, PlusCircleOutlined, RedoOutlined} from "@ant-design/icons";

export const StatusBar = () => {

    const tableModel = React.useContext(TableContext);

    const {adds, modifies, dels} = tableModel.changedInfo;
    const hasChanged = !!adds.length || !!modifies.length || !!dels.length;

    const { selectedRows } = tableModel;
    const hasSelected = !!selectedRows.length;
    
    const onSave = () => {
        console.log(adds, modifies, dels);
    }
    const onCancel = () => {
        tableModel.resetEdit();
    }
    const onAdd = () => {
        tableModel.add();
    }
    const onExport = () => {
        tableModel.exportXlsx("下载");
    }
    const onDeleteSelection = () => {
        tableModel.deleteSelection();
    }

    return <Div>
        <DisplayColumns />
        <div>
            <Divider type="vertical" orientation="center" />
            <Button type="link" onClick={onAdd} className="op-btn" icon={<PlusCircleOutlined />}>添加</Button>
            <Divider type="vertical" orientation="center" />
            <Button type="link" onClick={onExport} className="op-btn" icon={<ExportOutlined />}>导出</Button>
        </div>
        {hasSelected && 
            <div className="selection">
                <Divider type="vertical" orientation="center" />
                <span className="sel-tip">已选中{selectedRows.length}项</span>
                <Button type="link" onClick={onDeleteSelection} icon={<DeleteOutlined />}>删除</Button>
            </div>}
       
        {hasChanged &&
            <div className="changed">
                <Divider type="vertical" orientation="center" />
                {!!adds.length && <span className="cg-tip">新增{adds.length}条</span>}
                {!!modifies.length && <span className="cg-tip">修改{modifies.length}条</span>}
                {!!dels.length && <span className="cg-tip">删除{dels.length}条</span>}
                <Button type="link" onClick={onSave} icon={<CloudUploadOutlined />}>保存</Button>
                <Button type="link" onClick={onCancel} icon={<RedoOutlined />}>撤销</Button>
            </div>}
    </Div>
}

const Div = styled.div`
    display: flex;
    align-items: center;
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