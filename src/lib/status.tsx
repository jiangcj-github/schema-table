import React from "react"
import {Button} from "antd";
import styled from "styled-components";
import {TableContext} from "./tools";

export const StatusBar = () => {

    const tableModel = React.useContext(TableContext);
    const {adds, modifies, dels} = tableModel.changedInfo;
    
    const isChanged = !!adds.length || !!modifies.length || !!dels.length;
    
    const onSave = () => {
        console.log(adds, modifies, dels);
    }
    const onCancel = () => {
        tableModel.resetEdit();
    }
    const onAdd = () => {
        tableModel.add();
    }

    return <Div>
        <Button type="link" onClick={onAdd}>添加</Button>

        {isChanged &&
            <div className="changed">
                {!!adds.length && <span className="cg-tip">添加{adds.length}条</span>}
                {!!modifies.length && <span className="cg-tip">修改{modifies.length}条</span>}
                {!!dels.length && <span className="cg-tip">删除{dels.length}条</span>}
                <Button type="link" onClick={onSave}>保存</Button>
                <Button type="link" onClick={onCancel}>撤销</Button>
            </div>}
    </Div>
}

const Div = styled.div`
    display: flex;
    .changed {
        .cg-tip {
            margin-right: 5px;
        }
        .ant-btn {
            padding: 0;
            margin-left: 5px;
        }
    }
`