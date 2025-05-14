import { Paper, Stack } from "@mui/material";
import type { ReactNode } from "react";

type DataVisualizationWrapperProps = {
  children: ReactNode;
};

export default function DataVisualizationWrapper(
  props: DataVisualizationWrapperProps,
) {
  const { children } = props;
  return (
    <Stack
      component={Paper}
      elevation={1}
      sx={{
        padding: 2,
        width: "100%",
        // boxSizing: "border-box",
        gap: 2,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
      }}
    >
      {children}
    </Stack>
  );
}
