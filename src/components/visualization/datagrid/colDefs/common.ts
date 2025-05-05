import {
  type GridColDef,
  type GridColumnVisibilityModel,
  type GridValidRowModel,
} from "@mui/x-data-grid";

export type TypeSafeColDef<T extends GridValidRowModel, U> = {
  field: keyof T | keyof U;
} & GridColDef<T>;

export type FieldFromColumns<T> = T extends (infer U)[]
  ? U extends { field: infer F }
    ? F
    : never
  : never;

export type TypeSafeColVisibility<T> = T extends (infer U)[]
  ? U extends { field: infer F }
    ? F extends number | string | symbol
      ? Record<F, boolean> & GridColumnVisibilityModel
      : { [K in keyof U]: boolean } & GridColumnVisibilityModel
    : { [K in keyof U]: boolean } & GridColumnVisibilityModel
  : { [K in keyof T]: boolean } & GridColumnVisibilityModel;

export type UnknownGridData = Record<string, unknown> & {
  id: object | string | number;
};
