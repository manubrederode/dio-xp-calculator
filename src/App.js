import Input from "./components/Input";
import Button from "./components/Button";

import { Container, Content, Row} from './styles';
import { useState } from 'react';

const App = () => {
  const [currentNumber, setCurrentNumber] = useState('0');
  const [firstNumber, setFirstNumber] = useState(null);
  const [operation, setOperation] = useState(null);
  const [history, setHistory] = useState('');

  // Limpa o visor e reinicia as variáveis
  const handleOnClear = () => {
    setCurrentNumber('0');
    setFirstNumber(null);
    setOperation(null);
    setHistory('');
  };

  // Adiciona número ao visor, removendo o zero inicial
  const handleAddNumber = (num) => {
    setCurrentNumber((prev) =>
      prev === '0' ? String(num) : prev + String(num)
    );
  };

   // Função para definir a operação
   const handleSetOperation = (op) => {
    if (firstNumber === null) {
      setFirstNumber(currentNumber);
      setCurrentNumber('0');
    } else {
      handleEquals();
    }
    setOperation(op);
    setHistory(`${currentNumber} ${op}`); // Atualiza o histórico com o número e a operação
  };

  // Função que realiza o cálculo
  const handleEquals = () => {
    if (firstNumber !== null && operation !== null) {
      const secondNumber = currentNumber;
      let result;

      switch (operation) {
        case '+':
          result = Number(firstNumber) + Number(secondNumber);
          break;
        case '-':
          result = Number(firstNumber) - Number(secondNumber);
          break;
        case '*':
          result = Number(firstNumber) * Number(secondNumber);
          break;
        case '/':
          result = Number(firstNumber) / Number(secondNumber);
          break;
        default:
          return;
      }

      setCurrentNumber(String(result));
      setHistory('');
      setFirstNumber(null); // Reseta o número
      setOperation(null); // Reseta a operação
    }
  };

  return (
    <Container>
      <Content>
      <Input value={history + ' ' + currentNumber} /> {/* Mostra o histórico e o número atual */}
      <Row>
          <Button label="C" onClick={handleOnClear} />
          <Button label="+" onClick={() => handleSetOperation('+')} />
          
        </Row>
        <Row>
          <Button label="7" onClick={() => handleAddNumber(7)} />
          <Button label="8" onClick={() => handleAddNumber(8)} />
          <Button label="9" onClick={() => handleAddNumber(9)} />
          <Button label="-" onClick={() => handleSetOperation('-')} />
        </Row>
        <Row>
          <Button label="4" onClick={() => handleAddNumber(4)} />
          <Button label="5" onClick={() => handleAddNumber(5)} />
          <Button label="6" onClick={() => handleAddNumber(6)} />
          <Button label="*" onClick={() => handleSetOperation('*')} />

        </Row>
        <Row>
          <Button label="1" onClick={() => handleAddNumber(1)} />
          <Button label="2" onClick={() => handleAddNumber(2)} />
          <Button label="3" onClick={() => handleAddNumber(3)} />
          <Button label="/" onClick={() => handleSetOperation('/')} />
        </Row>
        <Row>
          <Button label="0" onClick={() => handleAddNumber(0)} />
          <Button label="=" onClick={handleEquals} />
        </Row>
      </Content>
    </Container>
  );
};

export default App;
