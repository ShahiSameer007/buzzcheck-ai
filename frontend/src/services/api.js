import axios from "axios";

const API = axios.create({
    baseURL: "http://127.0.0.1:8000"
});

export const analyzeNews = async (text) => {

    const response = await API.post("/analyze", {
        text: text
    });

    return response.data;
};