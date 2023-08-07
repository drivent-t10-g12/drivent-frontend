import styled from 'styled-components';
import useEnrollment from '../../../hooks/api/useEnrollment';
import { useState, useEffect } from 'react';
import useToken from '../../../hooks/useToken';
import axios from 'axios';
import card from '../../../assets/images/card.png';
import check from '../../../assets/images/akar-icons_circle-check-fill.png';
import { Button, Container, Header, Hotel, Instruction, Message, Modality, Mode, Price } from './styled.js';

export default function Payment() {
  const { enrollment } = useEnrollment();
  const token = useToken();
  const [ presencialSelect, setPresencialSelect] = useState(false);
  const [ onlineSelect, setOnlineSelect] = useState(false);
  const [withHotel, setWithHotel] = useState(false);
  const [withoutHotel, setWithoutHotel] = useState(false);
  const [tickets, setTickets] = useState([]);
  const [ticketType, setTicketType] = useState({});
  const [reserve, setReserve] = useState(false);
  const [price, setPrice] = useState('R$ 100');
  const [onOff, setOnOff] = useState(false);
  const [cardData, setCardData] = useState({ number: '', name: '', valid: '', cvc: '' });
  const [ticketId, setTicketId] = useState();
  const [paid, setPaid] = useState(false);

  console.log(ticketId);

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

  function handleSubmit(event) {
    event.preventDefault();
    const config = {
      headers: { authorization: `Bearer ${token}` }
    };
    const formData = {
      issuer: cardData.name,
      number: cardData.number,
      name: cardData.name,
      expirationDate: cardData.valid,
      cvc: cardData.cvc,
    };
    axios.post(`${process.env.REACT_APP_API_BASE_URL}/payments/process`, { cardData: formData, ticketId: ticketId }, config)
      .then((res) => setPaid(true))
      .catch((err) => console.log(err));
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
      setTicketType(ticket);
    } else if (presencialSelect && !withHotel) {
      const ticket = tickets.find((type) => type.isRemote === false && type.includesHotel === false);
      setTicketType(ticket);
    } else {
      const ticket = tickets.find((type) => type.isRemote === true);
      setTicketType(ticket);
    }
    setReserve(true);
  };

  useEffect(() => {
    if(reserve === true) {
      const config = {
        headers: { authorization: `Bearer ${token}` }
      };
      const body = { ticketTypeId: ticketType.id };
      axios.post(`${process.env.REACT_APP_API_BASE_URL}/tickets`, body, config)
        .then((res) => setTicketId(res.data.id))
        .catch((err) => console.log(err));
    };
  }, [reserve]);

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
          {presencialSelect?  (withHotel? 'Presencial + Hotel': 'Presencial'): 'Online'}
          Presencial + Com Hotel
          <Price chosenTicket={true}>{price}</Price>
        </Modality>
        <Instruction>
          Pagamento    
        </Instruction>
        {!paid? 
          <NaoPago>
            <CardArea>
              <img src={card}></img>
              <CardForm onSubmit={handleSubmit} id='form'>
                <CardInput
                  id="number"
                  placeholder="Card Number"
                  name="number"
                  onChange={inputChange}
                  value={cardData.number}
                ></CardInput>
                <label htmlFor="number">E.g: 49..., 51..., 36..., 37...</label>
                <CardInput
                  placeholder="Name"
                  name="name"
                  onChange={inputChange}
                  value={cardData.name}
                ></CardInput>
                <Container2>
                  <Valid
                    placeholder="Valid Thru"
                    name="valid"
                    onChange={inputChange}
                    value={cardData.valid}
                  ></Valid>
                  <Cvc
                    placeholder="CVC"
                    name="cvc"
                    onChange={inputChange}
                    value={cardData.cvc}
                  ></Cvc>
                </Container2>
              </CardForm>
            </CardArea>
            <Button form='form' type='submit' finished={true}>FINALIZAR PAGAMENTO</Button>
          </NaoPago>
          : <Pago>
            <img src={check}/>
            <div>
              <Confirmado>
                Pagamento confirmado!             
              </Confirmado>
              <p>
                Prossiga para escolha de hospedagem e atividades
              </p>
            </div>
          </Pago>
        }
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
  display: flex;
  align-items: center;
  box-sizing: border-box;
  gap: 30px;
  @media (max-width: 850px) {
    flex-direction: column;
    align-items: flex-start;
    gap: 10px;
  }

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
  justify-content: space-between
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
  margin: 10px 0;
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

const NaoPago = styled.div`
  @media (max-width: 850px) {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    margin-bottom: 15px;
  }
`;
const Pago = styled.div`
  display: flex;
  align-items: center;
  margin-top: 15px;
  gap: 15px;
  P {
    line-height: 20px;
  }
`;

const Confirmado = styled.p`
  font-weight: bold;

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
