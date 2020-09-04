import React from 'react';
import 'antd/dist/antd.css';
import {PlusCircleOutlined} from '@ant-design/icons';
import {IColumn, TableModel, IRecordMD, ST} from '../lib';

const columns: IColumn[] =[
    {
        title: "姓名", 
        dataIndex: "name",
        width: 200,
        editable: {
            widget: "select",
            placeholder: "请选择姓名",
            options: [
                {label: "小明", value: "小明"},
                {label: "小红", value: "小红"},
                {label: "小王", value: "小王"},
            ],
        },
        filters: [
            {
                text: '小明',
                value: "小明",
            },
            {
                text: '小王',
                value: "小王",
            },
        ],
        onFilter: (value, record) => {
            return record.name === value;
        },
        sorter: (a, b) => a.age - b.age,
    },
    {
        title: "年龄", 
        dataIndex: "age",
        width: 200,
        editable: {
            widget: "switch"
        }
    },
    {
        title: "出生日期", 
        dataIndex: "birth",
        editable: {
            widget: "datepicker",
        }
    },
    {
        title: "操作",
        fixed: "right",
        width: 200,
        buttons: [
            {
                text: "复制",
                tooltip: "复制",
                icon: <i />,
                onClick: function(this: TableModel, record: IRecordMD) {
                    this.copy(record);
                }
            },
            {
                type: "divider",
            },
            {
                text: "删除",
                tooltip: "删除",
                onClick: function(this: TableModel, record: IRecordMD) {
                    this.delete(record);
                }
            },
            {
                type: "divider",
            },
            {
                text: "更多",
                children: [
                    {text: "编辑"},
                    {text: "查看"},
                    {type: "divider"},
                    {text: "审核"},
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
    return <ST columns={columns} data={data} 
        statusBar={{
            buttons: [
                {text: "报警", onClick: function(){},  icon: <PlusCircleOutlined />,},
                {text: "邮件", onClick: function(){}},
                {text: "发送", onClick: function(){}},
            ]
        }} />
}

export default App;
