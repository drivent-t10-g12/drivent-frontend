import styled from 'styled-components';
import useEnrollment from '../../../hooks/api/useEnrollment';
import { useState, useEffect } from 'react';
import useToken from '../../../hooks/useToken';
import axios from 'axios';

export default function Payment() {
  const { enrollment } = useEnrollment();
  const token = useToken();
  const [ presencialSelect, setPresencialSelect] = useState(false);
  const [ onlineSelect, setOnlineSelect] = useState(false);
  const [withHotel, setWithHotel] = useState(false);
  const [withoutHotel, setWithoutHotel] = useState(false);
  const [tickets, setTickets] = useState([]);
  const [ticket, setTicket] = useState({});
  const [reserve, setReserve] = useState(false);
  const [chosenTicket, setChosenTicket]  = useState(true);

  console.log(ticket);

  function handleModality(modalidade) {
    if (modalidade === 'Presencial') {
      setPresencialSelect(true);
      setOnlineSelect(false);
    } else if (modalidade === 'Online') {
      setPresencialSelect(false);
      setOnlineSelect(true);
    };
  };
  function handleAccommodation(hospedagem) {
    if(hospedagem === 'Sem Hotel') {
      setWithoutHotel(true);
      setWithHotel(false);
    } else if (hospedagem === 'Com Hotel') {
      setWithoutHotel(false);
      setWithHotel(true);
    };
  };

  useEffect(() => {
    const config = {
      headers: { authorization: `Bearer ${token}` }
    };
    axios.get(`${process.env.REACT_APP_API_BASE_URL}/tickets/types`, config)
      .then((res) => setTickets(res.data))
      .catch((err) => console.log(err.responde.data));
  }, [token]);

  function createTicket() {
    if(presencialSelect && withHotel) {
      const ticket = tickets.find((type) => type.isRemote === false && type.includesHotel === true);
      setTicket(ticket);
    } else if (presencialSelect && !withHotel) {
      const ticket = tickets.find((type) => type.isRemote === false && type.includesHotel === false);
      setTicket(ticket);
    } else {
      const ticket = tickets.find((type) => type.isRemote === true);
      setTicket(ticket);
    }
    setReserve(true);
  };

  if(reserve === true) {
    const config = {
      headers: { authorization: `Bearer ${token}` }
    };
    const ticketTypeId = ticket.id;
    axios.post(`${process.env.REACT_APP_API_BASE_URL}/tickets`, ticketTypeId, config)
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
  }

  return (
    reserve? 
      <>
        <Header>
          Ingresso e pagamento
        </Header> 
        <Instruction>
          Ingresso escolhido    
        </Instruction>
        <Modality chosenTicket={chosenTicket}>
          Presencial + Com Hotel
          <Price chosenTicket={chosenTicket}>R$ 250</Price>
        </Modality>
        <Instruction>
          Pagamento    
        </Instruction>
        <Container chosenTicket={chosenTicket}>
          Colocar o imagem do Cartão + Inputs
        </Container>
      </>     
      :
      <>
        <Header>
            Ingresso e pagamento
        </Header>
        {!enrollment ? (
          <>
            <Message>
              Você precisa completar sua inscrição antes<br/> de prosseguir pra escolha de ingresso
            </Message>
          </>
        ) : 
          <>
            <Instruction>Primeiro, escolha sua modalidade de ingresso</Instruction>
            <Container>
              <Modality onClick={() => handleModality('Presencial')} color={presencialSelect}>
                <Mode>Presencial</Mode>
                <Price>R$ 250</Price>
              </Modality>
              <Modality onClick={() => handleModality('Online')} color={onlineSelect}>
                <Mode>Online</Mode>
                <Price>R$ 100</Price>
              </Modality>
            </Container>
            { presencialSelect ? 
              <>
                <Instruction>Ótimo! Agora escolha sua modalidade de hospedagem</Instruction>
                <Container>
                  <Hotel onClick={() => handleAccommodation('Sem Hotel')} color={withoutHotel}>
                    <Mode>Sem Hotel</Mode>
                    <Price>+ R$ 0</Price>
                  </Hotel>
                  <Hotel onClick={() => handleAccommodation('Com Hotel')} color={withHotel}>
                    <Mode>Com Hotel</Mode>
                    <Price>+ R$ 350</Price>
                  </Hotel>
                </Container>          
                <Instruction>Fechado! O total ficou em <p> {withHotel? 'R$ 600' : 'R$ 250'}</p>. Agora é só confirmar:</Instruction>
                <Button onClick={() => createTicket()}><p>RESERVAR INGRESSO</p></Button>
              </> : <>
                <Instruction>Fechado! O total ficou em <p> R$ 100</p>. Agora é só confirmar:</Instruction>
                <Button onClick={() => createTicket()}><p>RESERVAR INGRESSO</p></Button>
              </>
            }          
          </>
        }
      </>    
  );
}

const Message = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 93%;
  color: #8E8E8E;
  text-align: center;
  font-family: 'Roboto';
  font-size: 20px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
`;
const Instruction = styled.div`
  display: flex;
  width: 100%;
  color: #8E8E8E;
  text-align: center;
  margin-top: 25px;
  font-family: 'Roboto';
  font-size: 20px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  p {
    font-weight: bold;
    margin-left: 6px;
  }
`;
const Header = styled.div`
  color: #000;
  font-family: 'Roboto';
  font-size: 34px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
`;
const Container = styled.div`
  display: flex;
  width: ${(props) => props.chosenTicket? '706px' : '320px'};
  gap: 25px;
  padding: ${(props) => props.chosenTicket? '12px' : ''};
  border: ${(props) => props.chosenTicket? '1px solid black' : ''};
`;
const Price = styled.p`
  color: #898989;
  text-align: center;
  font-family: 'Roboto';
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  margin-top: ${(props) => props.chosenTicket? '8px' : '3px'};
`;
const Mode = styled.p`
  color: #454545;
  text-align: center;
  font-family: 'Roboto';
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
`;
const Modality = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: ${(props) => props.chosenTicket? '300px' : '145px' };
  height: ${(props) => props.chosenTicket? '108px' : '145px' };
  margin-top: 20px;
  border-radius: 20px;
  border: 1px solid #CECECE;
  background-color: ${(props) => props.color === true? ' #FFEED2' : 'white'};
  background: ${(props) => props.chosenTicket? '#FFEED2' : ''};
`;
const Hotel = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 145px;
  height: 145px;
  border-radius: 20px;
  border: 1px solid #CECECE;
  background-color: ${(props) => props.color === true? ' #FFEED2' : 'white'};
`;

const Button = styled.button`
  width: 162px;
  height: 37px;
  padding: 10px;
  margin-top: 20px;
  border-radius: 4px;
  background: #E0E0E0;
  border: none;
  :hover {
    cursor: pointer;
  }
  p {
    color: #000;
    text-align: center;
    font-family: Roboto;
    font-size: 14px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
  }  
`;
