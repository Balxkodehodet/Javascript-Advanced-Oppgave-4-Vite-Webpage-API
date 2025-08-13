import axios from "axios";

export default async function getData(url) {
  try {
    const response = await axios.get(url);
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.log(error.message);
  }
}
