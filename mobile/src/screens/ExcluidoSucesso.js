import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Modal,
} from 'react-native';

/**
 * ExcluidoSucesso
 * Modal de feedback após excluir um hábito com sucesso.
 *
 * Props:
 *   - visible: boolean     → controla se o modal aparece
 *   - onClose: function    → chamado ao pressionar "Ok" ou "X"
 *
 * Exemplo de uso:
 *   <ExcluidoSucesso
 *     visible={showSuccess}
 *     onClose={() => {
 *       setShowSuccess(false);
 *       navigation.navigate('AllHabits');
 *     }}
 *   />
 */
export default function ExcluidoSucesso({ visible, onClose }) {
  return (
    <Modal
      transparent
      animationType="fade"
      visible={visible}
      onRequestClose={onClose}
    >
      <View style={styles.overlay}>
        <View style={styles.card}>

          {/* Botão fechar (X) */}
          <TouchableOpacity style={styles.closeButton} onPress={onClose}>
            <Text style={styles.closeText}>✕</Text>
          </TouchableOpacity>

          {/* Ícone lixeira com check verde */}
          <View style={styles.iconContainer}>
            <Text style={styles.trashIcon}>🗑</Text>
            <View style={styles.checkBadge}>
              <Text style={styles.checkText}>✓</Text>
            </View>
          </View>

          {/* Mensagem */}
          <Text style={styles.message}>Excluído com sucesso!</Text>

          {/* Botão Ok */}
          <TouchableOpacity
            style={styles.okButton}
            activeOpacity={0.85}
            onPress={onClose}
          >
            <Text style={styles.okButtonText}>Ok</Text>
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

  // --- Ícone lixeira + check ---
  iconContainer: {
    marginTop: 16,
    marginBottom: 16,
    position: 'relative',
    width: 64,
    height: 64,
    alignItems: 'center',
    justifyContent: 'center',
  },
  trashIcon: {
    fontSize: 48,
  },
  checkBadge: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    width: 22,
    height: 22,
    borderRadius: 11,
    backgroundColor: '#3DBE29',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: '#FFFFFF',
  },
  checkText: {
    color: '#FFFFFF',
    fontSize: 11,
    fontWeight: 'bold',
  },

  // --- Mensagem ---
  message: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1A1A1A',
    textAlign: 'center',
    marginBottom: 24,
  },

  // --- Botão Ok ---
  okButton: {
    width: '100%',
    backgroundColor: '#3DBE29',
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  okButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
});
