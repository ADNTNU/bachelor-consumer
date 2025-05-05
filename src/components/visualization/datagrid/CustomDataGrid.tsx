import { DataGrid } from "@mui/x-data-grid";
import type { TypeSafeColDef } from "./colDefs/common";
import type { WithId } from "@models/utils";

type CustomDataGridProps<T extends WithId, U extends object> = {
  columns: TypeSafeColDef<T, U>[];
  columnVisibilityModel: Record<TypeSafeColDef<T, U>["field"], boolean>;
  rows: T[];
};

export default function CustomDataGrid<T extends WithId, U extends object>(
  props: CustomDataGridProps<T, U>,
) {
  const { columns, columnVisibilityModel, rows } = props;

  return (
    <DataGrid
      sx={{ width: "100%" }}
      rows={rows}
      columns={columns}
      pageSizeOptions={[10, 25, 50, 100]}
      initialState={{
        columns: {
          columnVisibilityModel,
        },
        pagination: {
          paginationModel: { pageSize: 10, page: 0 },
        },
      }}
    />
  );
}
