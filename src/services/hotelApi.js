import api from './api';

export async function getHotels(token) {
  const response = await api.get('/hotels', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  
  console.log(response.data);
  return response.data;
};

export async function getRoomsByHotelId(token, hotelId) {
  const response = await api.get(`/hotels/${hotelId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    }, 
  });
  return response.data;
};

export async function getBooking(token) {
  const response = await api.get('/booking/', {
    headers: {
      Authorization: `Bearer ${token}`,
    }, 
  });
  
  return response.data;
};

export async function makeBooking(token, roomId) {
  const response = await api.post('/booking/', { roomId }, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  console.log(response.data);
  return response.data;
}
