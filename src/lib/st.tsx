import React from "react";
import {Table, Button, Dropdown, Menu, Divider, Tooltip} from "antd";
import { EditCell } from './edit-cell';
import _ from "lodash";
import {StatusBar} from "./status-bar";
import styled from "styled-components";
import {ISTProps, TableContext, IColumnButton, IRecord, IColumnMenuButton} from "./tools";
import {IRecordMD, TableModel, IColumnMD} from "./model";
import * as ICON from "@ant-design/icons";

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

    get tableModel() {
        return this.state.model;
    }

    private renderEditable = (col: IColumnMD, _1: any, record: IRecordMD, _2: number) => {
        const { model: tableModel } = this.state;
        const dataIndex = col.dataIndex as string;
        return (
            <EditCell col={col} record={record}>
                <EditSpan className={tableModel.isChanged(record, dataIndex) ? "changed" : ""}>
                    {col.render ? col.render(_1, record, _2): _.get(record, dataIndex)}
                    &nbsp;<ICON.EditOutlined />
                </EditSpan>
            </EditCell>
        )
    }

    private renderButtonsOverlay = (children: IColumnMenuButton[], record: IColumnMD) => {
        const { model: tableModel } = this.state;
        return (
            <OverlayMenu>
                {children.map((child: IColumnMenuButton, idx: number) => {
                    const disabled = child.disabled?.call(tableModel, record) ?? false;
                    const visible = child.visible?.call(tableModel, record) ?? true;
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
                            onClick={() => child.onClick?.call(tableModel, record)}>
                            {child.text}
                        </Menu.Item>
                    )
                })}
            </OverlayMenu>
        )
    }

    private renderOperation = (col: IColumnMD, record: IRecordMD) => {
        const { model: tableModel } = this.state;
        const btns = col.buttons?.map((button: IColumnButton, idx: number) => {
            const disabled = button.disabled?.call(tableModel, record) ?? false;
            const visible = button.visible?.call(tableModel, record) ?? true;
            if(!visible) {
                return null;
            }
            if(button.children) {
                return (
                    <Dropdown 
                        key={idx} 
                        overlay={this.renderButtonsOverlay(button.children, record)} 
                        disabled={disabled} 
                        placement="bottomCenter">
                        <Button type="link">
                            {button.text}<ICON.DownOutlined />
                        </Button>
                    </Dropdown>
                )
            }
            const btn = (
                <Button 
                    key={idx} 
                    disabled={disabled} 
                    onClick={() => button.onClick?.call(tableModel, record)} 
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
            dividerBtns.push(btns[i]);
            if(i < btns.length-1) {
                dividerBtns.push(<Divider key={`divider_${i}`} type="vertical" orientation="center"/>)
            }
        }
        return <OperationWrap>{dividerBtns}</OperationWrap>
    }

    public render() {
        const { model: tableModel } = this.state;
        const { allColumns, displayColumns, mergedData } = tableModel;
        const columns = allColumns.filter(e => displayColumns.includes(e.$$id));

        const dealColumns = columns.map(col => {
            const nCol = _.cloneDeep(col);
            if(col.editable && col.dataIndex) {
                Object.assign(nCol, {
                    render: (_: any, record: IRecordMD, index: number) => this.renderEditable(col, _, record, index),
                })
            }
            if(col.buttons) {
                Object.assign(nCol, {
                    render: (_: any, record: IRecordMD) => this.renderOperation(col, record),
                })
            }
            return nCol;
        });
        const rowSelectionMap = this.props.hideRowSelection === true ? {} : {
            rowSelection: {
                selectedRowKeys: tableModel.selectedRows,
                ...this.props.rowSelection,
                onChange: (selectedRowKeys: number[], selectedRows: IRecord[]) => {
                    if(!this.props.rowSelection?.hasOwnProperty("selectedRowKeys")) {
                        tableModel.setSelectedRows(selectedRowKeys);
                    }
                    this.props?.rowSelection?.onChange?.call(tableModel, selectedRowKeys, selectedRows);
                }
            }
        }
        const paginationMap = this.props.hidePagination === true ? {pagination: false} : {
            pagination: {
                showLessItems: true,
                showQuickJumper: true,
                showSizeChanger: true,
                showTotal: (total: number) => <span>共{total}条</span>,
                ...this.props.pagination,
            }
        }

        return (
            <TableContext.Provider value={tableModel}>
                {!this.props.hideStatusBar && <StatusBar {...this.props.statusBar} />}
                <StyleTable
                    {...this.props}
                    showSorterTooltip={false}
                    dataSource={mergedData}
                    rowKey="$$id"
                    columns={dealColumns}
                    {...paginationMap}
                    {...rowSelectionMap as any}
                />
            </TableContext.Provider>
        )
    }
}

const EditSpan = styled.span`
    &.changed {
        color: blue;
    }
`

const OperationWrap = styled.span`
    .ant-btn {
        margin: 0 5px 0 0;
        padding: 0;
    }
    .ant-divider {
        margin: 0 5px 0 0;
    }
`

export const OverlayMenu = styled(Menu) `
    min-width: 80px;
`

const StyleTable = styled(Table)`
    .ant-table-thead > tr > th, .ant-table-tbody > tr > td{
        padding: 8px 12px;
    }
    .ant-table-thead > tr > th {
       font-weight: bold;
    }
    .ant-table-column-sorters {
        padding: 0;
    }
    .ant-table-column-sorter-up.active, .ant-table-column-sorter-down.active, .ant-table-filter-trigger.active {
        color: #000;
    }
    .ant-btn > .anticon + span {
        margin-left: 4px;
    }
`