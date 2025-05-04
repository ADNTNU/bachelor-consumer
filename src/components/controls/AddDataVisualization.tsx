import type {
  AvailableEntities,
  AvailableFetchMethods,
} from "@models/entityFetchMethods";
import {
  Alert,
  Box,
  Button,
  MenuItem,
  Select,
  Stack,
  styled,
  Typography,
} from "@mui/material";
import type { Dispatch, ElementType, SetStateAction } from "react";
import { useForm, type SubmitHandler } from "react-hook-form";
import DataVisualizationWrapper from "./DataVisualizationWrapper";
import { prettyPrintCamel } from "@/utils/prettyPrintCamel";
import { uppercaseFirstLetter } from "@/utils/uppercaseFirstLetter";

const StyledStack = styled(Stack)<{ component: ElementType | undefined }>(
  ({ theme }) => ({
    display: "flex",
    flexDirection: "column",
    width: "100%",
    [theme.breakpoints.up("md")]: {
      flexDirection: "row",
      alignItems: "center",
    },
    gap: theme.spacing(2), // Add consistent spacing
    "& > .MuiInputBase-root": {
      flex: 3,
    },
    "& > .MuiButtonBase-root": {
      flex: 1,
    },
  }),
);

type FormInput = {
  entity: AvailableEntities | null;
  fetchMethod: AvailableFetchMethods | null;
};

type AddVisualizationProps = {
  entities: AvailableEntities[];
  fetchMethods: AvailableFetchMethods[];
  selectedEntity: AvailableEntities | null;
  setSelectedEntity: Dispatch<SetStateAction<AvailableEntities | null>>;
  selectedFetchMethod: AvailableFetchMethods | null;
  setSelectedFetchMethod: Dispatch<
    SetStateAction<AvailableFetchMethods | null>
  >;
  handleAddVisualization: () => void;
  selectedFetchMethodError: string | null;
};

export default function AddVisualization(props: AddVisualizationProps) {
  const {
    entities,
    fetchMethods,
    handleAddVisualization,
    selectedEntity,
    selectedFetchMethod,
    selectedFetchMethodError,
    setSelectedEntity,
    setSelectedFetchMethod,
  } = props;

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormInput>();

  const sumbitHandler: SubmitHandler<FormInput> = () => {
    handleAddVisualization();
  };

  return (
    <DataVisualizationWrapper>
      <Box width="100%">
        <Typography variant="h6" component="h3">
          Add Consumer
        </Typography>
      </Box>
      {selectedFetchMethodError && (
        <Alert severity="error" sx={{ width: "100%" }}>
          {selectedFetchMethodError}
        </Alert>
      )}
      <StyledStack component="form" onSubmit={handleSubmit(sumbitHandler)}>
        <Select
          {...register("entity", {
            required: "Entity is required",
          })}
          value={selectedEntity ?? ""}
          onChange={(e) =>
            setSelectedEntity(e.target.value as AvailableEntities)
          }
          error={!!errors.entity}
          label="Entity"
        >
          {entities.map((entity) => (
            <MenuItem key={entity} value={entity}>
              {uppercaseFirstLetter(prettyPrintCamel(entity))}
            </MenuItem>
          ))}
        </Select>
        <Select
          {...register("fetchMethod", {
            required: "Fetch method is required",
          })}
          value={selectedFetchMethod ?? ""}
          onChange={(e) =>
            setSelectedFetchMethod(e.target.value as AvailableFetchMethods)
          }
          error={!!errors.fetchMethod || !!selectedFetchMethodError}
          disabled={!selectedEntity}
          label="Fetch Method"
        >
          {fetchMethods.map((fetchMethod) => (
            <MenuItem key={fetchMethod} value={fetchMethod}>
              {fetchMethod}
            </MenuItem>
          ))}
        </Select>
        <Button type="submit" variant="contained" color="primary">
          Add
        </Button>
      </StyledStack>
    </DataVisualizationWrapper>
  );
}
