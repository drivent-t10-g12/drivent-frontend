import styled from 'styled-components';
import { Instruction } from '../Payment/styled';

export default function ActivityDay() {
  return (
    <>
      <Instruction>Primeiro, filtre pelo dia do evento: </Instruction>
      <Container>
        <Button>Sexta, 22/10</Button>
        <Button>Sábado, 23/10</Button>
        <Button>Domingo, 24/10</Button>
      </Container>
    </>
  );
};

const Container = styled.div`
  display: flex;
  gap: 20px;
`;

const Button = styled.button`
  width: 131px;
  height: 37px;
  padding: 10px;
  margin-top: 20px;
  border-radius: 4px;
  background: #E0E0E0;
  border: none;
  border-radius: 4px;
  background: #E0E0E0;
  box-shadow: 0px 2px 10px 0px rgba(0, 0, 0, 0.25);
  :hover {
    cursor: pointer;
  }
  p {
    color: #000;
    text-align: center;
    font-family: 'Roboto';
    font-size: 14px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
  }  
`;
