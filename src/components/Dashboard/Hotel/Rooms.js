import styled from 'styled-components';
import { useEffect, useState } from 'react';
import useRoomsByHotelId from '../../../hooks/api/useRoomsByHotelId';
import Individual from './Individual';
import { makeBooking } from '../../../services/hotelApi';
import useToken from '../../../hooks/useToken';

export default function Room({ hotel }) {
  const token = useToken();
  const { roomsByHotelId } = useRoomsByHotelId(token, hotel.id);
  const [rooms, setRooms] = useState([]);

  useEffect( () => {
    if(roomsByHotelId) {
      setRooms(roomsByHotelId.Rooms);
      console.log(rooms);
    }
  }, [roomsByHotelId]);

  const [room, setRoom] =useState({});

  function Select2(info) {
    setRoom(info);
    console.log(room);
  }

  function handleReserve(id) {
    console.log(token);
    makeBooking(token, id);
  }
  
  return (
    <div>
      <RoomsContainer>{rooms?.map((j) => <Button2 onClick={() => Select2(j)} disabled={room.id === j.id ? true : false} color={j.id === room ? true : false} ><Individual roomInfo={j} text /></Button2>)}</RoomsContainer>
      <ReserveContainer> {room.id !== undefined ? <Reserve onClick={() => handleReserve(room.id)}>RESERVAR QUARTO</Reserve> : ''}</ReserveContainer>
    </div>

  );
};

const RoomsContainer = styled.div `
display: flex;
flex-wrap: wrap;
width: 800px;
justify-content: space-between;
align-items: center;
`;

const Button2= styled.div `
background-color: ${props => props.disabled ? 'lightyellow': props.color ? 'lightyellow' : 'white'};
width:160px;
height: 40px;
border-radius:8px;
margin-top:5px;
padding:5px;
border: solid;
border-color: #CECECE;`;

const ReserveContainer = styled.div `
width:160px;`;

const Reserve = styled.button `
width:160px;
height: 40px;
justify-content:center;
align-items: center;
margin-top: 40px;
border-radius:8px;
border-style:groove;`;

