import apiClient from "./client";

export const getPhones = async () => {
    try {
        const response = await apiClient.get("/telephones");
        return response.data;
    } catch (error) {
        console.error("Hiba történt a telefonok lekérésekor!", error);
        throw error;
    }
}