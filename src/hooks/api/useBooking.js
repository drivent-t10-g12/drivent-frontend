import * as hotelApi from '../../services/hotelApi';
import useToken from '../useToken';
import useAsync from '../useAsync';

export default function useBooking() {
  const token= useToken();

  const {
    data: bookings,
    loading: bookingLoading,
    error: bookingError,
    act: getBooking
  } = useAsync(() => hotelApi.getBooking(token));

  return {
    bookings,
    bookingLoading,
    bookingError,
    getBooking
  };
}
