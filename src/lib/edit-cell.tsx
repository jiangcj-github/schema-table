import React from "react";
import {TableContext} from "./st";
import styled from "styled-components";
import cln from "classnames";
import {EditOutlined} from "@ant-design/icons"
import { widgetRegistry } from './widget/registry';


export const EditCell = (props: any) => {

    const tableModel = React.useContext(TableContext);
    const { col } = props;

    const [inEdit, setInEdit] = React.useState(false);

    const onFocus = () => {
        setInEdit(true);
        document.body.style.setProperty("overflow", "hidden");
    }

    const clickMask = () => {
        setInEdit(false);
        document.body.style.removeProperty("overflow");
    }

   
    const Widget = widgetRegistry.get(col.editable.widget);

    return <Div>
        <div className={cln({"cell-mask": true, "active": inEdit})} onClick={clickMask} />
        <div className="cell" onClick={onFocus} >
            {inEdit ? 
                <Widget ui={col.editable} /> : 
                <>
                    {props.children}&nbsp;
                    <EditOutlined />
                </>}
        </div>
        
    </Div>
    
}

const Div = styled.div`
    cursor: text;
    .cell-mask {
        left: 0;
        right: 0;
        top: 0;
        bottom: 0;
        &.active {
            position: fixed;
            z-index: 1000;
        }
        &.active + .cell {
            position: relative;
            z-index: 1001;
        }
    }
    .cell {
        outline: 0;
    }
    .cell-input {
        width: 100%;
    }
`