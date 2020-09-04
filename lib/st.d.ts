import React from "react";
import { ISTProps } from "./tools";
import { TableModel } from "./model";
interface ISTState {
    model: TableModel;
    prevProps: ISTProps;
    update: () => void;
}
export declare class ST extends React.Component<ISTProps> {
    state: ISTState;
    static getDerivedStateFromProps(nextProps: ISTProps, prevState: ISTState): Partial<ISTState>;
    get tableModel(): TableModel;
    private renderEditable;
    private renderButtonsOverlay;
    private renderOperation;
    render(): JSX.Element;
}
export {};
