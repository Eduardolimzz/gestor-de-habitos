import React from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';

export default function AllHabits({ route, navigation }) {
  const { habits = [] } = route.params || {};

  const completed = habits.filter((h) => h.done).length;
  const total = habits.length;

  function renderItem({ item }) {
    return (
      <View style={[styles.habitItem, item.done && styles.habitDoneBg]}>
        <View style={styles.habitLeft}>
          <Text style={[styles.habitTitle, item.done && styles.habitTitleDone]}>
            {item.title}
          </Text>
          {item.titulo ? (
            <Text style={styles.habitMeta}>{item.titulo}</Text>
          ) : null}
          <Text style={styles.habitDetails}>
            {item.tipoHabito} · {item.periodo}
          </Text>
        </View>

        <View style={[styles.statusBadge, item.done ? styles.badgeDone : styles.badgePending]}>
          <Text style={[styles.statusText, item.done ? styles.statusDoneText : styles.statusPendingText]}>
            {item.done ? 'Concluído' : 'Pendente'}
          </Text>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Text style={styles.backArrow}>←</Text>
        </TouchableOpacity>
        <Text style={styles.pageTitle}>Hábitos de hoje</Text>
      </View>

      <View style={styles.summaryRow}>
        <Text style={styles.summaryText}>Total: {total}</Text>
        <Text style={styles.summaryText}>Concluídos: {completed}</Text>
      </View>

      <FlatList
        data={habits}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        contentContainerStyle={styles.list}
        ListEmptyComponent={
          <Text style={styles.emptyText}>Nenhum hábito cadastrado.</Text>
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F7F8FA',
    paddingTop: 46,
    paddingHorizontal: 16,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 18,
  },
  backButton: {
    marginRight: 12,
  },
  backArrow: {
    fontSize: 28,
    color: '#1F2937',
  },
  pageTitle: {
    fontSize: 20,
    fontWeight: '800',
    color: '#1F2937',
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 14,
  },
  summaryText: {
    fontSize: 14,
    color: '#4B5563',
    fontWeight: '600',
  },
  list: {
    paddingBottom: 24,
  },
  habitItem: {
    backgroundColor: '#fff',
    borderRadius: 8,
    paddingHorizontal: 14,
    paddingVertical: 14,
    marginBottom: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  habitDoneBg: {
    backgroundColor: '#E9F8EC',
  },
  habitLeft: {
    flex: 1,
    marginRight: 10,
  },
  habitTitle: {
    fontSize: 15,
    fontWeight: '700',
    color: '#222',
    marginBottom: 2,
  },
  habitTitleDone: {
    color: '#32B956',
  },
  habitMeta: {
    fontSize: 13,
    color: '#555',
    marginBottom: 2,
  },
  habitDetails: {
    fontSize: 12,
    color: '#999',
  },
  statusBadge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
  },
  badgeDone: {
    backgroundColor: '#D1FAE5',
  },
  badgePending: {
    backgroundColor: '#F3F4F6',
  },
  statusText: {
    fontSize: 13,
    fontWeight: '700',
  },
  statusDoneText: {
    color: '#10B981',
  },
  statusPendingText: {
    color: '#9CA3AF',
  },
  emptyText: {
    textAlign: 'center',
    color: '#999',
    marginTop: 40,
    fontSize: 15,
  },
});
