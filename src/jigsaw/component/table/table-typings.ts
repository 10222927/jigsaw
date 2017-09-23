import {TemplateRef, Type} from "@angular/core";
import {LocalPageableTableData, PageableTableData, TableData} from "../../core/data/table-data";
import {SortAs, SortOrder} from "../../core/data/component-data";
import {TableCellRendererBase} from "./table-renderer";

export type TableColumnTargetFinder = (field: string, index: number) => boolean;
export type TableColumnTarget = number | string | (number | string)[] | TableColumnTargetFinder;
export type TableCellDataGenerator = (tableData: TableData, row: number, column: number) => any;

export function rowIndexGenerator(tableData: TableData, row: number): any {
    let index = 1;
    if (tableData instanceof PageableTableData || tableData instanceof LocalPageableTableData) {
        index += (tableData.pagingInfo.currentPage - 1) * tableData.pagingInfo.pageSize;
    }
    index += row;
    return index;
}

export class ColumnDefine {
    target: TableColumnTarget;
    visible?: boolean;
    width?: string;
    header?: TableHeader;
    cell?: TableCell;
    group?: boolean;
}

export class AdditionalColumnDefine {
    pos?: number;
    visible?: boolean;
    width?: string;
    header?: TableHeader;
    cell?: TableCell;
    group?: boolean;
}

export class TableDataChangeEvent {
    field: string | number;
    row: number | number[];
    column: number;
    cellData: string | number;
    oldCellData: string | number;
}

export class TableHeader {
    text?: string;
    renderer?: Type<TableCellRendererBase> | TemplateRef<any>;
    clazz?: string;
    sortable?: boolean;
    sortAs?: SortAs;
    defaultSortOrder?: SortOrder;
}

export class TableCell {
    renderer?: Type<TableCellRendererBase> | TemplateRef<any>;
    clazz?: string;
    editable?: boolean;
    editorRenderer?: Type<TableCellRendererBase>;
    data?: any | TableCellDataGenerator;
}

export class TableHeadSetting {
    cellData: string | number;
    width: string | number;
    visible: boolean;
    renderer: Type<TableCellRendererBase> | TemplateRef<any>;
    clazz: string;
    sortable: boolean;
    sortAs: SortAs;
    defaultSortOrder: SortOrder;
    field: string;
}

export class TableCellSetting {
    cellData: any;
    width: string | number;
    visible: boolean;
    renderer: Type<TableCellRendererBase> | TemplateRef<any>;
    clazz: string;
    editable: boolean;
    editorRenderer: Type<TableCellRendererBase> | TemplateRef<any>;
    group: boolean;
    field: string;
    rowSpan: number;
}

export class SortChangeEvent {
    sortAs: SortAs;
    order: SortOrder;
    field: string;
}

/**
 * @internal
 */
export function _getColumnIndex(data: TableData, additionalData: TableData, field: string): [number, TableData] {
    let index = data.field.indexOf(field);
    if (index != -1) {
        return [index, data];
    }
    index = additionalData ? additionalData.field.indexOf(field) : -1;
    if (index != -1) {
        return [index, additionalData];
    }
    return [-1, undefined];
}

export class AdditionalTableData extends TableData {
    public originData: TableData;
    public trackRowBy: string;

    private _cachedValues: { [field: string]: { [key: string]: any } } = {};
    private _trackRowByFields: number[];

    private _fixTrackRowFields() {
        if (this._trackRowByFields) {
            return;
        }
        this._trackRowByFields = [];
        const fields = this.trackRowBy ? this.trackRowBy.split(/\s*,\s*/g) : this.originData.field;
        fields.forEach(field => {
            const col = this.originData.field.findIndex(f => f === field);
            if (col == -1) {
                return;
            }
            this._trackRowByFields.push(col);
        });
    }

    public clearCachedValues(): void {
        this._cachedValues = {};
    }

    private _getValueKey(field: string, row: number): string {
        let valueKey = '';
        if (!this.originData) {
            console.warn('set originData and trackRowBy property of table before caching a value');
            return valueKey;
        }
        this._fixTrackRowFields();

        const excludedColumn = this.originData.field.findIndex(f => f === field);
        this._trackRowByFields.forEach(col => {
            if (col == excludedColumn) {
                return;
            }
            valueKey += this.originData.data[row][col] + ' $$ ';
        });
        return valueKey;
    }

    public cacheValue(field: string, row: number, value: any): void {
        const valueKey = this._getValueKey(field, row);
        if (!valueKey) {
            console.warn(`invalid value key by row[${row}]`);
            return;
        }
        if (!this._cachedValues[field]) {
            this._cachedValues[field] = {};
        }
        this._cachedValues[field][valueKey] = value;
    }

    public getCachedValue(field: string, row: number): any {
        const valueKey = this._getValueKey(field, row);
        if (!valueKey) {
            console.warn(`invalid value key by row[${row}]`);
            return;
        }
        if (!this._cachedValues[field]) {
            return;
        }
        return this._cachedValues[field][valueKey];
    }
}


