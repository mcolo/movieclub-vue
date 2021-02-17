import axios from "axios";

export const getSearchResults = async (searchTerm) => {
  // fetch("https://fathomless-reaches-08772.herokuapp.com/api/search/", {
  //   method: "POST",
  //   mode: "cors",
  //   headers: {
  //     "Content-Type": "application/json",
  //   },
  //   body: JSON.stringify({ prefix: term }),
  // })
  //   .then((res) => res.json())
  //   .then((data) => data.movieData)
  //   .catch((err) => console.log(err));
  const url = "https://fathomless-reaches-08772.herokuapp.com/api/search/";
  const body = { prefix: searchTerm };
  const config = { headers: { "Content-Type": "application/json" } };

  try {
    const response = await axios.post(url, body, config);
    console.log(response.data);
    return response.data;
  } catch (error) {
    return { error };
  }
};
