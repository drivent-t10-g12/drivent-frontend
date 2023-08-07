import styled from 'styled-components';

export const Message = styled.div`
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
export const Instruction = styled.div`
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
export const Header = styled.div`
  color: #000;
  font-family: 'Roboto';
  font-size: 34px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
`;
export const Container = styled.div`
  display: flex;
  width: ${(props) => props.chosenTicket? '706px' : '320px'};
  gap: 25px;
  padding: ${(props) => props.chosenTicket? '12px' : ''};
`;
export const Price = styled.p`
  color: #898989;
  text-align: center;
  font-family: 'Roboto';
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  margin-top: ${(props) => props.chosenTicket? '8px' : '3px'};
`;
export const Mode = styled.p`
  color: #454545;
  text-align: center;
  font-family: 'Roboto';
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
`;
export const Modality = styled.div`
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
export const Hotel = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 145px;
  height: 145px;
  margin-top: 20px;
  border-radius: 20px;
  border: 1px solid #CECECE;
  background-color: ${(props) => props.color === true? ' #FFEED2' : 'white'};
`;

export const Button = styled.button`
  width: ${props => props.finished? '182px' : '162px'};
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
