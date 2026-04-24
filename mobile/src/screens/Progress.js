import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
} from 'react-native';
import { StyledContainer, InnerContainer } from '../components/styles';
import mockGoals from '../data/mockGoals';

function MetaCard({ goal, navigation }) {
  const concluido = goal.status === 'Concluído';

  return (
    <TouchableOpacity
      style={styles.metaCard}
      onPress={() => navigation.navigate('GoalDetails', { goal })}
      activeOpacity={0.85}
    >
      <View style={[styles.circleSmall, { borderColor: goal.cor }]}>
        <Text style={[styles.circleSmallText, { color: goal.cor }]}>
          {goal.percentual}%
        </Text>
      </View>

      <View style={styles.metaInfo}>
        <Text style={styles.metaTitulo}>{goal.titulo}</Text>
        <Text style={styles.metaSubtitulo}>{goal.subtitulo}</Text>
      </View>

      <View
        style={[
          styles.badge,
          concluido ? styles.badgeCompleto : styles.badgeIncompleto,
        ]}
      >
        <Text
          style={[
            styles.badgeText,
            concluido ? styles.badgeTextCompleto : styles.badgeTextIncompleto,
          ]}
        >
          {goal.status}
        </Text>
      </View>
    </TouchableOpacity>
  );
}

const Welcome = ({ navigation }) => {
  const visibleGoals = mockGoals.slice(0, 3);

  return (
    <View style={styles.screen}>
      <StyledContainer>
        <ScrollView showsVerticalScrollIndicator={false}>
          <InnerContainer>
            <Text style={styles.pageTitle}>Progresso</Text>

            <View style={styles.topRow}>
              <Text style={styles.sectionTitle}>Relatório de progresso</Text>
              <TouchableOpacity style={styles.monthButton}>
                <Text style={styles.monthButtonText}>Esse Mês</Text>
                <Text style={styles.monthArrow}>⌄</Text>
              </TouchableOpacity>
            </View>

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
                    <Text style={styles.percentText}>60%</Text>
                  </View>
                </View>
              </View>

              <Text style={styles.okText}>✓ 11 Metas foram alcançadas</Text>
              <Text style={styles.badText}>✕ 6 Metas não foram alcançadas</Text>

              {visibleGoals.map((goal) => (
                <MetaCard key={goal.id} goal={goal} navigation={navigation} />
              ))}
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
        <TouchableOpacity onPress={() => navigation.navigate('GoalsProgress')}>
          <Text style={styles.navIcon}>⚙</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Welcome;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
  bottomNav: {
    height: 52,
    backgroundColor: '#fff',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: '#EEE',
  },
  navIcon: {
    fontSize: 24,
    color: '#999',
  },
  navIconActive: {
    fontSize: 24,
    color: '#39B54A',
  },
  pageTitle: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#10B981',
    marginTop: 20,
    marginBottom: 28,
  },
  topRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 22,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1F2937',
  },
  monthButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#E5E7EB',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 10,
  },
  monthButtonText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#1F2937',
    marginRight: 8,
  },
  monthArrow: {
    fontSize: 18,
    color: '#1F2937',
  },
  mainCard: {
    backgroundColor: '#fff',
    borderRadius: 24,
    padding: 20,
  },
  headerCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  mainCardTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#1F2937',
  },
  verTodas: {
    color: '#7ED957',
    fontWeight: '600',
    fontSize: 16,
  },
  progressWrapper: {
    alignItems: 'center',
    marginVertical: 20,
  },
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
  circleInner: {
    transform: [{ rotate: '45deg' }],
  },
  percentText: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#10B981',
  },
  okText: {
    color: '#10B981',
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 8,
  },
  badText: {
    color: '#EF4444',
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 18,
  },
  metaCard: {
    backgroundColor: '#FAFAFA',
    borderRadius: 18,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 14,
  },
  circleSmall: {
    width: 62,
    height: 62,
    borderRadius: 31,
    borderWidth: 4,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 14,
  },
  circleSmallText: {
    fontSize: 16,
    fontWeight: '700',
  },
  metaInfo: {
    flex: 1,
  },
  metaTitulo: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1F2937',
    marginBottom: 4,
  },
  metaSubtitulo: {
    fontSize: 15,
    color: '#4B5563',
  },
  badge: {
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 18,
  },
  badgeCompleto: {
    backgroundColor: '#EAF9EC',
  },
  badgeIncompleto: {
    backgroundColor: '#F1F1F1',
  },
  badgeText: {
    fontSize: 14,
    fontWeight: '600',
  },
  badgeTextCompleto: {
    color: '#7ED957',
  },
  badgeTextIncompleto: {
    color: '#A3A3A3',
  },
});