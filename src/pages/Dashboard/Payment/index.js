import styled from 'styled-components';
import useEnrollment from '../../../hooks/api/useEnrollment';
import { useState, useEffect } from 'react';
import useToken from '../../../hooks/useToken';
import axios from 'axios';
import check from '../../../assets/images/akar-icons_circle-check-fill.png';
import { Button, Container, Header, Hotel, Instruction, Modality, Mode, Price } from './styled.js';
import NoEnrollment from './NoEnrollment';
import CreditCard from './CreditCard';

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
          <Price chosenTicket={true}>{price}</Price>
        </Modality>
        <Instruction>
          Pagamento    
        </Instruction>
        {!paid? 
          <CreditCard setPaid={setPaid} ticketId={ticketId}/>
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
      </>     
      :
      <>
        <Header>
            Ingresso e pagamento
        </Header>
        {!enrollment ? (
          <NoEnrollment/>
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
`;
