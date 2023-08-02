
import styled from 'styled-components';
import useEnrollment from '../../../hooks/api/useEnrollment';
import { useState, useEffect } from 'react';
// import axios from 'axios';

export default function Payment() {
  const { enrollment } = useEnrollment();
  const [ presencialSelect, setPresencialSelect] = useState(false);
  const [ onlineSelect, setOnlineSelect] = useState(false);

  console.log(onlineSelect);
  console.log(presencialSelect);

  function handleModality(modalidade) {
    if (modalidade === 'Presencial') {
      setPresencialSelect(true);
      setOnlineSelect(false);
    } else if (modalidade === 'Online') {
      setPresencialSelect(false);
      setOnlineSelect(true);
    }
  };

  // useEffect(() => {
  //   const config = {
  //     header: {
  //       Authorization: {}
  //     }
  //   }
  //   axios.get()
  // }, [enrollment]);

  return (
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
  margin-top: 40px;
  font-family: 'Roboto';
  font-size: 20px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
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
  width: 320px;
  gap: 25px;
  margin-top: 20px;
`;
const Price = styled.p`
  color: #898989;
  text-align: center;
  font-family: 'Roboto';
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
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
  width: 145px;
  height: 145px;
  border-radius: 20px;
  border: 1px solid #CECECE;
  background-color: ${(props) => props.color === true? ' #FFEED2' : 'white'};
`;
