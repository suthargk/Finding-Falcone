import { useEffect, useState, useRef } from "react";
import DestinationItem from "./DestinationItem";
import {
  assignUniqueIds,
  fromArrayToHashMap,
  doesAllPlanetHaveVehicle,
} from "../../utils";

import { getPlanets, getVehicles } from "../../apis";

const DestinationList = ({ destinations, dispatchResult }) => {
  const tokenRef = useRef(null);
  const [planets, setPlanets] = useState({});
  const [selectedPlanetsMap, setSelectedPlanetsMap] = useState({});
  const [allVehiclesByNoOfTimeUsed, setAllVehiclesByNoOfTimeUsed] = useState(
    {}
  );
  const [vehicles, setVehicles] = useState([]);

  useEffect(() => {
    fetchVehicles();
    fetch("https://findfalcone.herokuapp.com/token", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        return res.json();
      })
      .then((result) => {
        tokenRef.current = result.token;
      });
  }, []);

  const fetchVehicles = async () => {
    const vehicles = await getVehicles();
    const vehicleWithId = assignUniqueIds(vehicles);

    setVehicles(vehicleWithId);
    setAllVehiclesByNoOfTimeUsed(
      fromArrayToHashMap(vehicleWithId, (v) => [v.id, { ...v, used_nos: 0 }])
    );
  };

  const fetchPlanets = async () => {
    const planets = await getPlanets();

    const planetHashMap = fromArrayToHashMap(
      assignUniqueIds(planets),
      (planet) => [planet.name, planet]
    );

    setPlanets(planetHashMap);
  };

  useEffect(() => {
    fetchPlanets();
  }, []);

  const handleOnFind = () => {
    dispatchResult({ type: "FETCH_INIT" });

    const payload = Object.values(selectedPlanetsMap).reduce(
      (acc, val) => {
        return {
          ...acc,
          vehicle_names: acc.vehicle_names.concat(val?.vehicle?.name),
          planet_names: acc.planet_names.concat(val?.value),
        };
      },
      { vehicle_names: [], token: tokenRef.current, planet_names: [] }
    );

    const requestOptions = {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    };

    fetch(`https://findfalcone.herokuapp.com/find`, requestOptions)
      .then((response) => response.json())
      .then((result) => {
        dispatchResult({
          type: "FETCH_SUCCESS",
          payload: result,
        });
      })
      .catch(() => {
        dispatchResult({
          type: "FETCH_FAILURE",
        });
      });
  };

  return (
    <div className="game">
      <div className="destinations_list">
        {destinations.map((destination) => (
          <DestinationItem
            key={destination.id}
            destination={destination}
            planets={planets}
            vehicles={vehicles}
            setVehicles={setVehicles}
            selectedPlanetsMap={selectedPlanetsMap}
            handleSetSelectedPlanet={setSelectedPlanetsMap}
            allVehiclesByNoOfTimeUsed={allVehiclesByNoOfTimeUsed}
            setAllVehiclesByNoOfTimeUsed={setAllVehiclesByNoOfTimeUsed}
          />
        ))}
      </div>
      {doesAllPlanetHaveVehicle(selectedPlanetsMap) && (
        <button className="find-falcone-button" onClick={handleOnFind}>Find It</button>
      )}
    </div>
  );
};

export default DestinationList;
