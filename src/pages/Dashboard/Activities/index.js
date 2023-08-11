import { Header } from '../Payment/styled';
import NoPayment from './NoPayment';
import ActivityDay from './ActivityDay';
import Online from './Online';

export default function Activities() {
  const payment = true;
  const online = false;
  return (
    <>
      <Header>Escolha de atividades</Header>
      { payment?  online ? <Online/> : <ActivityDay/> : <NoPayment/> }
    </>
  );
};
