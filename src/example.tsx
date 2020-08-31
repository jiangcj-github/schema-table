import React from "react";
import { SF, Schema } from "ks-schema-form/lib/antd";

export const xx = (props: any) => {

    const schema: Schema = {
        properties: {
            name: {
                type: "string",
                title: "姓名"
            }
        },
        ui: {
            layout: "inline",
        }
    }

    const schema2 = {
        customColumns: {
            default: ["选择", ""],
        },
        columns: [
            {
                title: "序号", 
                type: "no",
                fixed: true,
                width: "100px",
                render: function(idx: number) {

                }
            },
            {
                title: "选择", 
                type: "checkbox",
                render: function(idx: number) {

                }
            },
            {
                title: "", 
                index: "",
            },
            {
                title: "操作", 
                buttons: [
                    {
                        icon: "edit", 
                        text: "删除", 
                        disabled: true,
                        visible: true,
                        tooltip: "删除",
                        popover: {
                            title: "确定要删除",
                            okText: "",
                            icon: "star",
                        },
                        onClick: function() {
                            
                        }
                    },
                    "divider",
                    {
                        text: "更多",
                        children: [
                            "divider"
                        ]

                    },
                ]
            }
        ]
    }
        
}
