import styled from 'styled-components';
import useRoomsByHotelId from '../../../hooks/api/useRoomsByHotelId';
import useToken from '../../../hooks/useToken';

export default function HotelCard({ hotelInfo }, { selected }) {
  const token = useToken();
  let available=0;
  if(hotelInfo.id) {
    const { roomsByHotelId } = useRoomsByHotelId(token, hotelInfo.id);
    for (let i = 0; i < roomsByHotelId?.Rooms.length; i++) {
      const room = roomsByHotelId.Rooms[i];
      available += room.capacity;
    };
  }

  return (
    <Container selected={selected}>
      <HotelImage src={hotelInfo.image} alt={hotelInfo.name}/>
      <HotelName>{hotelInfo.name}</HotelName>
      <Type>Tipo de Acomodação: 
        <div>Single, Double e Triple</div>
      </Type>
      <Available>Vagas disponíveis: <div>{available}</div>
      </Available>
    </Container>
  );
}

const Container = styled.div `
display: flex;
flex-direction:column;
//background-color: ${props => props.selected ? '#FFEED2' : '#EBEBEB'};
justify-content:space-evenly;
align-items: center;
height: 264px;
width:196px;
border-radius: 8px;
border: 0px;
//border-color: ${props => props.selected ? '#FFEED2' : '#EBEBEB'};
`;

const HotelName= styled.div `
height: 15px;
font-size: 22px;
font-weight:700;
`;

const Available= styled.div `
font-weight:700;
margin-bottom:5px;
height: 10px;
div {
  margin-top:5px;
  font-weight:400;
  height: 7px;
};
`;

const HotelImage= styled.img `
width:180px;
height:100px;
border-radius: 5px;
margin-bottom:-15px;`;

const Type= styled.div `
font-weight:700;
margin-bottom:5px;
height: 10px;
div {
  margin-top:5px;
  font-weight:400;
  height: 7px;
};
`;
