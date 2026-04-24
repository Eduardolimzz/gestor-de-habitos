import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Modal,
} from 'react-native';

export default function HabitConcluido({ visible, onOk }) {
  return (
    <Modal transparent animationType="fade" visible={visible} onRequestClose={onOk}>
      <View style={styles.overlay}>
        <View style={styles.card}>
          <View style={styles.iconContainer}>
            <View style={styles.notepad}>
              <View style={styles.notepadClip} />
              <View style={styles.noteLine} />
              <View style={styles.noteLine} />
              <View style={styles.noteLine} />
              <View style={styles.pen} />
            </View>
            <View style={styles.checkBadge}>
              <Text style={styles.checkText}>✓</Text>
            </View>
          </View>

          <Text style={styles.title}>Concluído!</Text>
          <Text style={styles.subtitle}>
            Nova meta de hábito adicionada.{'\n'}
            Vamos fazer o nosso melhor para{'\n'}
            ajudar você com sua meta!
          </Text>

          <TouchableOpacity style={styles.button} activeOpacity={0.85} onPress={onOk}>
            <Text style={styles.buttonText}>OK</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.25)',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 32,
  },
  card: {
    width: '100%',
    backgroundColor: '#FFFFFF',
    borderRadius: 14,
    paddingHorizontal: 24,
    paddingTop: 32,
    paddingBottom: 28,
    alignItems: 'center',
    elevation: 6,
  },
  iconContainer: {
    width: 130,
    height: 130,
    marginBottom: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
  notepad: {
    width: 90,
    height: 110,
    backgroundColor: '#FFFFFF',
    borderWidth: 2,
    borderColor: '#3DBE29',
    borderRadius: 6,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 12,
  },
  notepadClip: {
    position: 'absolute',
    top: -10,
    width: 24,
    height: 18,
    borderWidth: 2,
    borderColor: '#3DBE29',
    borderRadius: 4,
    backgroundColor: '#FFFFFF',
  },
  noteLine: {
    width: '80%',
    height: 2,
    backgroundColor: '#3DBE29',
    borderRadius: 2,
    marginVertical: 4,
  },
  pen: {
    position: 'absolute',
    bottom: -14,
    left: 10,
    width: 10,
    height: 40,
    backgroundColor: '#3DBE29',
    borderRadius: 3,
    transform: [{ rotate: '-30deg' }],
  },
  checkBadge: {
    position: 'absolute',
    top: 2,
    right: 2,
    width: 26,
    height: 26,
    borderRadius: 13,
    backgroundColor: '#3DBE29',
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkText: { color: '#FFFFFF', fontSize: 14, fontWeight: 'bold' },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#1A1A1A',
    marginBottom: 12,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 15,
    color: '#555555',
    textAlign: 'center',
    lineHeight: 22,
    marginBottom: 32,
  },
  button: {
    width: '100%',
    backgroundColor: '#3DBE29',
    paddingVertical: 16,
    borderRadius: 10,
    alignItems: 'center',
  },
  buttonText: { color: '#FFFFFF', fontSize: 16, fontWeight: '600' },
});
