import React, { useCallback, useEffect, useMemo, useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  Modal,
  TextInput,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Alert,
} from 'react-native';

import ExcluirConfirmacao from '../modal/ExcluirConfirm';
import HabitConcluido from '../habits/HabitConcluido';
import { useAuth } from '../../context/AuthContext';
import { createHabit, deleteHabit, listHabits, toDateKey, updateHabit } from '../../services/habits';
import { createGoal, formatGoalFrequency, isGoalCompleted, listGoals } from '../../services/goals';
import { useFocusEffect } from '@react-navigation/native';

const PERIOD_OPTIONS = ['1 Mês (30 Dias)', '7 Dias', '15 Dias', '3 Meses'];
const FREQUENCY_OPTIONS = ['Diário', 'Semanal', 'Mensal'];

export default function Home({ navigation }) {
  const { user } = useAuth();

  const [habits, setHabits] = useState([]);
  const [loadingHabits, setLoadingHabits] = useState(false);
  const [goals, setGoals] = useState([]);
  const [loadingGoals, setLoadingGoals] = useState(false);

  const [modalVisible, setModalVisible] = useState(false);
  const [goalModalVisible, setGoalModalVisible] = useState(false);
  const [menuAberto, setMenuAberto] = useState(false);
  const [itemSelecionado, setItemSelecionado] = useState(null);
  const [excluirVisible, setExcluirVisible] = useState(false);
  const [concluidoVisible, setConcluidoVisible] = useState(false);

  const [novoHabito, setNovoHabito] = useState('');
  const [novaMeta, setNovaMeta] = useState('');
  const [nomeHabitoMeta, setNomeHabitoMeta] = useState('');
  const [periodoMeta, setPeriodoMeta] = useState(PERIOD_OPTIONS[0]);
  const [frequenciaMeta, setFrequenciaMeta] = useState(FREQUENCY_OPTIONS[0]);
  const [editandoId, setEditandoId] = useState(null);

  const completed = useMemo(() => habits.filter((h) => h.done).length, [habits]);
  const total = habits.length;
  const percent = total > 0 ? Math.round((completed / total) * 100) : 0;

  function limparFormulario() {
    setNovoHabito('');
    setEditandoId(null);
  }

  function fecharModal() {
    limparFormulario();
    setModalVisible(false);
  }

  function limparFormularioMeta() {
    setNovaMeta('');
    setNomeHabitoMeta('');
    setPeriodoMeta(PERIOD_OPTIONS[0]);
    setFrequenciaMeta(FREQUENCY_OPTIONS[0]);
  }

  function abrirModalMeta() {
    limparFormularioMeta();
    setGoalModalVisible(true);
  }

  function fecharModalMeta() {
    limparFormularioMeta();
    setGoalModalVisible(false);
  }

  async function carregarHabitos() {
    try {
      setLoadingHabits(true);
      const data = await listHabits();
      setHabits(data);
    } catch (error) {
      Alert.alert('Erro', error.response?.data?.message || 'Erro ao carregar hábitos');
    } finally {
      setLoadingHabits(false);
    }
  }

  useEffect(() => {
    carregarHabitos();
  }, []);

  async function carregarMetas() {
    try {
      setLoadingGoals(true);
      const data = await listGoals();
      setGoals(data);
    } catch (error) {
      Alert.alert('Erro', error.response?.data?.message || 'Erro ao carregar metas');
    } finally {
      setLoadingGoals(false);
    }
  }

  useFocusEffect(
    useCallback(() => {
      carregarMetas();
    }, [])
  );

  async function toggleHabit(id) {
    try {
      const current = habits.find((h) => h.id === id);
      if (!current) return;
      const updated = await updateHabit(id, { done: !current.done, date: toDateKey() });
      setHabits((prev) => prev.map((h) => (h.id === id ? updated : h)));
      await carregarMetas();
    } catch (error) {
      Alert.alert('Erro', error.response?.data?.message || 'Erro ao atualizar hábito');
    }
  }

  async function salvarHabito() {
    if (!novoHabito.trim()) {
      Alert.alert('Atenção', 'Preencha o nome do hábito.');
      return;
    }

    try {
      if (editandoId) {
        const updated = await updateHabit(editandoId, { title: novoHabito });
        setHabits((prev) => prev.map((h) => (h.id === editandoId ? updated : h)));
        fecharModal();
        return;
      }

      const created = await createHabit({ title: novoHabito });
      setHabits((prev) => [...prev, created]);
      fecharModal();
      setConcluidoVisible(true);
    } catch (error) {
      Alert.alert('Erro', error.response?.data?.message || 'Erro ao salvar hábito');
    }
  }

  async function salvarMeta() {
    if (!novaMeta.trim()) {
      Alert.alert('Atenção', 'Preencha sua meta.');
      return;
    }

    try {
      const habitName = nomeHabitoMeta.trim();
      const createdHabit = habitName ? await createHabit({ title: habitName }) : null;
      const created = await createGoal({
        name: novaMeta.trim(),
        period: periodoMeta,
        frequency: frequenciaMeta,
        habitId: createdHabit?.id,
      });

      setGoals((prev) => [created, ...prev]);
      if (createdHabit) {
        setHabits((prev) => [...prev, createdHabit]);
      }
      fecharModalMeta();
      setConcluidoVisible(true);
    } catch (error) {
      Alert.alert('Erro', error.response?.data?.message || 'Erro ao criar meta');
    }
  }

  function pedirConfirmacaoExcluir() {
    setMenuAberto(false);
    setExcluirVisible(true);
  }

  async function confirmarExcluir() {
    try {
      if (!itemSelecionado?.id) return;
      await deleteHabit(itemSelecionado.id);
      setHabits((prev) => prev.filter((h) => h.id !== itemSelecionado.id));
    } catch (error) {
      Alert.alert('Erro', error.response?.data?.message || 'Erro ao excluir hábito');
    } finally {
      setItemSelecionado(null);
      setExcluirVisible(false);
    }
  }

  function editarHabito(item) {
    if (!item) return;
    setEditandoId(item.id);
    setNovoHabito(item.title || '');
    setMenuAberto(false);
    setItemSelecionado(null);
    setModalVisible(true);
  }

  function abrirMenu(item) {
    setItemSelecionado(item);
    setMenuAberto(true);
  }

  function renderHabit({ item }) {
    return (
      <View style={[styles.habitItem, item.done && styles.habitDoneBg]}>
        <Text style={[styles.habitText, item.done && styles.habitDoneText]}>
          {item.title}
        </Text>

        <View style={styles.habitActions}>
          <TouchableOpacity
            style={[styles.checkbox, item.done && styles.checkboxDone]}
            onPress={() => toggleHabit(item.id)}
          >
            {item.done && <Text style={styles.checkText}>✓</Text>}
          </TouchableOpacity>

          <TouchableOpacity onPress={() => abrirMenu(item)}>
            <Text style={styles.menuDots}>⋮</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.date}>Dom, 1 de março, 2026</Text>

      <Text style={styles.greeting}>
        Olá, <Text style={styles.name}>{user?.name ?? 'Usuário'}!</Text>
      </Text>

      <View style={styles.progressCard}>
        <View style={styles.circle}>
          <Text style={styles.circleText}>{percent}%</Text>
        </View>

        <View>
          <Text style={styles.progressTitle}>
            {completed} de {total} hábitos
          </Text>
          <Text style={styles.progressSubtitle}>completos hoje!</Text>
        </View>
      </View>

      <View style={styles.sectionCard}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Hábitos de hoje</Text>

          <TouchableOpacity onPress={() => navigation.navigate('AllHabits')}>
            <Text style={styles.seeAll}>Ver todos</Text>
          </TouchableOpacity>
        </View>

        <FlatList
          data={habits}
          keyExtractor={(item) => item.id}
          scrollEnabled={false}
          renderItem={renderHabit}
          refreshing={loadingHabits}
          onRefresh={carregarHabitos}
        />
      </View>

      <View style={styles.goalsCard}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Suas Metas</Text>

          <TouchableOpacity onPress={() => navigation.navigate('GoalsProgress')}>
            <Text style={styles.seeAll}>Ver todas</Text>
          </TouchableOpacity>
        </View>

        {loadingGoals ? (
          <Text style={styles.emptyText}>Carregando metas...</Text>
        ) : goals.length === 0 ? (
          <Text style={styles.emptyText}>Nenhuma meta cadastrada ainda.</Text>
        ) : (
          goals.slice(0, 3).map((goal) => (
            <TouchableOpacity
              key={String(goal.id)}
              style={styles.goalItem}
              onPress={() => navigation.navigate('GoalDetails', { goal })}
            >
              <View style={styles.goalInfo}>
                <Text style={styles.goalTitle}>{goal.name}</Text>
                <Text style={styles.goalSubtitle}>{goal.period} - {formatGoalFrequency(goal.frequency)}</Text>
              </View>

              <Text style={[styles.goalPercent, isGoalCompleted(goal) && styles.goalPercentDone]}>
                {goal.progress}%
              </Text>
            </TouchableOpacity>
          ))
        )}
      </View>

      <TouchableOpacity style={styles.fab} onPress={abrirModalMeta}>
        <Text style={styles.fabText}>+</Text>
      </TouchableOpacity>

      <View style={styles.bottomNav}>
        <TouchableOpacity onPress={() => navigation.navigate('Home')}>
          <Text style={styles.navIconActive}>⌂</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('Progress')}>
          <Text style={styles.navIcon}>⌓</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('Configuracoes')}>
          <Text style={styles.navIcon}>⚙</Text>
        </TouchableOpacity>
      </View>

      <Modal
        visible={menuAberto}
        transparent
        animationType="fade"
        onRequestClose={() => setMenuAberto(false)}
      >
        <TouchableOpacity
          style={styles.menuOverlay}
          activeOpacity={1}
          onPress={() => setMenuAberto(false)}
        >
          <View style={styles.menuModalBox}>
            <TouchableOpacity onPress={() => editarHabito(itemSelecionado)}>
              <Text style={styles.optionText}>Editar</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={pedirConfirmacaoExcluir}>
              <Text style={styles.deleteOptionText}>Excluir</Text>
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
      </Modal>

      <Modal
        visible={modalVisible}
        transparent
        animationType="fade"
        onRequestClose={fecharModal}
      >
        <KeyboardAvoidingView
          style={styles.modalOverlay}
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        >
          <View style={styles.modalBox}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>
                {editandoId ? 'Editar hábito' : 'Criar hábito'}
              </Text>
              <TouchableOpacity onPress={fecharModal}>
                <Text style={styles.closeButton}>×</Text>
              </TouchableOpacity>
            </View>

            <ScrollView showsVerticalScrollIndicator={false}>
              <Text style={styles.inputLabel}>Nome do hábito</Text>
              <TextInput
                style={styles.input}
                value={novoHabito}
                onChangeText={setNovoHabito}
                placeholder="Ex: Beber 2L de água"
              />

              <TouchableOpacity style={styles.createButton} onPress={salvarHabito}>
                <Text style={styles.createButtonText}>
                  {editandoId ? 'Salvar alterações' : 'Criar'}
                </Text>
              </TouchableOpacity>
            </ScrollView>
          </View>
        </KeyboardAvoidingView>
      </Modal>

      <Modal
        visible={goalModalVisible}
        transparent
        animationType="fade"
        onRequestClose={fecharModalMeta}
      >
        <KeyboardAvoidingView
          style={styles.modalOverlay}
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        >
          <View style={styles.modalBox}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Criar meta</Text>
              <TouchableOpacity onPress={fecharModalMeta}>
                <Text style={styles.closeButton}>×</Text>
              </TouchableOpacity>
            </View>

            <ScrollView showsVerticalScrollIndicator={false}>
              <Text style={styles.inputLabel}>Sua meta</Text>
              <TextInput
                style={styles.input}
                value={novaMeta}
                onChangeText={setNovaMeta}
                placeholder="Ex: Beber água todos os dias"
              />

              <Text style={styles.inputLabel}>Nome do hábito</Text>
              <TextInput
                style={styles.input}
                value={nomeHabitoMeta}
                onChangeText={setNomeHabitoMeta}
                placeholder="Ex: Beber 2L de água"
              />

              <Text style={styles.inputLabel}>Período</Text>
              <View style={styles.optionGroup}>
                {PERIOD_OPTIONS.map((option) => (
                  <TouchableOpacity
                    key={option}
                    style={[
                      styles.optionButton,
                      periodoMeta === option && styles.optionButtonSelected,
                    ]}
                    onPress={() => setPeriodoMeta(option)}
                  >
                    <Text
                      style={[
                        styles.optionButtonText,
                        periodoMeta === option && styles.optionButtonTextSelected,
                      ]}
                    >
                      {option}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>

              <Text style={styles.inputLabel}>Frequência</Text>
              <View style={styles.optionGroup}>
                {FREQUENCY_OPTIONS.map((option) => (
                  <TouchableOpacity
                    key={option}
                    style={[
                      styles.optionButton,
                      frequenciaMeta === option && styles.optionButtonSelected,
                    ]}
                    onPress={() => setFrequenciaMeta(option)}
                  >
                    <Text
                      style={[
                        styles.optionButtonText,
                        frequenciaMeta === option && styles.optionButtonTextSelected,
                      ]}
                    >
                      {option}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>

              <TouchableOpacity style={styles.createButton} onPress={salvarMeta}>
                <Text style={styles.createButtonText}>Criar</Text>
              </TouchableOpacity>
            </ScrollView>
          </View>
        </KeyboardAvoidingView>
      </Modal>

      <HabitConcluido visible={concluidoVisible} onOk={() => setConcluidoVisible(false)} />

      <ExcluirConfirmacao
        visible={excluirVisible}
        onConfirm={confirmarExcluir}
        onCancel={() => {
          setItemSelecionado(null);
          setExcluirVisible(false);
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F7F8FA',
    paddingHorizontal: 14,
    paddingTop: 46,
  },
  date: {
    fontSize: 13,
    fontWeight: '600',
    color: '#555',
    marginBottom: 6,
  },
  greeting: {
    fontSize: 24,
    fontWeight: '700',
    color: '#222',
    marginBottom: 20,
  },
  name: {
    color: '#32B956',
  },
  progressCard: {
    backgroundColor: '#2CB84B',
    borderRadius: 10,
    padding: 14,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 22,
  },
  circle: {
    width: 54,
    height: 54,
    borderRadius: 27,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  circleText: {
    color: '#2CB84B',
    fontSize: 18,
    fontWeight: '800',
  },
  progressTitle: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '800',
  },
  progressSubtitle: {
    color: '#fff',
    fontSize: 17,
    fontWeight: '500',
  },
  sectionCard: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 14,
    marginBottom: 22,
  },
  goalsCard: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 14,
    minHeight: 70,
    marginBottom: 22,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 14,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '800',
    color: '#333',
  },
  seeAll: {
    fontSize: 12,
    color: '#39B54A',
    fontWeight: '700',
  },
  habitItem: {
    height: 50,
    backgroundColor: '#FAFAFA',
    marginBottom: 8,
    borderRadius: 4,
    paddingHorizontal: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  habitDoneBg: {
    backgroundColor: '#E9F8EC',
  },
  habitText: {
    fontSize: 15,
    color: '#222',
  },
  habitDoneText: {
    color: '#32B956',
  },
  habitActions: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  checkbox: {
    width: 28,
    height: 28,
    borderRadius: 6,
    borderWidth: 2,
    borderColor: '#777',
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkboxDone: {
    backgroundColor: '#4ED17A',
    borderColor: '#4ED17A',
  },
  checkText: {
    color: '#fff',
    fontWeight: '800',
    fontSize: 16,
  },
  menuDots: {
    fontSize: 22,
    color: '#888',
    marginLeft: 8,
    paddingHorizontal: 4,
  },
  goalItem: {
    backgroundColor: '#FAFAFA',
    borderRadius: 6,
    padding: 12,
    marginBottom: 8,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  goalInfo: {
    flex: 1,
    marginRight: 10,
  },
  goalTitle: {
    fontSize: 15,
    fontWeight: '800',
    color: '#333',
  },
  goalSubtitle: {
    fontSize: 13,
    color: '#777',
    marginTop: 4,
  },
  goalPercent: {
    fontSize: 15,
    fontWeight: '800',
    color: '#39B54A',
  },
  goalPercentDone: {
    color: '#10B981',
  },
  emptyText: {
    fontSize: 13,
    color: '#777',
    paddingVertical: 8,
  },
  fab: {
    position: 'absolute',
    right: 24,
    bottom: 56,
    width: 58,
    height: 58,
    borderRadius: 29,
    backgroundColor: '#4ED17A',
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 8,
  },
  fabText: {
    color: '#fff',
    fontSize: 42,
    lineHeight: 46,
  },
  bottomNav: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    height: 52,
    backgroundColor: '#fff',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: '#EEE',
  },
  navIconActive: {
    fontSize: 24,
    color: '#39B54A',
  },
  navIcon: {
    fontSize: 24,
    color: '#999',
  },
  menuOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.15)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  menuModalBox: {
    width: 180,
    backgroundColor: '#fff',
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 16,
    elevation: 10,
  },
  optionText: {
    fontSize: 15,
    fontWeight: '700',
    color: '#333',
    paddingVertical: 10,
  },
  deleteOptionText: {
    fontSize: 15,
    fontWeight: '700',
    color: '#EF4444',
    paddingVertical: 10,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.25)',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 18,
  },
  modalBox: {
    width: '100%',
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
    elevation: 10,
    maxHeight: '85%',
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 18,
  },
  modalTitle: {
    fontSize: 17,
    fontWeight: '800',
    color: '#333',
  },
  closeButton: {
    fontSize: 26,
    color: '#333',
    fontWeight: '600',
  },
  inputLabel: {
    fontSize: 13,
    fontWeight: '700',
    color: '#555',
    marginBottom: 8,
  },
  input: {
    height: 44,
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#E5E5E5',
    borderRadius: 3,
    paddingHorizontal: 10,
    marginBottom: 18,
    color: '#222',
  },
  optionGroup: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginBottom: 18,
  },
  optionButton: {
    minHeight: 38,
    borderWidth: 1,
    borderColor: '#E5E5E5',
    borderRadius: 4,
    paddingHorizontal: 12,
    justifyContent: 'center',
    backgroundColor: '#fff',
  },
  optionButtonSelected: {
    borderColor: '#38D952',
    backgroundColor: '#EAF9EC',
  },
  optionButtonText: {
    color: '#555',
    fontSize: 13,
    fontWeight: '700',
  },
  optionButtonTextSelected: {
    color: '#1F8F3A',
  },
  createButton: {
    height: 48,
    backgroundColor: '#38D952',
    borderRadius: 4,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 4,
  },
  createButtonText: {
    color: '#fff',
    fontSize: 15,
    fontWeight: '800',
  },
});
