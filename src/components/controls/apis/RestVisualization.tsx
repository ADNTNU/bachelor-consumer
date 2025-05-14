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
import { apiRoutes } from "@/apiRoutes";

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

type RestVisualizationProps<T extends WithId> = {
  dataValidator: (data: unknown) => data is T;
  columns: GridColDef[];
  columnVisibilityModel: Record<string, boolean>;
  entity: RestEntities;
  handleRemoveVisualization: () => void;
};

export default function RestVisualization<T extends WithId>(
  props: RestVisualizationProps<T>,
) {
  const {
    columns,
    columnVisibilityModel,
    entity,
    handleRemoveVisualization,
    dataValidator,
  } = props;

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
    if (!isAuthenticated || !session.data?.accessToken) {
      setError("You are not authenticated. Please log in to fetch data.");
      return;
    }

    try {
      // Make the REST API call (adjust the URL as needed)
      const response = await fetch(apiRoutes.entities[entity].REST, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${session.data.accessToken}`,
        },
      });

      if (response.status === 401) {
        setError("You are not authenticated. Please log in to fetch data.");
        return;
      }

      if (!response.ok) {
        setError("Failed to fetch data from the API. Please try again later.");
        return;
      }

      const data: unknown = await response.json();

      if (!Array.isArray(data) || !data.every(dataValidator)) {
        console.error("Invalid data format:", data);
        setError("Invalid data format received from the API.");
        return;
      }

      setRows(data);
    } catch (error) {
      console.error("Error fetching data:", error);
      setError("Failed to fetch data. Please try again later.");
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
