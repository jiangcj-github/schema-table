import { ReactNode } from "react";
import { IColumnMD, IRecordMD } from "./model";
interface IEditCellProps {
    col: IColumnMD;
    record: IRecordMD;
    children: ReactNode;
}
export declare const EditCell: (props: IEditCellProps) => JSX.Element;
export {};
