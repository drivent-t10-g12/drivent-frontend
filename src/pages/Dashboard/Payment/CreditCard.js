import axios from 'axios';
import { useState } from 'react';
import useToken from '../../../hooks/useToken';
import styled from 'styled-components';
import { Button } from './styled';
import card from '../../../assets/images/card.png';

export default function CreditCard(props) {
  const { setPaid, ticketId } = props;
  const [cardData, setCardData] = useState({ number: '', name: '', valid: '', cvc: '' });
  const token = useToken();

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

  return (
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
  );
};

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
const NaoPago = styled.div`
  @media (max-width: 850px) {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    margin-bottom: 15px;
  }
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

