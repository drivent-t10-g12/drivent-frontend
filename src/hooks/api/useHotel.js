import * as hotelApi from '../../services/hotelApi';
import useToken from '../useToken';
import useAsync from '../useAsync';

export default function useHotel() {
  const token= useToken();

  const {
    data: hotels,
    loading: hotelLoading,
    error: hotelError,
    act: getHotels
  } = useAsync(() => hotelApi.getHotels(token));

  return {
    hotels,
    hotelLoading,
    hotelError,
    getHotels
  };
}
