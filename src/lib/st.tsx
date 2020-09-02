import React from "react";
import {Table, Button, Dropdown, Menu, Divider} from "antd";
import { EditCell } from './edit-cell';
import _ from "lodash";
import {EditOutlined, DownOutlined} from "@ant-design/icons";
import {StatusBar} from "./status";
import styled from "styled-components";
import {ISTProps, TableContext, IColumnOp} from "./tools";
import {IRecordMD, TableModel} from "./model";

interface ISTState {
    model: TableModel;
    prevProps: ISTProps;
    update: () => void;
}

export class ST extends React.Component<ISTProps> {

    public state: ISTState = {
        model: new TableModel(this.props, () => this.forceUpdate()),
        prevProps: this.props,
        update: () => this.forceUpdate()
    }

    static getDerivedStateFromProps(nextProps: ISTProps, prevState: ISTState) {
        const { prevProps } = prevState;
        const nextState: Partial<ISTState> = { prevProps: nextProps };
        if(!_.isEqual(prevProps.data, nextProps.data)) {
            nextState.model = new TableModel(nextProps, prevState.update);
        }
        return nextState;
    }

    public render() {
        const { model: tableModel } = this.state;
        const { allColumns, displayColumns, mergedData } = tableModel;

        const columns = allColumns.filter(e => displayColumns.includes(e.$$id));

        columns.forEach(col => {
            if(col.editable && col.dataIndex) {
                const _render = col.render;
                const dataIndex = col.dataIndex as string;
                Object.assign(col, {
                    render: (val: any, record: IRecordMD, index: number) => (
                        <EditCell col={col} record={record}>
                            {_render ? 
                                _render(val, record, index) :
                                <CgSpan className={tableModel.isChanged(record, dataIndex) ? "changed" : ""}>
                                    {_.get(record, dataIndex)}&nbsp;
                                    <EditOutlined />
                                </CgSpan>}
                        </EditCell>
                    )
                })
            }
            if(col.buttons) {
                Object.assign(col, {
                    render: (_: any, record: IRecordMD) => {
                        const btns = col.buttons?.map((button: IColumnOp, idx: number) => {
                            if(typeof(button) === "string") {
                                return <Divider key={idx} type="vertical" orientation="center"/>
                            }
                            if(button.children) {
                                const overlay = (
                                    <OpMenu>
                                        {button.children.map((child: IColumnOp, idx2: number) => typeof(child) === "string" ?
                                            <Menu.Divider key={idx2}/> :
                                            <Menu.Item key={idx2} onClick={() => child.onClick?.call(tableModel, record)}>
                                                {child.text}
                                            </Menu.Item>)}
                                    </OpMenu>
                                )
                                return (
                                    <Dropdown key={idx} overlay={overlay} placement="bottomCenter">
                                        <Button type="link">
                                            {button.text}<DownOutlined />
                                        </Button>
                                    </Dropdown>
                                )
                            }
                            return (
                                <Button key={idx} onClick={() => button.onClick?.call(tableModel, record)} type="link">
                                    {button.text}
                                </Button>
                            )
                        });
                        return <OpSpan>{btns}</OpSpan>
                    }
                })
            }
        })

        return (
            <TableContext.Provider value={tableModel}>
                <StatusBar />
                <Table
                    {...this.props}
                    dataSource={mergedData}
                    rowKey="$$id"
                    columns={columns}
                    rowSelection={{
                        ...this.props.rowSelection,
                        selectedRowKeys: tableModel.selectedRows,
                        onChange: (selectedRowKeys: number[]) => {
                            tableModel.setSelectedRows(selectedRowKeys);
                            this.props?.rowSelection?.onChange(selectedRowKeys);
                        }
                    } as any}
                />
            </TableContext.Provider>
        )
    }

}

const CgSpan = styled.span`
    &.changed {
        color: red;
    }
`

const OpSpan = styled.span`
    .ant-btn {
        margin: 0;
        padding: 0;
    }
`

const OpMenu = styled(Menu) `
    min-width: 80px;
    .ant-dropdown-menu-item {
        text-align: center;
    }
`