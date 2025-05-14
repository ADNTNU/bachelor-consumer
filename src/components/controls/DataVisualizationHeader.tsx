import { IconButton, Stack, Typography } from "@mui/material";
import { Fragment, type ReactNode } from "react";
import DeleteIcon from "@mui/icons-material/Delete";

type DataVisualizationHeaderProps = {
  label: string;
  buttons: ReactNode[];
  handleRemoveVisualization: () => void;
};

export default function DataVisualizationHeader(
  props: DataVisualizationHeaderProps,
) {
  const { label, buttons, handleRemoveVisualization } = props;
  return (
    <Stack
      direction={"row"}
      gap={1}
      justifyContent={"space-between"}
      width={"100%"}
    >
      <Stack direction={"row"} gap={1} alignItems={"center"}>
        <Typography variant="h6" component="h3">
          {label}
        </Typography>
        <IconButton
          aria-label={`delete ${label}`}
          onClick={handleRemoveVisualization}
        >
          <DeleteIcon />
        </IconButton>
      </Stack>
      <Stack direction={"row"} gap={1}>
        {buttons.map((button, index) => (
          <Fragment key={index}>{button}</Fragment>
        ))}
      </Stack>
    </Stack>
  );
}
