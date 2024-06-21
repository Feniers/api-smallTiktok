import api from "./api";

export async function getInfo() {
  try {
    const response = await api.get("/getInfo");
    return response.data;
  } catch (error) {
    console.error("Error fetching info:", error);
    throw error;
  }
}
