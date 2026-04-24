import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';

const integrantes = [
  { nome: 'Guilherme Ferreira de Souza', ra: '2412130057' },
  { nome: 'Heitor dos Santos Ribeiro', ra: '2412130143' },
  { nome: 'Danielly de Sousa Luz', ra: '2412130158' },
  { nome: 'Eduardo Lima dos Santos', ra: '2412130074' },
  { nome: 'Vitor Alexandre Pereira da Silva', ra: '2312130217' },
  { nome: 'Emanuel Nunes Almeida', ra: '2412130094' },
];

export default function SobreOApp({ navigation }) {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
          <Text style={styles.backArrow}>←</Text>
        </TouchableOpacity>
        <Text style={styles.pageTitle}>Sobre o app</Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.sectionTitle}>Integrantes</Text>
        {integrantes.map((p, i) => (
          <Text key={i} style={styles.integrante}>
            {p.nome} - {p.ra}
          </Text>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F7F8FA',
    paddingTop: 52,
    paddingHorizontal: 20,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 28,
  },
  backBtn: { marginRight: 12 },
  backArrow: { fontSize: 26, color: '#1F2937' },
  pageTitle: { fontSize: 20, fontWeight: '800', color: '#1F2937' },
  card: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 20,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '800',
    color: '#1F2937',
    marginBottom: 14,
  },
  integrante: {
    fontSize: 14,
    color: '#374151',
    lineHeight: 24,
  },
});
