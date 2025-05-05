"use client";

import type { WebsocketEntities } from "@models/entityFetchMethods";
import { Alert, Button } from "@mui/material";
import DataVisualizationWrapper from "../DataVisualizationWrapper";
import DataVisualizationHeader from "../DataVisualizationHeader";
import { uppercaseFirstLetter } from "@/utils/uppercaseFirstLetter";
import { prettyPrintCamel } from "@/utils/prettyPrintCamel";
import { useEffect, useMemo, useRef, useState } from "react";
import CustomDataGrid from "@components/visualization/datagrid/CustomDataGrid";
import type { GridColDef } from "@mui/x-data-grid";
import type { WithId } from "@models/utils";
import { useSession } from "next-auth/react";
import { isWsTokenResponse } from "@models/dto/wsToken";
import { apiRoutes, getWebSocketUrlWithSessionTokenForEntity } from "apiRoutes";

function UnsubscribeButton({
  handleUnsubscribe,
  isSubscribed,
}: {
  handleUnsubscribe: () => void;
  isSubscribed: boolean;
}) {
  return (
    <Button
      variant="outlined"
      onClick={handleUnsubscribe}
      color="secondary"
      size="small"
      disabled={!isSubscribed}
    >
      Unsubscribe
    </Button>
  );
}

function SubscribeButton({
  handleSubscribe,
  isSubscribed,
  isAuthenticated,
}: {
  handleSubscribe: () => void;
  isSubscribed: boolean;
  isAuthenticated: boolean;
}) {
  return (
    <Button
      variant="contained"
      onClick={handleSubscribe}
      color="primary"
      size="small"
      disabled={isSubscribed || !isAuthenticated}
    >
      Subscribe
    </Button>
  );
}

type WebsocketVisualizationProps = {
  columns: GridColDef[];
  columnVisibilityModel: Record<string, boolean>;
  entity: WebsocketEntities;
  handleRemoveVisualization: () => void;
};

export default function WebsocketVisualization<T extends WithId>(
  props: WebsocketVisualizationProps,
) {
  const { columns, columnVisibilityModel, entity, handleRemoveVisualization } =
    props;

  const session = useSession();
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [rows, setRows] = useState<T[]>([]);
  const wsRef = useRef<WebSocket | null>(null);
  const [error, setError] = useState<string | null>(null);

  const isAuthenticated = useMemo(() => {
    return session.status === "authenticated";
  }, [session.status]);

  useEffect(() => {
    if (!isAuthenticated && isSubscribed) {
      setError(
        "You are not authenticated. Please log in to subscribe to data.",
      );
      handleUnsubscribe();
    } else if (!isAuthenticated && !isSubscribed) {
      setError(
        "You are not authenticated. Please log in to subscribe to data.",
      );
    } else if (isAuthenticated) {
      setError(null);
    }
  }, [isSubscribed, isAuthenticated]);

  const handleSubscribe = async () => {
    if (!session?.data?.accessToken || isSubscribed) return;

    try {
      // Step 1: Get short-lived session token
      const res = await fetch(apiRoutes.auth.wsToken, {
        headers: {
          Authorization: `Bearer ${session.data.accessToken}`,
        },
      });

      if (!res.ok) {
        console.error("Failed to fetch WebSocket session token");
        return;
      }

      const wsTokenBody: unknown = await res.json();

      if (!isWsTokenResponse(wsTokenBody)) {
        console.error("Invalid WebSocket token response", wsTokenBody);
        return;
      }

      const { wsToken } = wsTokenBody;

      // Step 2: Connect WebSocket through Gateway
      const ws = new WebSocket(
        getWebSocketUrlWithSessionTokenForEntity(entity, wsToken),
      );

      ws.onopen = () => {
        setIsSubscribed(true);
        console.log(`[WebSocket] Subscribed to ${entity}`);
      };

      ws.onmessage = (event) => {
        try {
          if (typeof event.data !== "string") {
            console.error("Received non-string message:", event.data);
            return;
          }

          const data = JSON.parse(event.data) as T | T[];
          setRows((prev) => [
            ...prev,
            ...(Array.isArray(data) ? data : [data]),
          ]);
        } catch (e) {
          console.error("Failed to parse WebSocket message", e);
        }
      };

      ws.onclose = () => {
        console.log(`[WebSocket] Disconnected from ${entity}`);
        setIsSubscribed(false);
      };

      ws.onerror = (err) => {
        console.error("[WebSocket] Error:", err);
        ws.close();
      };

      wsRef.current = ws;
    } catch (e) {
      console.error("Subscription error:", e);
    }
  };

  const handleUnsubscribe = () => {
    wsRef.current?.close();
    setIsSubscribed(false);
  };

  return (
    <DataVisualizationWrapper>
      <DataVisualizationHeader
        label={`${uppercaseFirstLetter(prettyPrintCamel(entity))} - WebSocket`}
        buttons={[
          <UnsubscribeButton
            key="unsubscribe"
            isSubscribed={isSubscribed}
            handleUnsubscribe={handleUnsubscribe}
          />,
          <SubscribeButton
            key="subscribe"
            isSubscribed={isSubscribed}
            handleSubscribe={handleSubscribe}
            isAuthenticated={isAuthenticated}
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
