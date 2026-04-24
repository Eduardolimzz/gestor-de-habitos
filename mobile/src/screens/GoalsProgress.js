import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { StyledContainer, InnerContainer } from '../components/styles';
import mockGoals from '../data/mockGoals';

function ProgressBar({ percentual }) {
  return (
    <View style={styles.progressBarBg}>
      <View style={[styles.progressBarFill, { width: `${percentual}%` }]} />
    </View>
  );
}

function MetaItem({ goal, navigation, onDelete }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const frequencia = goal.tipoHabito || 'Todos os dias';

  return (
    <View style={styles.metaCard}>
      <View style={styles.metaTop}>
        <Text style={styles.metaTitulo}>{goal.titulo}</Text>

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

      <ProgressBar percentual={goal.percentual} />

      <Text style={styles.metaSubtitulo}>{goal.subtitulo}</Text>
      <Text style={styles.metaFrequencia}>{frequencia}</Text>
    </View>
  );
}

const GoalsProgress = ({ navigation }) => {
  const [metas, setMetas] = useState(mockGoals);

  function handleDelete(id) {
    setMetas((prev) => prev.filter((item) => item.id !== id));
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

          {metas.map((goal) => (
            <MetaItem
              key={goal.id}
              goal={goal}
              navigation={navigation}
              onDelete={handleDelete}
            />
          ))}
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
  backBtn: {
    marginRight: 12,
  },
  backArrow: {
    fontSize: 26,
    color: '#1F2937',
  },
  pageTitle: {
    fontSize: 20,
    fontWeight: '800',
    color: '#1F2937',
  },
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
  dotsBtn: {
    paddingHorizontal: 6,
  },
  dots: {
    fontSize: 22,
    color: '#6B7280',
  },
  inlineMenu: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
  },
  menuEdit: {
    fontSize: 14,
    fontWeight: '600',
    color: '#374151',
  },
  menuDelete: {
    fontSize: 14,
    fontWeight: '600',
    color: '#EF4444',
  },
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
  metaSubtitulo: {
    fontSize: 13,
    color: '#6B7280',
    marginBottom: 4,
  },
  metaFrequencia: {
    fontSize: 13,
    fontWeight: '600',
    color: '#39B54A',
  },
});
