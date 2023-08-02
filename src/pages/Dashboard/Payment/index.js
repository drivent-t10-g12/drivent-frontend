
import styled from 'styled-components';
import useEnrollment from '../../../hooks/api/useEnrollment';
import { useState, useEffect } from 'react';

export default function Payment() {
  const { enrollment } = useEnrollment();
  const [ data, setData] = useState(<></>);

  useEffect(() => {
    console.log(enrollment);
  }, [enrollment]);

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
      ) : ''}
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
  font-family: Roboto;
  font-size: 20px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
`;

const Header = styled.div`
  color: #000;
  font-family: Roboto;
  font-size: 34px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
`;
