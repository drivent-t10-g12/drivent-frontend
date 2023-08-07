import styled from 'styled-components';
import useBookingByRoomId from '../../../hooks/api/useBooking';
import { FaUserAlt, FaRegUser } from 'react-icons/fa';

export default function Individual({ roomInfo }) {
  const { bookings } = useBookingByRoomId(roomInfo.id);

  let quantidade = [];
  for (let i=0; i < roomInfo.capacity; i++) {
    quantidade.push(i);
  }
  
  return (

    <Container>
      <div>{roomInfo.name}</div>
      <People>{quantidade.map((i) => <FaRegUser></FaRegUser>) }</People>
    </Container>
    
  );
};

const People = styled.div`
  display: flex;
`;

const Container = styled.div `
width:160px;
height: 30px;
display:flex;
flex-direction:row;
justify-content: space-around;
div {
    width:60px
}
`;
