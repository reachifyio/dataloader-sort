export = DataLoaderSort;

declare function DataLoaderSort<T extends any = any>(keys: Array<string | number | any>, data: T[], prop?: string): Array<T | null>;

declare namespace DataLoaderSort {}
