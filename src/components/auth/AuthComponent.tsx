"use client";

import {
  Alert,
  Box,
  Button,
  Paper,
  Stack,
  styled,
  TextField,
  Typography,
} from "@mui/material";
import { getLoginErrorString } from "@server/auth/CredentialSignInErrors";
import { signIn, signOut, useSession } from "next-auth/react";
import { useState, type ElementType } from "react";
import { useForm, type SubmitHandler } from "react-hook-form";
import { useEffect } from "react";
import DataVisualizationWrapper from "@components/controls/DataVisualizationWrapper";

type FormInput = {
  clientId: string;
  clientSecret: string;
};

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
    "& > .MuiFormControl-root": {
      flex: 3,
    },
    "& > .MuiButtonBase-root": {
      flex: 1,
    },
  }),
);

export default function AuthComponent() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormInput>();

  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<boolean>(false);

  const session = useSession();

  useEffect(() => {
    if (success) {
      const timer = setTimeout(() => {
        setSuccess(false);
      }, 5000);

      return () => clearTimeout(timer);
    }
  }, [success]);

  const onLoginSuccess = () => {
    setError(null);
    setSuccess(true);
  };

  const submitHandler: SubmitHandler<FormInput> = async (data) => {
    const result = await signIn("credentials", {
      clientId: data.clientId,
      clientSecret: data.clientSecret,
      redirect: false,
    });

    if (result?.error) {
      if (result.code) {
        const error: string = getLoginErrorString(result.code);
        setError(error);
      } else {
        console.error("Error has no error code", result);
        setError("An unknown error occurred. Please try again later.");
      }
    } else {
      onLoginSuccess();
    }
  };

  return (
    <DataVisualizationWrapper
    // component={Paper}
    // elevation={1}
    // sx={{
    //   padding: 2,
    //   width: "100%",
    //   // boxSizing: "border-box",
    //   gap: 2,
    //   display: "flex",
    //   justifyContent: "center",
    //   alignItems: "center",
    //   flexDirection: "column",
    // }}
    >
      {error && (
        <Alert
          severity="error"
          sx={{
            width: "100%",
          }}
          onClose={() => setError(null)}
        >
          {error}
        </Alert>
      )}
      {success && (
        <Alert
          severity="success"
          sx={{
            width: "100%",
          }}
          onClose={() => setSuccess(false)}
        >
          Successfully logged in
        </Alert>
      )}
      <StyledStack
        component="form"
        gap={2}
        onSubmit={handleSubmit(submitHandler)}
      >
        <TextField
          label="Client ID"
          variant="outlined"
          type="text"
          fullWidth
          {...register("clientId", { required: true })}
          error={!!errors.clientId}
          helperText={errors.clientId ? "Client ID is required" : ""}
        />
        <TextField
          label="Client Secret"
          variant="outlined"
          type="password"
          fullWidth
          {...register("clientSecret", { required: true })}
          error={!!errors.clientSecret}
          helperText={errors.clientSecret ? "Client Secret is required" : ""}
        />
        <Button variant="contained" type="submit" color="primary" size="large">
          Sign In
        </Button>
        <Button
          variant="outlined"
          type="button"
          color="secondary"
          size="large"
          onClick={() => {
            void signOut({ redirect: false });
          }}
        >
          Sign Out
        </Button>
      </StyledStack>
      <Stack sx={{ width: "100%" }} direction="column">
        <Typography variant="h6" component="h3">
          Authentication data:
        </Typography>
        <Typography variant="body1" component="p">
          Status: {session.status}
          <br />
          Scopes:{" "}
          {session.data?.scopes?.length
            ? session.data.scopes.join(", ")
            : "none"}
          <br />
        </Typography>
      </Stack>
    </DataVisualizationWrapper>
  );
}
