"use client";

import type { WebsocketEntities } from "@models/entityFetchMethods";
import { Button } from "@mui/material";
import DataVisualizationWrapper from "../DataVisualizationWrapper";
import DataVisualizationHeader from "../DataVisualizationHeader";
import { uppercaseFirstLetter } from "@/utils/uppercaseFirstLetter";
import { prettyPrintCamel } from "@/utils/prettyPrintCamel";
import { useState } from "react";
import CustomDataGrid from "@components/visualization/datagrid/CustomDataGrid";
import {
  fisheryActivityColumns,
  fisheryActivityColumnVisibilityModel,
} from "@components/visualization/datagrid/cellDefs/fisheryActivity";

type WebsocketVisualizationProps = {
  entity: WebsocketEntities;
  handleRemoveVisualization: () => void;
};

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
}: {
  handleSubscribe: () => void;
  isSubscribed: boolean;
}) {
  return (
    <Button
      variant="contained"
      onClick={handleSubscribe}
      color="primary"
      size="small"
      disabled={isSubscribed}
    >
      Subscribe
    </Button>
  );
}

export default function WebsocketVisualization(
  props: WebsocketVisualizationProps,
) {
  const { entity, handleRemoveVisualization } = props;

  const [isSubscribed, setIsSubscribed] = useState(false);
  return (
    <DataVisualizationWrapper>
      <DataVisualizationHeader
        label={`${uppercaseFirstLetter(prettyPrintCamel(entity))} - Websocket`}
        buttons={[
          <UnsubscribeButton
            key="unsubscribe"
            isSubscribed={isSubscribed}
            handleUnsubscribe={() => setIsSubscribed(false)}
          />,
          <SubscribeButton
            key="subscribe"
            isSubscribed={isSubscribed}
            handleSubscribe={() => setIsSubscribed(true)}
          />,
        ]}
        handleRemoveVisualization={handleRemoveVisualization}
      />
      <CustomDataGrid
        columns={fisheryActivityColumns}
        columnVisibilityModel={fisheryActivityColumnVisibilityModel}
        rows={[]}
      />
    </DataVisualizationWrapper>
  );
}
