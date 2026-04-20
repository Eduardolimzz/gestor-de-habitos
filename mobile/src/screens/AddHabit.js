import { Alert, TextInput } from 'react-native';
import { useState } from 'react';

import {
  HomeContainer,
  TopSection,
  GreetingText,
  SubtitleText,
  StyledButton,
  ButtonText,
  StyledTextInput,
  Colors,
} from '../components/styles';

import styled from 'styled-components/native';

const { green, darklight, primary, lightBg, black } = Colors;

const FormContainer = styled.View`
  margin-top: 30px;
`;

const Label = styled.Text`
  font-size: 14px;
  color: ${darklight};
  margin-bottom: 8px;
  margin-top: 12px;
`;

const NotesInput = styled.TextInput`
  background-color: ${lightBg};
  padding: 18px;
  border-radius: 14px;
  min-height: 120px;
  text-align-vertical: top;
  color: ${black};
`;

const DaysContainer = styled.View`
  flex-direction: row;
  flex-wrap: wrap;
  margin-top: 10px;
`;

const DayButton = styled.TouchableOpacity`
  width: 44px;
  height: 44px;
  border-radius: 22px;
  background-color: ${(props) =>
    props.selected ? green : primary};
  border: 2px solid ${green};
  align-items: center;
  justify-content: center;
  margin-right: 10px;
  margin-bottom: 10px;
`;

const DayText = styled.Text`
  color: ${(props) => (props.selected ? primary : green)};
  font-weight: bold;
`;

export default function AddHabit() {
  const [habitName, setHabitName] = useState('');
  const [notes, setNotes] = useState('');
  const [selectedDays, setSelectedDays] = useState([]);

  const weekDays = ['S', 'T', 'Q', 'Q', 'S', 'S', 'D'];

  const toggleDay = (index) => {
    if (selectedDays.includes(index)) {
      setSelectedDays(selectedDays.filter((day) => day !== index));
    } else {
      setSelectedDays([...selectedDays, index]);
    }
  };

  const saveHabit = () => {
    if (!habitName.trim()) {
      Alert.alert('Erro', 'Digite o nome do hábito');
      return;
    }

    Alert.alert('Sucesso', 'Hábito criado com sucesso!');

    setHabitName('');
    setNotes('');
    setSelectedDays([]);
  };

  return (
    <HomeContainer>
      <TopSection>
        <GreetingText>Novo Hábito</GreetingText>
        <SubtitleText>Crie uma nova rotina para acompanhar.</SubtitleText>
      </TopSection>

      <FormContainer>
        <Label>Nome do hábito</Label>
        <StyledTextInput
          placeholder="Ex: Beber 2L de água"
          value={habitName}
          onChangeText={setHabitName}
        />

        <Label>Observações</Label>
        <NotesInput
          placeholder="Adicione detalhes sobre esse hábito"
          multiline
          value={notes}
          onChangeText={setNotes}
        />

        <Label>Dias da semana</Label>
        <DaysContainer>
          {weekDays.map((day, index) => (
            <DayButton
              key={index}
              selected={selectedDays.includes(index)}
              onPress={() => toggleDay(index)}
            >
              <DayText selected={selectedDays.includes(index)}>
                {day}
              </DayText>
            </DayButton>
          ))}
        </DaysContainer>

        <StyledButton onPress={saveHabit}>
          <ButtonText>Salvar hábito</ButtonText>
        </StyledButton>
      </FormContainer>
    </HomeContainer>
  );
}