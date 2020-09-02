import React from 'react';
import { ST } from "../lib/st";
import 'antd/dist/antd.css';
import {IColumn} from '../lib/tools';
import { TableModel, IRecordMD } from './../lib/model';

const columns: IColumn[] =[
    {
        title: "姓名", 
        dataIndex: "name",
        width: "200px",
        editable: {
            widget: "select",
            placeholder: "请选择姓名",
            options: [
                {label: "小明", value: "小明"},
                {label: "小红", value: "小红"},
                {label: "小王", value: "小王"},
            ],
        },
    },
    {
        title: "年龄", 
        dataIndex: "age",
        width: "200px",
        editable: {
            widget: "number",
            placeholder: "请输入年龄",
        }
    },
    {
        title: "出生日期", 
        dataIndex: "birth",
        editable: {
            widget: "input",
            placeholder: "请输入出生日期",
        }
    },
    {
        title: "操作",
        buttons: [
            {
                text: "复制",
                onClick: function(this: TableModel, record: IRecordMD) {
                    this.copy(record);
                }
            },
            "",
            {
                text: "删除",
                onClick: function(this: TableModel, record: IRecordMD) {
                    this.delete(record);
                }
            },
            "",
            {
                text: "更多",
                children: [
                    {
                        text: "编辑",
                    },
                    {
                        text: "查看",
                    },
                    "",
                    {
                        text: "审核",
                    },
                ]
            }
        ]
    }
];

const data = [
    {name: "小王", age: 18, birth: "2020-09-08"},
    {name: "小红", age: 18, birth: "2020-09-09"},
    {name: "小明", age: 18, birth: "2020-09-18"},
    {name: "小明", age: 18, birth: "2020-09-18"},
    {name: "小明", age: 18, birth: "2020-09-18"},
    {name: "小明", age: 18, birth: "2020-09-18"},
    {name: "小明", age: 18, birth: "2020-09-18"},
    {name: "小明", age: 18, birth: "2020-09-18"},
    {name: "小明", age: 18, birth: "2020-09-18"},
    {name: "小明", age: 18, birth: "2020-09-18"},
    {name: "小明", age: 18, birth: "2020-09-18"},
    {name: "小明", age: 18, birth: "2020-09-18"},
    {name: "小明", age: 18, birth: "2020-09-18"},
    {name: "小明", age: 18, birth: "2020-09-18"},
    {name: "小明", age: 18, birth: "2020-09-18"},
    {name: "小明", age: 18, birth: "2020-09-18"},
    {name: "小明", age: 18, birth: "2020-09-18"},
]

function App() {
    return <ST columns={columns} data={data} />
}

export default App;
