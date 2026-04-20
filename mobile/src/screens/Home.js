import { FlatList, TouchableOpacity, View, Alert } from "react-native";
import { useState } from "react";
import { useNavigation } from '@react-navigation/native';

import {
  HomeContainer,
  TopSection,
  DateText,
  GreetingText,
  SubtitleText,
  ProgressCard,
  CardTitle,
  ProgressText,
  ProgressBarBackground,
  ProgressBarFill,
  SectionHeader,
  SectionTitle,
  SectionCount,
  HabitItem,
  HabitsContainer,
  HabitText,
  HabitDoneText,
  Checkbox,
  CheckboxChecked,
  CheckMark,
  EmptyText,
  FloatingButton,
  FloatingButtonText,
  ActionsRow,
  HabitInfo
} from "../components/styles";

export default function Home() {
  const userName = "Emanuel";
  const navigation = useNavigation();
  const today = new Date().toLocaleDateString("pt-BR", {
    weekday: "long",
    day: "numeric",
    month: "long"
  });

  const [habits, setHabits] = useState([
    { id: "1", name: "Beber água", done: true },
    { id: "2", name: "Estudar", done: false },
    { id: "3", name: "Treinar", done: false },
    { id: "4", name: "Ler", done: true },
  ]);

  const toggleHabit = (id) => {
    const updated = habits.map((habit) =>
      habit.id === id ? { ...habit, done: !habit.done } : habit
    );
    setHabits(updated);
  };

  const deleteHabit = (id) => {
    const filtered = habits.filter((h) => h.id !== id);
    setHabits(filtered);
  };

  const editHabit = (id) => {
    Alert.alert("Editar", "Função de edição será implementada depois");
  };

  const addHabit = () => {
  navigation.navigate('AddHabit');
};

  const openOptions = (habit) => {
    Alert.alert(habit.name, "Escolha uma opção", [
      {
        text: "Editar",
        onPress: () => editHabit(habit.id),
      },
      {
        text: "Deletar",
        onPress: () => deleteHabit(habit.id),
        style: "destructive",
      },
      {
        text: "Cancelar",
        style: "cancel",
      },
    ]);
  };

  const total = habits.length;
  const feitos = habits.filter((h) => h.done).length;
  const progress = total > 0 ? Math.round((feitos / total) * 100) : 0;

  return (
    <HomeContainer>
      <TopSection>
        <DateText>{today}</DateText>
        <GreetingText>Olá, {userName}</GreetingText>
        <SubtitleText>Vamos cuidar da sua rotina hoje.</SubtitleText>
      </TopSection>

      <ProgressCard>
        <CardTitle>Progresso de hoje</CardTitle>
        <ProgressText>{feitos} de {total} concluídos • {progress}%</ProgressText>

        <ProgressBarBackground>
          <ProgressBarFill style={{ width: `${progress}%` }} />
        </ProgressBarBackground>
      </ProgressCard>

      <SectionHeader>
        <SectionTitle>Seus hábitos</SectionTitle>
        <SectionCount>{total}</SectionCount>
      </SectionHeader>

      <HabitsContainer>
        <FlatList
          data={habits}
          keyExtractor={(item) => item.id}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{
            paddingBottom: 120,
          }}
          ListEmptyComponent={<EmptyText>Nenhum hábito cadastrado ainda.</EmptyText>}
          renderItem={({ item }) => (
            <HabitItem>
              <HabitInfo>
                {item.done ? (
                  <HabitDoneText>{item.name}</HabitDoneText>
                ) : (
                  <HabitText>{item.name}</HabitText>
                )}
              </HabitInfo>

              <ActionsRow>
                <TouchableOpacity
                  onPress={() => toggleHabit(item.id)}
                  style={{ marginRight: 14 }}
                >
                  {item.done ? (
                    <CheckboxChecked>
                      <CheckMark>✓</CheckMark>
                    </CheckboxChecked>
                  ) : (
                    <Checkbox />
                  )}
                </TouchableOpacity>

                <TouchableOpacity
                  onPress={() => openOptions(item)}
                  style={{ paddingHorizontal: 4, paddingVertical: 2 }}
                >
                  <HabitText style={{ fontSize: 22 }}>⋮</HabitText>
                </TouchableOpacity>
              </ActionsRow>
            </HabitItem>
          )}
        />
      </HabitsContainer>

      <FloatingButton onPress={addHabit} activeOpacity={0.8}>
        <FloatingButtonText>+</FloatingButtonText>
      </FloatingButton>
    </HomeContainer>
  );
}