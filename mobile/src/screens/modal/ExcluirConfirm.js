import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Modal,
} from 'react-native';

/**
 * ExcluirConfirmacao
 * Modal de confirmação antes de excluir um hábito.
 *
 * Props:
 *   - visible: boolean         → controla se o modal aparece
 *   - onConfirm: function      → chamado ao pressionar "Excluir"
 *   - onCancel: function       → chamado ao pressionar "Cancelar" ou "X"
 *
 * Exemplo de uso:
 *   <ExcluirConfirmacao
 *     visible={showModal}
 *     onConfirm={() => handleDelete()}
 *     onCancel={() => setShowModal(false)}
 *   />
 */
export default function ExcluirConfirmacao({ visible, onConfirm, onCancel }) {
  return (
    <Modal
      transparent
      animationType="fade"
      visible={visible}
      onRequestClose={onCancel}
    >
      <View style={styles.overlay}>
        <View style={styles.card}>

          {/* Botão fechar (X) */}
          <TouchableOpacity style={styles.closeButton} onPress={onCancel}>
            <Text style={styles.closeText}>✕</Text>
          </TouchableOpacity>

          {/* Ícone lixeira */}
          <View style={styles.iconContainer}>
            <Text style={styles.trashIcon}>🗑</Text>
          </View>

          {/* Mensagem */}
          <Text style={styles.message}>Tem certeza que deseja excluir?</Text>

          {/* Botão Excluir */}
          <TouchableOpacity
            style={styles.deleteButton}
            activeOpacity={0.85}
            onPress={onConfirm}
          >
            <Text style={styles.deleteButtonText}>Excluir</Text>
          </TouchableOpacity>

          {/* Botão Cancelar */}
          <TouchableOpacity
            style={styles.cancelButton}
            activeOpacity={0.75}
            onPress={onCancel}
          >
            <Text style={styles.cancelButtonText}>Cancelar</Text>
          </TouchableOpacity>

        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  // --- Fundo escurecido ---
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.25)',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 32,
  },

  // --- Card branco ---
  card: {
    width: '100%',
    backgroundColor: '#FFFFFF',
    borderRadius: 14,
    paddingHorizontal: 24,
    paddingTop: 20,
    paddingBottom: 28,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.12,
    shadowRadius: 12,
    elevation: 6,
  },

  // --- Fechar ---
  closeButton: {
    position: 'absolute',
    top: 14,
    right: 16,
    padding: 4,
  },
  closeText: {
    fontSize: 16,
    color: '#999999',
  },

  // --- Ícone ---
  iconContainer: {
    marginTop: 16,
    marginBottom: 16,
  },
  trashIcon: {
    fontSize: 48,
  },

  // --- Mensagem ---
  message: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1A1A1A',
    textAlign: 'center',
    marginBottom: 24,
  },

  // --- Botão Excluir ---
  deleteButton: {
    width: '100%',
    backgroundColor: '#3DBE29',
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 12,
  },
  deleteButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },

  // --- Botão Cancelar ---
  cancelButton: {
    paddingVertical: 8,
  },
  cancelButtonText: {
    color: '#555555',
    fontSize: 15,
    fontWeight: '500',
  },
});
