import React, {ReactNode} from "react";
import styled from "styled-components";
import cln from "classnames";
import { widgetRegistry } from './widget/registry';
import _ from "lodash";
import {IColumnMD, IRecordMD} from "../model";
import { TableContext } from '../tools';

interface IEditCellProps {
    col: IColumnMD;
    record: IRecordMD;
    children: ReactNode;
}

export const EditCell = (props: IEditCellProps) => {

    const tableModel = React.useContext(TableContext);
    const { col, record } = props;
    const editable: any = typeof(col.editable) === "function" ? 
        col.editable.call(tableModel, record) : 
        col.editable;

    const [inEdit, setInEdit] = React.useState(false);

    const onFocus = () => {
        setInEdit(true);
        document.body.style.setProperty("overflow", "hidden");
    }

    const clickMask = () => {
        setInEdit(false);
        document.body.style.removeProperty("overflow");
        editable.onSave?.call(tableModel, record, _.get(record, col.dataIndex as string));
    }

    const Widget = widgetRegistry.get(editable?.widget || "");
    const {onSave, widget, ...restProps} = editable;

    return (
        <Div>
            <div className={cln({"cell-mask": true, "active": inEdit})} onClick={clickMask} />
            <div className="cell" onClick={onFocus} >
                {inEdit ? 
                    <Widget 
                        ui={restProps} 
                        dataIndex={col.dataIndex} 
                        value={_.get(record, col.dataIndex as string)}
                        record={record} 
                        tableModel={tableModel} /> : 
                    <>
                        {props.children}
                    </>}
            </div>
        </Div>
    )
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
            background: rgba(255, 255, 255, .3);
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
        max-width: 200px;
    }
`