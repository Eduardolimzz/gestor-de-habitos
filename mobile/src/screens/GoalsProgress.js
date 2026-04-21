import React, { useMemo, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  FlatList,
  Modal,
} from 'react-native';
import { StyledContainer, InnerContainer } from '../components/styles';
import mockGoals from '../data/mockGoals';

function ProgressBar({ percentual, cor = '#10B981' }) {
  return (
    <View style={styles.progressBarBg}>
      <View
        style={[
          styles.progressBarFill,
          {
            width: `${percentual}%`,
            backgroundColor: cor,
          },
        ]}
      />
    </View>
  );
}

function MetaItem({ goal, navigation, onDeletePress }) {
  const [menuVisible, setMenuVisible] = useState(false);
  const concluido = goal.status === 'Concluído';

  const frequencia =
    goal.tipoHabito || goal.type || 'Diário';

  return (
    <View style={styles.metaCard}>
      <View style={styles.topMetaRow}>
        <View style={[styles.circleSmall, { borderColor: goal.cor }]}>
          <Text style={[styles.circleSmallText, { color: goal.cor }]}>
            {goal.percentual}%
          </Text>
        </View>

        <View style={styles.metaInfo}>
          <Text style={styles.metaTitulo}>{goal.titulo}</Text>
          <Text style={styles.metaSubtitulo}>{goal.subtitulo}</Text>
          <Text style={styles.metaFrequency}>Frequência: {frequencia}</Text>
        </View>

        <View style={styles.rightColumn}>
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

          <TouchableOpacity
            style={styles.menuButton}
            onPress={() => setMenuVisible((prev) => !prev)}
          >
            <Text style={styles.menuButtonText}>⋮</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.progressArea}>
        <ProgressBar percentual={goal.percentual} cor={goal.cor} />
      </View>

      {menuVisible && (
        <View style={styles.contextMenu}>
          <TouchableOpacity
            style={styles.contextMenuItem}
            onPress={() => {
              setMenuVisible(false);
              navigation.navigate('GoalDetails', { goal });
            }}
          >
            <Text style={styles.contextMenuText}>Editar</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.contextMenuItem}
            onPress={() => {
              setMenuVisible(false);
              onDeletePress(goal);
            }}
          >
            <Text style={[styles.contextMenuText, styles.deleteText]}>Excluir</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
}

const GoalsProgress = ({ navigation }) => {
  const [metas, setMetas] = useState(mockGoals);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedGoal, setSelectedGoal] = useState(null);
  const [successVisible, setSuccessVisible] = useState(false);

  const completedCount = useMemo(
    () => metas.filter((item) => item.status === 'Concluído').length,
    [metas]
  );

  function handleDeletePress(goal) {
    setSelectedGoal(goal);
    setShowDeleteModal(true);
  }

  function confirmDelete() {
    if (!selectedGoal) return;

    setMetas((prev) => prev.filter((item) => item.id !== selectedGoal.id));
    setShowDeleteModal(false);
    setSelectedGoal(null);
    setSuccessVisible(true);

    setTimeout(() => {
      setSuccessVisible(false);
    }, 2000);
  }

  function renderGoal({ item }) {
    return (
      <MetaItem
        goal={item}
        navigation={navigation}
        onDeletePress={handleDeletePress}
      />
    );
  }

  return (
    <StyledContainer>
      <ScrollView showsVerticalScrollIndicator={false}>
        <InnerContainer>
          <View style={styles.topRow}>
            <View style={styles.leftHeader}>
              <TouchableOpacity onPress={() => navigation.goBack()}>
                <Text style={styles.backArrow}>←</Text>
              </TouchableOpacity>

              <Text style={styles.pageTitle}>Suas Metas</Text>
            </View>

            <TouchableOpacity style={styles.filterButton}>
              <Text style={styles.filterText}>Todas</Text>
              <Text style={styles.filterArrow}>⌄</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.summaryRow}>
            <Text style={styles.summaryText}>
              Total de metas: {metas.length}
            </Text>
            <Text style={styles.summaryText}>
              Concluídas: {completedCount}
            </Text>
          </View>

          {successVisible && (
            <View style={styles.successBox}>
              <Text style={styles.successText}>Meta excluída com sucesso!</Text>
            </View>
          )}

          <View style={styles.listCard}>
            <FlatList
              data={metas}
              keyExtractor={(item) => String(item.id)}
              renderItem={renderGoal}
              scrollEnabled={false}
            />
          </View>
        </InnerContainer>
      </ScrollView>

      <Modal
        visible={showDeleteModal}
        transparent
        animationType="fade"
        onRequestClose={() => setShowDeleteModal(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalBox}>
            <Text style={styles.modalTitle}>Confirmar exclusão</Text>
            <Text style={styles.modalMessage}>
              Tem certeza que deseja excluir esta meta?
            </Text>

            <View style={styles.modalButtonsRow}>
              <TouchableOpacity
                style={[styles.modalButton, styles.cancelButton]}
                onPress={() => setShowDeleteModal(false)}
              >
                <Text style={styles.cancelButtonText}>Cancelar</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[styles.modalButton, styles.deleteButton]}
                onPress={confirmDelete}
              >
                <Text style={styles.deleteButtonText}>Excluir</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </StyledContainer>
  );
};

