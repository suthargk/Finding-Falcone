import { v4 as getUniqueId } from "uuid";

export const removeAllSelectedOptions = ({ options, selectedPlanetsMap }) => {
  const optionList = Object.values(options);

  const selectedPlanets = Object.keys(selectedPlanetsMap).reduce((acc, key) => {
    const planetName = selectedPlanetsMap[key]?.value;
    const name = options?.[planetName]?.name;

    if (planetName && name) {
      return [...acc, options?.[selectedPlanetsMap[key].value]?.name];
    }
    return acc;
  }, []);

  return optionList.filter((option) => !selectedPlanets.includes(option.name));
};

export const assignUniqueIds = (list) => {
  return list.map((l) => {
    const id = getUniqueId();

    return {
      ...l,
      id
    };
  });
};

export const fromArrayToHashMap = (array, getKeyValue) => {
  return array.reduce((hashMap, currentValue) => {
    const [key, value] = getKeyValue(currentValue);
    if (!hashMap[value.name]) {
      return {
        ...hashMap,
        [key]: value
      };
    }

    return hashMap;
  }, {});
};

export const doesAllPlanetHaveVehicle = (planetMap) => {
  const planetValues = Object.values(planetMap);
  return planetValues.every((a) => a.vehicle?.id) && planetValues.length >= 4;
};
