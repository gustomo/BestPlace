import axios from 'axios';

const API_URL = 'https://683a6d8443bb370a8672ac42.mockapi.io/api/blog';

export const getPlaces = () => axios.get(API_URL);
export const addPlace = (data) => axios.post(API_URL, data);
export const updatePlace = (id, data) => axios.put(`${API_URL}/${id}`, data);
export const deletePlace = (id) => axios.delete(`${API_URL}/${id}`);
