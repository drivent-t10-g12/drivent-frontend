import styled from 'styled-components';
import useEnrollment from '../../../hooks/api/useEnrollment';
import { useState, useEffect } from 'react';
import useToken from '../../../hooks/useToken';
import axios from 'axios';
import card from '../../../assets/images/card.png';
import { Button, Container, Header, Hotel, Instruction, Message, Modality, Mode, Price } from './styled.js';

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
  const [price, setPrice] = useState('R$ 100');
  const [onOff, setOnOff] = useState(false);
  const [cardData, setCardData] = useState({ number: '', name: '', valid: '', cvc: '' });

  console.log(ticket);

  function handleModality(modalidade) {
    if (modalidade === 'Presencial') {
      setPresencialSelect(true);
      setOnlineSelect(false);
      setOnOff(true);
    } else if (modalidade === 'Online') {
      setPresencialSelect(false);
      setOnlineSelect(true);
      setOnOff(true);
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

  function handlePrice() {
    withHotel ?
      setPrice('R$ 600') :
      setPrice('R$ 250');
  };

  function inputChange(e) {
    setCardData({ ...cardData, [e.target.name]: e.target.value });
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
    const body = { ticketTypeId: ticket.id };
    axios.post(`${process.env.REACT_APP_API_BASE_URL}/tickets`, body, config)
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
        <Modality chosenTicket={true}>
          Presencial + Com Hotel
          <Price chosenTicket={true}>{price}</Price>
        </Modality>
        <Instruction>
          Pagamento    
        </Instruction>
        <Container chosenTicket={true}>
          <CardArea>
            <img src={card}></img>
            <CardForm>
              <CardInput id='number' placeholder='Card Number'></CardInput>
              <label for='number'>E.g: 49..., 51..., 36..., 37...</label>
              <CardInput placeholder='Name'></CardInput>
              <Container2>
                <Valid placeholder='Valid Thru'></Valid>
                <Cvc placeholder='CVC'></Cvc>
              </Container2>
            </CardForm>
          </CardArea>
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
                <Button onClick={() => {createTicket(); handlePrice();}}><p>RESERVAR INGRESSO</p></Button>
              </> : onOff ? 
                <>
                  <Instruction>Fechado! O total ficou em <p> R$ 100</p>. Agora é só confirmar:</Instruction>
                  <Button onClick={() => createTicket()}><p>RESERVAR INGRESSO</p></Button>
                </> : <></>
            }          
          </>
        }
      </>    
  );
}

const CardArea = styled.div`

  width: 706px;
  height: 225px;
  display: flex;
  align-items: center;
  box-sizing: border-box;
  

`;

const CardForm = styled.form`
  height: 72%;
  margin-left: 25px;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  label {
    color: #cecece
  };

  && ::placeholder{
    color: #9d9d9d;
    font-family: 'Roboto';
    font-size: 19px;
  };
`;

const CardInput = styled.input`
  width: 100%;
  height: 40px;
  border: 1px solid #cecece;
  border-radius: 6px;
  display: flex;
  align-items: center;
  padding: 0px 14px;
  box-sizing: border-box;
  font-size: 14px;
  font-family: 'Roboto';
`;

const Container2 = styled.div`
  display: flex;
  justify-content: space-between;

`;

const Valid = styled.input`
  width: 61%;
  height: 40px;
  border: 1px solid #cecece;
  border-radius: 6px;
  display: flex;
  align-items: center;
  padding: 0px 14px;
  box-sizing: border-box;
  font-size: 14px;
  font-family: 'Roboto';
`;
const Cvc = styled.input`
  width: 38%;
  height: 40px;
  border: 1px solid #cecece;
  border-radius: 6px;
  display: flex;
  align-items: center;
  padding: 0px 14px;
  box-sizing: border-box;
  font-size: 14px;
  font-family: 'Roboto';
`;
