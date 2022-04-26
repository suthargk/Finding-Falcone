const getEligibleVehicles = (selectedPlanet, vehicles) => {
  return vehicles.map((vehicle) => {
    if (selectedPlanet.distance <= vehicle.max_distance) {
      return vehicle;
    }
    return { ...vehicle, disabled: true };
  });
};
const VehicleList = ({
  selectedPlanetsMap,
  destinationId,
  handleSetSelectedPlanet,
  allVehiclesByNoOfTimeUsed,
  setAllVehiclesByNoOfTimeUsed,
  vehicles
}) => {
  const handleOnVehicleSelect = (selectedVehicle) => {
    setAllVehiclesByNoOfTimeUsed((prev) => {
      const selectedVehicleId = selectedVehicle.id;
      const prevSelectedVehicle = selectedPlanetsMap[destinationId]?.vehicle;

      let updatedVehicle = { ...prev };

      if (prevSelectedVehicle?.id) {
        console.log("Remove");
        updatedVehicle = {
          ...updatedVehicle,
          [prevSelectedVehicle?.id]: {
            ...updatedVehicle[prevSelectedVehicle?.id],
            used_nos: Math.max(
              updatedVehicle[prevSelectedVehicle?.id].used_nos - 1,
              0
            )
          }
        };
      }

      if (
        updatedVehicle[selectedVehicleId].used_nos > 0 &&
        updatedVehicle[selectedVehicleId].used_nos <
          updatedVehicle[selectedVehicleId].total_no
      ) {
        updatedVehicle = {
          ...updatedVehicle,
          [selectedVehicleId]: {
            ...updatedVehicle[selectedVehicleId],
            used_nos: updatedVehicle[selectedVehicleId].used_nos + 1
          }
        };

        return updatedVehicle;
      }

      if (updatedVehicle[selectedVehicleId].used_nos === 0) {
        updatedVehicle = {
          ...updatedVehicle,
          [selectedVehicleId]: {
            ...updatedVehicle[selectedVehicleId],
            used_nos: 1
          }
        };
        return updatedVehicle;
      }
    });

    handleSetSelectedPlanet((prev) => {
      return {
        ...prev,
        [destinationId]: {
          ...prev[destinationId],
          vehicle: {
            ...selectedVehicle
          }
        }
      };
    });
  };

  const eligibleVehicles = getEligibleVehicles(
    selectedPlanetsMap[destinationId],
    vehicles
  );

  return (
    <div className="destinations_list-item-box-choices">
      {eligibleVehicles?.map((vehicle) => {
        const v = allVehiclesByNoOfTimeUsed[vehicle.id];

        const noMoreVehicle = vehicle.total_no - v.used_nos === 0;

        return (
          <button className="destinations_list-item-box-choice"
            type="button"
            style={{
              background:
                selectedPlanetsMap[destinationId]?.vehicle?.id === vehicle?.id
                  ? "rgb(96 165 250)"
                  : ""
            }}
            key={vehicle.id}
            disabled={vehicle.disabled || noMoreVehicle}
            onClick={() => handleOnVehicleSelect(vehicle)}
          >
            {vehicle.name} ({vehicle.total_no - v.used_nos})
          </button>
        );
      })}
    </div>
  );
};

export default VehicleList;
