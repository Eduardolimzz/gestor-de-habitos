import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { StyledContainer, InnerContainer } from '../components/styles';

function Dia({ numero, destaque = false, ativo = false }) {
  return (
    <View
      style={[
        styles.dayBox,
        destaque && styles.dayHighlight,
        ativo && styles.dayActive,
      ]}
    >
      <Text
        style={[
          styles.dayText,
          destaque && styles.dayTextHighlight,
          ativo && styles.dayTextActive,
        ]}
      >
        {numero}
      </Text>
    </View>
  );
}

function InfoRow({ label, value }) {
  return (
    <View style={styles.infoRow}>
      <Text style={styles.infoLabel}>{label}</Text>
      <Text style={styles.infoValue}>{value}</Text>
    </View>
  );
}

const GoalDetails = ({ navigation, route }) => {
  const goal = route?.params?.goal || {
    titulo: 'Me hidratar melhor',
    status: 'Concluído',
    habitName: '3L de água',
    objetivos: '7 de 7 Dias',
    diasConcluidos: '7 de 7 Dias',
    diasPerdidos: '0 Dias',
    tipoHabito: 'Diário',
    criadoEm: '27 de Fevereiro',
    dataTela: '21 de março de 2026',
    inicio: 'Fev 27 2026',
    final: 'Mar 3 2026',
  };

  return (
    <StyledContainer>
      <ScrollView showsVerticalScrollIndicator={false}>
        <InnerContainer>
          <Text style={styles.dateTop}>{goal.dataTela}</Text>

          <View style={styles.headerRow}>
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <Text style={styles.backArrow}>←</Text>
            </TouchableOpacity>
            <Text style={styles.pageTitle}>Meta: {goal.titulo}</Text>
          </View>

          <View style={styles.calendarCard}>
            <View style={styles.calendarHeader}>
              <View>
                <Text style={styles.labelSmall}>Início</Text>
                <Text style={styles.valueSmall}>{goal.inicio}</Text>
              </View>

              <View style={styles.monthNav}>
                <Text style={styles.monthArrow}>‹</Text>
                <Text style={styles.monthText}>Mar</Text>
                <Text style={styles.monthArrow}>›</Text>
              </View>

              <View style={styles.rightAlign}>
                <Text style={styles.labelSmall}>Final</Text>
                <Text style={styles.valueSmall}>{goal.final}</Text>
              </View>
            </View>

            <View style={styles.weekRow}>
              {['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'].map((dia) => (
                <Text key={dia} style={styles.weekText}>
                  {dia}
                </Text>
              ))}
            </View>

            <View style={styles.daysGrid}>
              <Dia numero="27" destaque />
              <Dia numero="28" destaque />
              <Dia numero="29" destaque />
              <Dia numero="30" destaque />
              <Dia numero="1" destaque />
              <Dia numero="2" destaque />
              <Dia numero="3" destaque />

              <Dia numero="4" />
              <Dia numero="5" />
              <Dia numero="6" />
              <Dia numero="7" />
              <Dia numero="8" />
              <Dia numero="9" />
              <Dia numero="10" />

              <Dia numero="11" />
              <Dia numero="12" />
              <Dia numero="13" />
              <Dia numero="14" />
              <Dia numero="15" />
              <Dia numero="16" />
              <Dia numero="17" />

              <Dia numero="18" />
              <Dia numero="19" />
              <Dia numero="20" />
              <Dia numero="21" ativo />
              <Dia numero="22" />
              <Dia numero="23" />
              <Dia numero="24" />

              <Dia numero="25" />
              <Dia numero="26" />
              <Dia numero="27" />
              <Dia numero="28" />
              <Dia numero="29" />
              <Dia numero="30" />
              <Dia numero="31" />
            </View>
          </View>

          <View style={styles.infoCard}>
            <View style={styles.infoHeader}>
              <Text style={styles.goalName}>{goal.titulo}</Text>
              <View style={styles.doneBadge}>
                <Text style={styles.doneBadgeText}>{goal.status}</Text>
              </View>
            </View>

            <InfoRow label="Nome dos hábitos:" value={goal.habitName} />
            <InfoRow label="Objetivos:" value={goal.objetivos} />
            <InfoRow label="Dias concluídos:" value={goal.diasConcluidos} />
            <InfoRow label="Dias perdidos:" value={goal.diasPerdidos} />
            <InfoRow label="Tipo de hábito:" value={goal.tipoHabito} />
            <InfoRow label="Criado em:" value={goal.criadoEm} />
          </View>
        </InnerContainer>
      </ScrollView>
    </StyledContainer>
  );
};

export default GoalDetails;

const styles = StyleSheet.create({
  dateTop: {
    fontSize: 15,
    color: '#4B5563',
    marginTop: 6,
    marginBottom: 22,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  backArrow: {
    fontSize: 28,
    color: '#1F2937',
    marginRight: 12,
  },
  pageTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#1F2937',
    flex: 1,
  },
  calendarCard: {
    backgroundColor: '#fff',
    borderRadius: 22,
    padding: 18,
    marginBottom: 22,
  },
  calendarHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 24,
  },
  monthNav: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
  monthArrow: {
    fontSize: 22,
    color: '#1F2937',
  },
  monthText: {
    fontSize: 20,
    fontWeight: '700',
    color: '#10B981',
  },
  labelSmall: {
    fontSize: 14,
    color: '#374151',
    marginBottom: 6,
  },
  valueSmall: {
    fontSize: 15,
    color: '#1F2937',
  },
  rightAlign: {
    alignItems: 'flex-end',
  },
  weekRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  weekText: {
    width: '14%',
    textAlign: 'center',
    fontSize: 13,
    color: '#4B5563',
  },
  daysGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  dayBox: {
    width: '14%',
    aspectRatio: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
    marginBottom: 8,
  },
  dayHighlight: {
    backgroundColor: '#CFF3D8',
  },
  dayActive: {
    backgroundColor: '#2F2F2F',
  },
  dayText: {
    color: '#1F2937',
    fontSize: 14,
  },
  dayTextHighlight: {
    color: '#1F2937',
  },
  dayTextActive: {
    color: '#fff',
  },
  infoCard: {
    backgroundColor: '#fff',
    borderRadius: 22,
    padding: 20,
  },
  infoHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 24,
  },
  goalName: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1F2937',
    flex: 1,
    marginRight: 10,
  },
  doneBadge: {
    backgroundColor: '#EAF9EC',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 16,
  },
  doneBadgeText: {
    color: '#7ED957',
    fontWeight: '600',
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
    gap: 12,
  },
  infoLabel: {
    fontSize: 15,
    color: '#1F2937',
  },
  infoValue: {
    fontSize: 15,
    color: '#1F2937',
    fontWeight: '500',
  },
});