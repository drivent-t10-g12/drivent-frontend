import { useState } from 'react';
import { Header } from '../Payment/styled';
import NoPayment from './NoPayment';
import ActivityDay from './ActivityDay';

export default function Activities() {
  const [payment, setPayment] = useState(false);

  return (
    <>
      <Header>Escolha de atividades</Header>
      { payment? <NoPayment/>: <ActivityDay/> }
    </>
  );
}
