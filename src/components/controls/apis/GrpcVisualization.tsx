import type { RestEntities } from "@models/entityFetchMethods";
import type { WithId } from "@models/utils";
import { Alert, Button } from "@mui/material";
import type { GridColDef } from "@mui/x-data-grid";
import { useSession } from "next-auth/react";
import { useEffect, useMemo, useState } from "react";
import DataVisualizationWrapper from "../DataVisualizationWrapper";
import DataVisualizationHeader from "../DataVisualizationHeader";
import { uppercaseFirstLetter } from "@/utils/uppercaseFirstLetter";
import { prettyPrintCamel } from "@/utils/prettyPrintCamel";
import CustomDataGrid from "@components/visualization/datagrid/CustomDataGrid";

function FetchButton({
  handleFetch,
  authenticated,
}: {
  handleFetch: () => void;
  authenticated: boolean;
}) {
  return (
    <Button
      variant="outlined"
      onClick={handleFetch}
      color="secondary"
      size="small"
      disabled={!authenticated}
    >
      Fetch Data
    </Button>
  );
}

type GrpcVisualizationProps = {
  columns: GridColDef[];
  columnVisibilityModel: Record<string, boolean>;
  entity: RestEntities;
  handleRemoveVisualization: () => void;
};

export default function GrpcVisualization<T extends WithId>(
  props: GrpcVisualizationProps,
) {
  const { columns, columnVisibilityModel, entity, handleRemoveVisualization } =
    props;

  const session = useSession();
  const [rows, setRows] = useState<T[]>([]);
  const [error, setError] = useState<string | null>(null);

  const isAuthenticated = useMemo(() => {
    return session.status === "authenticated";
  }, [session.status]);

  useEffect(() => {
    if (!isAuthenticated) {
      setError("You are not authenticated. Please log in to fetch data.");
    } else if (isAuthenticated) {
      setError(null);
    }
  }, [isAuthenticated]);

  const handleFetch = async () => {
    if (!isAuthenticated) {
      setError("You are not authenticated. Please log in to fetch data.");
      return;
    }
  };

  return (
    <DataVisualizationWrapper>
      <DataVisualizationHeader
        label={`${uppercaseFirstLetter(prettyPrintCamel(entity))} - REST`}
        buttons={[
          <FetchButton
            key="fetch"
            authenticated={isAuthenticated}
            handleFetch={handleFetch}
          />,
        ]}
        handleRemoveVisualization={handleRemoveVisualization}
      />
      {error && (
        <Alert severity="error" sx={{ width: "100%" }}>
          {error}
        </Alert>
      )}
      <CustomDataGrid
        columns={columns}
        columnVisibilityModel={columnVisibilityModel}
        rows={rows}
      />
    </DataVisualizationWrapper>
  );
}
