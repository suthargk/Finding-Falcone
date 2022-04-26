const BASE_URL = "https://findfalcone.herokuapp.com";

export const getPlanets = async () => {
  const response = await fetch(`${BASE_URL}/planets`);
  return response.json();
};

export const getVehicles = async () => {
  const response = await fetch(`${BASE_URL}/vehicles`);
  return response.json();
};
