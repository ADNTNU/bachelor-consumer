"use client";

import {
  type AvailableEntities,
  type AvailableFetchMethods,
  availableEntities,
  availalbeEntityFetchMethods,
} from "@models/entityFetchMethods";
import { Fragment, useEffect, useMemo, useState, type ReactNode } from "react";
import WebsocketVisualization from "./apis/WebsocketVisualization";
import AddDataVisualization from "./AddDataVisualization";

type EntityFetchMethodPair = {
  entity: AvailableEntities;
  fetchMethod: AvailableFetchMethods;
  dateAdded: Date;
};

type EntityFetchMethodPairs = Map<string, EntityFetchMethodPair>;

type DataVisualizationControllerProps = {
  divider: ReactNode;
};

export default function DataVisualizationController(
  props: DataVisualizationControllerProps,
) {
  const { divider } = props;
  // State for the selected entity in the dropdown
  const [selectedEntity, setSelectedEntity] =
    useState<AvailableEntities | null>(null);
  // State for the selected fetch method in the dropdown
  const [selectedFetchMethod, setSelectedFetchMethod] =
    useState<AvailableFetchMethods | null>(null);
  // Error message for the dropdowns for entity and fetch method
  const [selectedFetchMethodError, setSelectedFetchMethodError] = useState<
    string | null
  >(null);

  // This is a map of entity-fetch method pairs that have been added to the visualization
  const [entityFetchMethodPairs, setEntityFetchMethodPairs] =
    useState<EntityFetchMethodPairs>(new Map());

  // Removes the error message for the dropdowns when the user selects a new entity
  useEffect(() => {
    setSelectedFetchMethodError(null);
  }, [selectedEntity, selectedFetchMethod]);

  const entities: AvailableEntities[] = useMemo(() => {
    return availableEntities.filter((entity) => {
      // If the entityFetchMethodPairs map has all available fetch methods for the entity, return false
      if (entityFetchMethodPairs.size > 0) {
        const fetchMethods = availalbeEntityFetchMethods[entity];
        return !fetchMethods.every((method) =>
          entityFetchMethodPairs.has(`${entity}-${method}`),
        );
      }
      return true;
    });
  }, [entityFetchMethodPairs]);

  const fetchMethods: AvailableFetchMethods[] = useMemo(() => {
    if (selectedEntity) {
      return availalbeEntityFetchMethods[selectedEntity].filter(
        (method) => !entityFetchMethodPairs.has(`${selectedEntity}-${method}`),
      );
    }
    return [];
  }, [entityFetchMethodPairs, selectedEntity]);

  const entityFetchMethodPairsArray: EntityFetchMethodPair[] = useMemo(() => {
    return Array.from(entityFetchMethodPairs.values()).sort(
      (a, b) => a.dateAdded.getTime() - b.dateAdded.getTime(),
    );
  }, [entityFetchMethodPairs]);

  const handleAddVisualization = () => {
    if (selectedEntity && selectedFetchMethod) {
      const newPair = {
        entity: selectedEntity,
        fetchMethod: selectedFetchMethod,
        dateAdded: new Date(),
      };
      setEntityFetchMethodPairs((prev) => {
        // Check if the pair already exists
        const pairKey = `${selectedEntity}-${selectedFetchMethod}`;
        if (prev.has(pairKey)) {
          return prev;
        }
        prev.set(`${selectedEntity}-${selectedFetchMethod}`, newPair);
        return new Map(prev);
      });
      setSelectedEntity(null);
      setSelectedFetchMethod(null);
    } else {
      setSelectedFetchMethodError(
        "Please select both entity and fetch method.",
      );
    }
  };

  const handleRemoveVisualization = (pairKey: string) => {
    setEntityFetchMethodPairs((prev) => {
      prev.delete(pairKey);
      return new Map(prev);
    });
  };

  return (
    <>
      {entityFetchMethodPairsArray.map((pair) => {
        const { entity, fetchMethod } = pair;
        const pairKey = `${entity}-${fetchMethod}`;
        if (fetchMethod === "rest") {
          throw new Error("REST fetch method is not supported yet.");
        }
        if (fetchMethod === "gRPC") {
          throw new Error("gRPC fetch method is not supported yet.");
        }
        if (fetchMethod === "websocket") {
          return (
            <Fragment key={pairKey}>
              <WebsocketVisualization
                entity={entity}
                handleRemoveVisualization={() =>
                  handleRemoveVisualization(pairKey)
                }
              />
              {divider}
            </Fragment>
          );
        }
      })}
      <AddDataVisualization
        entities={entities}
        fetchMethods={fetchMethods}
        selectedEntity={selectedEntity}
        setSelectedEntity={setSelectedEntity}
        selectedFetchMethod={selectedFetchMethod}
        setSelectedFetchMethod={setSelectedFetchMethod}
        handleAddVisualization={handleAddVisualization}
        selectedFetchMethodError={selectedFetchMethodError}
      />
    </>
  );
}
