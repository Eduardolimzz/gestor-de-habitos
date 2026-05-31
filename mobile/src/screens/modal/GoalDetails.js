import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { StyledContainer, InnerContainer } from '../../components/styles';

function Dia({ numero, destaque = false, ativo = false }) {
  return (
    <View style={[styles.dayBox, destaque && styles.dayHighlight, ativo && styles.dayActive]}>
      <Text style={[styles.dayText, destaque && styles.dayTextHighlight, ativo && styles.dayTextActive]}>
        {numero}
      </Text>
    </View>
  );
}

function InfoRow({ label, value }) {
  return (
    <View style={styles.infoRow}>
      <Text style={styles.infoLabel}>{label}</Text>
      <Text style={styles.infoValue}>{value ?? '—'}</Text>
    </View>
  );
}

const GoalDetails = ({ navigation, route }) => {
  const goal = route?.params?.goal;

  if (!goal) {
    return (
      <StyledContainer>
        <InnerContainer>
          <Text style={{ marginTop: 40, color: '#6B7280' }}>Meta não encontrada.</Text>
        </InnerContainer>
      </StyledContainer>
    );
  }

  const dataCriacao = goal.createdAt
    ? new Date(goal.createdAt).toLocaleDateString('pt-BR')
    : '—';

  return (
    <StyledContainer>
      <ScrollView showsVerticalScrollIndicator={false}>
        <InnerContainer>
          <Text style={styles.dateTop}>{new Date().toLocaleDateString('pt-BR', { day: 'numeric', month: 'long', year: 'numeric' })}</Text>

          <View style={styles.headerRow}>
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <Text style={styles.backArrow}>←</Text>
            </TouchableOpacity>
            <Text style={styles.pageTitle}>Meta: {goal.name}</Text>
          </View>

          <View style={styles.calendarCard}>
            <View style={styles.calendarHeader}>
              <View>
                <Text style={styles.labelSmall}>Início</Text>
                <Text style={styles.valueSmall}>{dataCriacao}</Text>
              </View>
              <View style={styles.monthNav}>
                <Text style={styles.monthArrow}>‹</Text>
                <Text style={styles.monthText}>
                  {new Date().toLocaleDateString('pt-BR', { month: 'short' })}
                </Text>
                <Text style={styles.monthArrow}>›</Text>
              </View>
              <View style={styles.rightAlign}>
                <Text style={styles.labelSmall}>Status</Text>
                <Text style={styles.valueSmall}>{goal.status}</Text>
              </View>
            </View>

            <View style={styles.weekRow}>
              {['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'].map((dia) => (
                <Text key={dia} style={styles.weekText}>{dia}</Text>
              ))}
            </View>

            <View style={styles.daysGrid}>
              {Array.from({ length: 35 }, (_, i) => i + 1).map((n) => (
                <Dia key={n} numero={n} />
              ))}
            </View>
          </View>

          <View style={styles.infoCard}>
            <View style={styles.infoHeader}>
              <Text style={styles.goalName}>{goal.name}</Text>
              <View style={[styles.doneBadge, goal.status === 'concluido' && styles.doneBadgeGreen]}>
                <Text style={styles.doneBadgeText}>{goal.status}</Text>
              </View>
            </View>

            <InfoRow label="Período:" value={goal.period} />
            <InfoRow label="Frequência:" value={`${goal.frequency}x`} />
            <InfoRow label="Progresso:" value={`${goal.progress}%`} />
            <InfoRow label="Criado em:" value={dataCriacao} />
          </View>
        </InnerContainer>
      </ScrollView>
    </StyledContainer>
  );
};

export default GoalDetails;

const styles = StyleSheet.create({
  dateTop: { fontSize: 15, color: '#4B5563', marginTop: 6, marginBottom: 22 },
  headerRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 20 },
  backArrow: { fontSize: 28, color: '#1F2937', marginRight: 12 },
  pageTitle: { fontSize: 20, fontWeight: '700', color: '#1F2937', flex: 1 },
  calendarCard: { backgroundColor: '#fff', borderRadius: 22, padding: 18, marginBottom: 22 },
  calendarHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 24,
  },
  monthNav: { flexDirection: 'row', alignItems: 'center', gap: 16 },
  monthArrow: { fontSize: 22, color: '#1F2937' },
  monthText: { fontSize: 20, fontWeight: '700', color: '#10B981' },
  labelSmall: { fontSize: 14, color: '#374151', marginBottom: 6 },
  valueSmall: { fontSize: 15, color: '#1F2937' },
  rightAlign: { alignItems: 'flex-end' },
  weekRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 12 },
  weekText: { width: '14%', textAlign: 'center', fontSize: 13, color: '#4B5563' },
  daysGrid: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between' },
  dayBox: { width: '14%', aspectRatio: 1, justifyContent: 'center', alignItems: 'center', borderRadius: 8, marginBottom: 8 },
  dayHighlight: { backgroundColor: '#CFF3D8' },
  dayActive: { backgroundColor: '#2F2F2F' },
  dayText: { color: '#1F2937', fontSize: 14 },
  dayTextHighlight: { color: '#1F2937' },
  dayTextActive: { color: '#fff' },
  infoCard: { backgroundColor: '#fff', borderRadius: 22, padding: 20 },
  infoHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 },
  goalName: { fontSize: 18, fontWeight: '700', color: '#1F2937', flex: 1, marginRight: 10 },
  doneBadge: { backgroundColor: '#F1F1F1', paddingHorizontal: 12, paddingVertical: 8, borderRadius: 16 },
  doneBadgeGreen: { backgroundColor: '#EAF9EC' },
  doneBadgeText: { color: '#7ED957', fontWeight: '600' },
  infoRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 16, gap: 12 },
  infoLabel: { fontSize: 15, color: '#1F2937' },
  infoValue: { fontSize: 15, color: '#1F2937', fontWeight: '500' },
});