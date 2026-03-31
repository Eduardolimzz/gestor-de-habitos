import { FlatList, TouchableOpacity, View, Alert } from "react-native";
import { useState } from "react";

import {
  HomeContainer,
  TopSection,
  DateText,
  GreetingText,
  ProgressCard,
  CardTitle,
  ProgressText,
  SectionTitle,
  HabitItem,
  HabitsContainer,
  HabitText,
  HabitDoneText,
  Checkbox,
  CheckboxChecked,
  CheckMark
} from "../components/styles";

export default function Home() {

  const userName = "Emanuel";

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

  // ✅ Toggle hábito
  const toggleHabit = (id) => {
    const updated = habits.map(habit =>
      habit.id === id ? { ...habit, done: !habit.done } : habit
    );
    setHabits(updated);
  };

  // 🗑️ Deletar hábito
  const deleteHabit = (id) => {
    const filtered = habits.filter(h => h.id !== id);
    setHabits(filtered);
  };

  // ✏️ Editar (simples por enquanto)
  const editHabit = (id) => {
    Alert.alert("Editar", "Função de edição será implementada depois");
  };

  // ⋮ Menu de opções
  const openOptions = (habit) => {
    Alert.alert(
      habit.name,
      "Escolha uma opção",
      [
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
      ]
    );
  };

  const total = habits.length;
  const feitos = habits.filter(h => h.done).length;
  const progress = Math.round((feitos / total) * 100);

  return (
    <HomeContainer>

      {/* TOPO */}
      <TopSection>
        <DateText>{today}</DateText>
        <GreetingText>Olá, {userName}</GreetingText>
      </TopSection>

      {/* CARD */}
      <ProgressCard>
        <CardTitle>Progresso de hoje</CardTitle>
        <ProgressText>{progress}%</ProgressText>
      </ProgressCard>

      {/* LISTA */}
      <SectionTitle>Seus hábitos</SectionTitle>

      <HabitsContainer>
        <FlatList
          data={habits}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <HabitItem>

              {/* Nome */}
              {item.done ? (
                <HabitDoneText>{item.name}</HabitDoneText>
              ) : (
                <HabitText>{item.name}</HabitText>
              )}

              {/* Ações */}
              <View style={{ flexDirection: "row", alignItems: "center" }}>

                {/* Checkbox */}
                <TouchableOpacity
                  onPress={() => toggleHabit(item.id)}
                  style={{ marginRight: 15 }}
                >
                  {item.done ? (
                    <CheckboxChecked>
                      <CheckMark>✓</CheckMark>
                    </CheckboxChecked>
                  ) : (
                    <Checkbox />
                  )}
                </TouchableOpacity>

                {/* Menu */}
                <TouchableOpacity
                  onPress={() => openOptions(item)}
                  style={{ padding: 5 }}
                >
                  <HabitText style={{ fontSize: 20 }}>⋮</HabitText>
                </TouchableOpacity>

              </View>

            </HabitItem>
          )}
        />
      </HabitsContainer>

    </HomeContainer>
  );
}