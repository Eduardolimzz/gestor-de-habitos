import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import { StyledContainer, InnerContainer } from '../../components/styles';
import api from '../../services/api';

function ProgressBar({ percentual }) {
  return (
    <View style={styles.progressBarBg}>
      <View style={[styles.progressBarFill, { width: `${percentual}%` }]} />
    </View>
  );
}

function MetaItem({ goal, navigation, onDelete }) {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <View style={styles.metaCard}>
      <View style={styles.metaTop}>
        <Text style={styles.metaTitulo}>{goal.name}</Text>

        {menuOpen ? (
          <View style={styles.inlineMenu}>
            <TouchableOpacity
              onPress={() => {
                setMenuOpen(false);
                navigation.navigate('GoalDetails', { goal });
              }}
            >
              <Text style={styles.menuEdit}>Editar</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => { setMenuOpen(false); onDelete(goal.id); }}>
              <Text style={styles.menuDelete}>Excluir</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <TouchableOpacity onPress={() => setMenuOpen(true)} style={styles.dotsBtn}>
            <Text style={styles.dots}>⋮</Text>
          </TouchableOpacity>
        )}
      </View>

      <ProgressBar percentual={goal.progress ?? 0} />

      <Text style={styles.metaSubtitulo}>{goal.period} — {goal.frequency}x</Text>
      <Text style={styles.metaFrequencia}>{goal.status}</Text>
    </View>
  );
}

const GoalsProgress = ({ navigation }) => {
  const [metas, setMetas] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get('/goals')
      .then(res => setMetas(res.data))
      .catch(err => console.error('Erro ao buscar metas:', err))
      .finally(() => setLoading(false));
  }, []);

  function handleDelete(id) {
    api.delete(`/goals/${id}`)
      .then(() => setMetas(prev => prev.filter(item => item.id !== id)))
      .catch(err => console.error('Erro ao deletar meta:', err));
  }

  return (
    <StyledContainer>
      <ScrollView showsVerticalScrollIndicator={false}>
        <InnerContainer>
          <View style={styles.header}>
            <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
              <Text style={styles.backArrow}>←</Text>
            </TouchableOpacity>
            <Text style={styles.pageTitle}>Suas metas</Text>
          </View>

          {loading ? (
            <ActivityIndicator color="#10B981" style={{ marginTop: 40 }} />
          ) : metas.length === 0 ? (
            <Text style={styles.emptyText}>Nenhuma meta cadastrada ainda.</Text>
          ) : (
            metas.map((goal) => (
              <MetaItem
                key={goal.id}
                goal={goal}
                navigation={navigation}
                onDelete={handleDelete}
              />
            ))
          )}
        </InnerContainer>
      </ScrollView>
    </StyledContainer>
  );
};

export default GoalsProgress;

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 24,
  },
  backBtn: { marginRight: 12 },
  backArrow: { fontSize: 26, color: '#1F2937' },
  pageTitle: { fontSize: 20, fontWeight: '800', color: '#1F2937' },
  emptyText: { fontSize: 15, color: '#6B7280', textAlign: 'center', marginTop: 40 },
  metaCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 14,
  },
  metaTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  metaTitulo: {
    fontSize: 16,
    fontWeight: '700',
    color: '#1F2937',
    flex: 1,
    marginRight: 8,
  },
  dotsBtn: { paddingHorizontal: 6 },
  dots: { fontSize: 22, color: '#6B7280' },
  inlineMenu: { flexDirection: 'row', alignItems: 'center', gap: 14 },
  menuEdit: { fontSize: 14, fontWeight: '600', color: '#374151' },
  menuDelete: { fontSize: 14, fontWeight: '600', color: '#EF4444' },
  progressBarBg: {
    width: '100%',
    height: 10,
    backgroundColor: '#E5E7EB',
    borderRadius: 999,
    overflow: 'hidden',
    marginBottom: 10,
  },
  progressBarFill: {
    height: '100%',
    backgroundColor: '#39B54A',
    borderRadius: 999,
  },
  metaSubtitulo: { fontSize: 13, color: '#6B7280', marginBottom: 4 },
  metaFrequencia: { fontSize: 13, fontWeight: '600', color: '#39B54A' },
});