import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';
import { StyledContainer, InnerContainer } from '../../components/styles';
import api from '../../services/api';

function MetaCard({ goal, navigation }) {
  const concluido = goal.status === 'ativo' ? false : true;
  const percentual = goal.progress ?? 0;

  return (
    <TouchableOpacity
      style={styles.metaCard}
      onPress={() => navigation.navigate('GoalDetails', { goal })}
      activeOpacity={0.85}
    >
      <View style={[styles.circleSmall, { borderColor: concluido ? '#10B981' : '#D1D5DB' }]}>
        <Text style={[styles.circleSmallText, { color: concluido ? '#10B981' : '#6B7280' }]}>
          {percentual}%
        </Text>
      </View>

      <View style={styles.metaInfo}>
        <Text style={styles.metaTitulo}>{goal.name}</Text>
        <Text style={styles.metaSubtitulo}>{goal.period} — {goal.frequency}x</Text>
      </View>

      <View style={[styles.badge, concluido ? styles.badgeCompleto : styles.badgeIncompleto]}>
        <Text style={[styles.badgeText, concluido ? styles.badgeTextCompleto : styles.badgeTextIncompleto]}>
          {goal.status}
        </Text>
      </View>
    </TouchableOpacity>
  );
}

const Progress = ({ navigation }) => {
  const [goals, setGoals] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get('/goals')
      .then(res => setGoals(res.data))
      .catch(err => console.error('Erro ao buscar metas:', err))
      .finally(() => setLoading(false));
  }, []);

  const concluidas = goals.filter(g => g.status === 'concluido').length;
  const nao_concluidas = goals.filter(g => g.status !== 'concluido').length;
  const percentualGeral = goals.length > 0
    ? Math.round((concluidas / goals.length) * 100)
    : 0;

  const visibleGoals = goals.slice(0, 3);

  return (
    <View style={styles.screen}>
      <StyledContainer>
        <ScrollView showsVerticalScrollIndicator={false}>
          <InnerContainer>
            <Text style={styles.pageTitle}>Progresso</Text>
            <Text style={styles.sectionTitle}>Relatório de progresso</Text>

            <View style={styles.mainCard}>
              <View style={styles.headerCard}>
                <Text style={styles.mainCardTitle}>Suas Metas</Text>
                <TouchableOpacity onPress={() => navigation.navigate('GoalsProgress')}>
                  <Text style={styles.verTodas}>Ver todas</Text>
                </TouchableOpacity>
              </View>

              <View style={styles.progressWrapper}>
                <View style={styles.circleOuter}>
                  <View style={styles.circleInner}>
                    <Text style={styles.percentText}>{percentualGeral}%</Text>
                  </View>
                </View>
              </View>

              <Text style={styles.okText}>✓ {concluidas} Metas foram alcançadas</Text>
              <Text style={styles.badText}>✕ {nao_concluidas} Metas não foram alcançadas</Text>

              {loading ? (
                <ActivityIndicator color="#10B981" style={{ marginTop: 20 }} />
              ) : (
                visibleGoals.map((goal) => (
                  <MetaCard key={goal.id} goal={goal} navigation={navigation} />
                ))
              )}
            </View>
          </InnerContainer>
        </ScrollView>
      </StyledContainer>

      <View style={styles.bottomNav}>
        <TouchableOpacity onPress={() => navigation.navigate('Home')}>
          <Text style={styles.navIcon}>⌂</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('Progress')}>
          <Text style={styles.navIconActive}>⌁</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('Configuracoes')}>
          <Text style={styles.navIcon}>⚙</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Progress;

const styles = StyleSheet.create({
  screen: { flex: 1 },
  bottomNav: {
    height: 52,
    backgroundColor: '#fff',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: '#EEE',
  },
  navIcon: { fontSize: 24, color: '#999' },
  navIconActive: { fontSize: 24, color: '#39B54A' },
  pageTitle: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#10B981',
    marginTop: 20,
    marginBottom: 28,
  },
  sectionTitle: { fontSize: 18, fontWeight: '600', color: '#1F2937' },
  mainCard: { backgroundColor: '#fff', borderRadius: 24, padding: 20 },
  headerCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  mainCardTitle: { fontSize: 20, fontWeight: '700', color: '#1F2937' },
  verTodas: { color: '#7ED957', fontWeight: '600', fontSize: 16 },
  progressWrapper: { alignItems: 'center', marginVertical: 20 },
  circleOuter: {
    width: 180,
    height: 180,
    borderRadius: 90,
    borderWidth: 18,
    borderColor: '#D9D9D9',
    borderTopColor: '#10B981',
    borderRightColor: '#10B981',
    borderBottomColor: '#10B981',
    justifyContent: 'center',
    alignItems: 'center',
    transform: [{ rotate: '-45deg' }],
  },
  circleInner: { transform: [{ rotate: '45deg' }] },
  percentText: { fontSize: 30, fontWeight: 'bold', color: '#10B981' },
  okText: { color: '#10B981', fontSize: 16, fontWeight: '600', marginBottom: 8 },
  badText: { color: '#EF4444', fontSize: 16, fontWeight: '600', marginBottom: 18 },
  metaCard: {
    backgroundColor: '#FAFAFA',
    borderRadius: 18,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 14,
  },
  circleSmall: {
    width: 62, height: 62, borderRadius: 31,
    borderWidth: 4, justifyContent: 'center',
    alignItems: 'center', marginRight: 14,
  },
  circleSmallText: { fontSize: 16, fontWeight: '700' },
  metaInfo: { flex: 1 },
  metaTitulo: { fontSize: 18, fontWeight: '700', color: '#1F2937', marginBottom: 4 },
  metaSubtitulo: { fontSize: 15, color: '#4B5563' },
  badge: { paddingHorizontal: 14, paddingVertical: 8, borderRadius: 18 },
  badgeCompleto: { backgroundColor: '#EAF9EC' },
  badgeIncompleto: { backgroundColor: '#F1F1F1' },
  badgeText: { fontSize: 14, fontWeight: '600' },
  badgeTextCompleto: { color: '#7ED957' },
  badgeTextIncompleto: { color: '#A3A3A3' },
});