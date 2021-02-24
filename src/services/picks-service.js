import axios from "axios";

export const setPicks = async (data) => {
  const url = "https://fathomless-reaches-08772.herokuapp.com/api/savePicks/";
  const config = { headers: { "Content-Type": "application/json" } };

  try {
    const response = await axios.post(url, data, config);
    return response.data;
  } catch (error) {
    return { error };
  }
};

export const getPicksFromId = async (id) => {
  const url =
    "https://fathomless-reaches-08772.herokuapp.com/api/loadpicks/" + id;
  const config = { headers: { "Content-Type": "application/json" } };

  try {
    const response = await axios.get(url, config);
    return response.data;
  } catch (error) {
    return { error };
  }
};

export const getMovieDataFromIds = async (ids) => {
  const url = "https://fathomless-reaches-08772.herokuapp.com/api/movieData/";
  const body = { ids };
  const config = { headers: { "Content-Type": "application/json" } };

  try {
    const response = await axios.post(url, body, config);
    return response.data;
  } catch (error) {
    return { error };
  }
};
