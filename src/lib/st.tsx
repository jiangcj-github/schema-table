import React from "react";
import {Table, Checkbox, Dropdown, Button} from "antd";
import {useTable, TableModel} from "./model";
import {DisplayColumns} from "./display-columns";
import _ from "lodash";
import { EditCell } from './edit-cell';

interface IColumn {

}

interface ISTableProps<IData> {
    data?: IData[];
    columns?: IColumn[];
}


export const TableContext = React.createContext(new TableModel({}, null));


export const SchemaTable = (props: ISTableProps<any>) => {

    const [, update] = React.useState({})
    const tableModel = React.useRef(new TableModel(props, () => update({}))).current;

    const { allColumns, displayColumns, data } = tableModel;

    const columns: any = allColumns.filter(e => displayColumns.includes(e.idx));

    columns.map((e: any) => {
        if(e.editable) {
            e.render = () => <EditCell col={e}>
                {e.title}
            </EditCell>
        }
    })

    

    return (
        <TableContext.Provider value={tableModel}>
            <DisplayColumns />
            <Table
                dataSource={data}
                rowKey="idx"
                columns={columns}
            />
        </TableContext.Provider>
    )
}