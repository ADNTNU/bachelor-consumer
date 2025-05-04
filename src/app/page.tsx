import AuthComponent from "@components/auth/AuthComponent";
import DataVisualizationController from "@components/controls/DataVisualizationController";
import { Container, Divider, Typography } from "@mui/material";

const divider = <Divider orientation="horizontal" flexItem />;

export default function HomePage() {
  return (
    <Container
      component="main"
      maxWidth="lg"
      sx={{
        py: 3,
        gap: 3,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        minHeight: "100vh",
      }}
    >
      <Typography variant="h3" component="h1">
        Bachelor project consumer app
      </Typography>
      <AuthComponent />
      {divider}
      <DataVisualizationController divider={divider} />
    </Container>
  );
}
