import { useState, useEffect } from 'react';
import styled from 'styled-components';
import useHotel from '../../../hooks/api/useHotel';
import HotelCard from '../../../components/Dashboard/Hotel/HotelCard';
import Room from '../../../components/Dashboard/Hotel/Rooms';
import useBookingByRoomId from '../../../hooks/api/useBooking';
import { getBookingsByRoomId } from '../../../services/hotelApi';

export default function Hotel() {
  const [hoteis, setHoteis] = useState([]);
  const { hotels } = useHotel();
  const [selectedHotelId, setSelectedHotelId] = useState(0);
  const [selectedHotel, setSelectedHotel]= useState({});
  const [exists, setExists] = useState(true);

  useEffect( () => {
    if(hotels) {
      setHoteis(hotels);
    }
  }, [hotels, selectedHotelId]);

  //setExists(getBookingsByRoomId(token));

  const [buttons, setButtons]= useState('');

  function handleClick(info) {
    setButtons(info.name);
    setSelectedHotelId(info.id);
    setSelectedHotel(info);
  }

  return (
    (exists) ? (
      <div>
        <Title >Escolha de hotel e quarto</Title>
        <ChooseHotel>Primeiro escolha seu hotel!</ChooseHotel>         
        <HotelsContainer>
          {hoteis[0]
            ? hoteis.map((i) => (
              <Button
                onClick={() => handleClick(i)}
                name={i.name}
                disabled={i.name === buttons ? true : false}
                selected={ i.id === selectedHotelId ? true : false }
              >
                <HotelCard hotelInfo={i} selected={i.id === selectedHotelId ? true : false} />
              </Button>
            ))
            : ''}
        </HotelsContainer>
        <RoomsContainer>{selectedHotelId !== 0 ? <Room hotel={selectedHotel} /> : ''}</RoomsContainer>
      </div>
    ) : (
      <div>
        <Title>Escolha de hotel e quarto</Title>
      </div>
    )
  );
}

const Title = styled.h4`
  font-family: 'Roboto';
  font-size: 34px;
  margin-bottom: 20px;
`;

const ChooseHotel = styled.div `
height: 50px;
color: #8E8E8E;`;

const HotelsContainer = styled.div `
display:flex;
flex-direction:row;
align-items: center;
justify-content: space-evenly;
height: 320px;
margin-top:20px;
overflow-x: scroll;`;

const Button= styled.button `
outline: none;
height: 270px;
width:210px;
z-index:4;
background-color: ${props => props.selected ? '#FFEED2' : '#EBEBEB'};
border-radius: 8px;`;

const RoomsContainer = styled.div `
width: 800px;
margin-top: 40px;
display: flex;
justify-content: center;
`;