export default GoalsProgress;

const styles = StyleSheet.create({
  topRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 24,
  },
  leftHeader: {
    flexDirection: 'row',
    alignItems: 'center',
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
  },
  filterButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#E5E7EB',
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderRadius: 10,
  },
  filterText: {
    fontSize: 15,
    color: '#1F2937',
    marginRight: 8,
  },
  filterArrow: {
    fontSize: 16,
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
  successBox: {
    backgroundColor: '#EAF9EC',
    borderRadius: 14,
    paddingVertical: 10,
    paddingHorizontal: 14,
    marginBottom: 14,
  },
  successText: {
    color: '#10B981',
    fontWeight: '700',
    textAlign: 'center',
  },
  listCard: {
    backgroundColor: '#fff',
    borderRadius: 22,
    padding: 16,
  },
  metaCard: {
    backgroundColor: '#FAFAFA',
    borderRadius: 18,
    padding: 14,
    marginBottom: 14,
    position: 'relative',
  },
  topMetaRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  circleSmall: {
    width: 56,
    height: 56,
    borderRadius: 28,
    borderWidth: 4,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  circleSmallText: {
    fontSize: 14,
    fontWeight: '700',
  },
  metaInfo: {
    flex: 1,
    paddingRight: 8,
  },
  metaTitulo: {
    fontSize: 17,
    fontWeight: '700',
    color: '#1F2937',
    marginBottom: 4,
  },
  metaSubtitulo: {
    fontSize: 14,
    color: '#4B5563',
    marginBottom: 4,
  },
  metaFrequency: {
    fontSize: 13,
    color: '#6B7280',
  },
  rightColumn: {
    alignItems: 'flex-end',
  },
  badge: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 16,
    marginBottom: 8,
  },
  badgeCompleto: {
    backgroundColor: '#EAF9EC',
  },
  badgeIncompleto: {
    backgroundColor: '#F1F1F1',
  },
  badgeText: {
    fontSize: 13,
    fontWeight: '600',
  },
  badgeTextCompleto: {
    color: '#7ED957',
  },
  badgeTextIncompleto: {
    color: '#A3A3A3',
  },
  menuButton: {
    paddingHorizontal: 8,
    paddingVertical: 2,
  },
  menuButtonText: {
    fontSize: 22,
    color: '#1F2937',
    lineHeight: 22,
  },
  progressArea: {
    marginTop: 12,
  },
  progressBarBg: {
    width: '100%',
    height: 10,
    backgroundColor: '#E5E7EB',
    borderRadius: 999,
    overflow: 'hidden',
  },
  progressBarFill: {
    height: '100%',
    borderRadius: 999,
  },
  contextMenu: {
    marginTop: 12,
    borderTopWidth: 1,
    borderTopColor: '#E5E7EB',
    paddingTop: 10,
  },
  contextMenuItem: {
    paddingVertical: 8,
  },
  contextMenuText: {
    fontSize: 15,
    color: '#1F2937',
    fontWeight: '600',
  },
  deleteText: {
    color: '#EF4444',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.35)',
    justifyContent: 'center',
    paddingHorizontal: 24,
  },
  modalBox: {
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 22,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1F2937',
    marginBottom: 10,
  },
  modalMessage: {
    fontSize: 15,
    color: '#4B5563',
    marginBottom: 20,
  },
  modalButtonsRow: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  modalButton: {
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderRadius: 12,
    marginLeft: 10,
  },
  cancelButton: {
    backgroundColor: '#F3F4F6',
  },
  cancelButtonText: {
    color: '#1F2937',
    fontWeight: '700',
  },
  deleteButton: {
    backgroundColor: '#EF4444',
  },
  deleteButtonText: {
    color: '#fff',
    fontWeight: '700',
  },
});