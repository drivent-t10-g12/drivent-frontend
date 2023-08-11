import styled from 'styled-components';
import { Instruction } from '../Payment/styled';
import { useState } from 'react';

export default function ActivityDay() {
  const [selectedButton, setSelectedButton] = useState();

  function handleButtonClick(buttonIndex) {
    setSelectedButton(buttonIndex);
  };

  return (
    <>
      <Instruction>Primeiro, filtre pelo dia do evento: </Instruction>
      <Container>
        {/* passar isso num map */}
        <Button 
          onClick={() => handleButtonClick(0)} 
          selected={0} 
          selectedButton={selectedButton}>Sexta, 22/10
        </Button>
        <Button 
          onClick={() => handleButtonClick(1)} 
          selected={1} 
          selectedButton={selectedButton}>Sábado, 23/10
        </Button>
        <Button 
          onClick={() => handleButtonClick(2)} 
          selected={2} 
          selectedButton={selectedButton}>Domingo, 24/10
        </Button>
      </Container>
      <Container>
        <Section>
          <p>Auditório Principal</p>
          <p>Auditório Lateral</p>
          <p>Sala de Workshop</p>
        </Section>
      </Container>
    </>
  );
};

const Container = styled.div`
  display: flex;
  gap: 20px;
  margin: 0px 0 70px 0;
`;

const Section = styled.div`
  display: flex;
  justify-content: space-around;
  width: 100%;
  p {
    color: #7B7B7B;
    text-align: center;
    font-family: 'Roboto';
    font-size: 17px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
  }
`;

const Button = styled.button`
  width: 131px;
  height: 37px;
  font-family: 'Roboto';
  padding: 10px;
  margin-top: 20px;
  border-radius: 4px;
  background: #E0E0E0;
  border: none;
  border-radius: 4px;
  background-color: ${(props) => props.selected === props.selectedButton ? '#FFD37D' : '#E0E0E0'};
  box-shadow: 0px 2px 10px 0px rgba(0, 0, 0, 0.25);
  :hover {
    cursor: pointer;
  }
`;
