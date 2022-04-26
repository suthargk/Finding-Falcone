import { useEffect, useState } from "react";
import DropDown from "./DropDown";
import VehicleList from "./VehicleList";
import { removeAllSelectedOptions } from "../../utils";

const DestinationItem = ({
  destination,
  planets,
  vehicles,
  setVehicles,
  selectedPlanetsMap,
  handleSetSelectedPlanet,
  allVehiclesByNoOfTimeUsed,
  setAllVehiclesByNoOfTimeUsed,
}) => {
  const destinationId = destination.id;
  const value = selectedPlanetsMap?.[destinationId]?.value || "";

  const options = removeAllSelectedOptions({
    options: planets,
    selectedPlanetsMap,
  });

  const handleOnSelect = (event) => {
    const selectedValue = event.target.value;

    handleSetSelectedPlanet((prev) => {
      const selectedDestination = prev[destination.id];

      if (!selectedValue) {
        delete prev[destination.id];

        return {
          ...prev,
        };
      }

      if (selectedDestination) {
        return {
          ...prev,
          [destination.id]: {
            ...selectedDestination,
            value: selectedValue,
            distance: planets[selectedValue].distance,
          },
        };
      }

      return {
        ...prev,
        [destination.id]: {
          value: selectedValue,
          destinationId: destination.id,
          distance: planets[selectedValue].distance,
        },
      };
    });
  };

  const isPlanetSelected = selectedPlanetsMap[destination.id];
  return (
    <div className="destinations_list-item">
      <div className="destinations_list-item-box">
        <DropDown
          value={value}
          options={options}
          handleOnSelect={handleOnSelect}
          destination={destination}
        />

        {isPlanetSelected ? (
          <VehicleList
            vehicles={vehicles}
            setVehicles={setVehicles}
            destinationId={destinationId}
            selectedPlanetsMap={selectedPlanetsMap}
            allVehiclesByNoOfTimeUsed={allVehiclesByNoOfTimeUsed}
            setAllVehiclesByNoOfTimeUsed={setAllVehiclesByNoOfTimeUsed}
            handleSetSelectedPlanet={handleSetSelectedPlanet}
          />
        ) : null}
      </div>
    </div>
  );
};

export default DestinationItem;
