import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';

/**
 * HabitAdicionado
 * Tela de confirmação após criar um hábito/meta com sucesso.
 *
 * Navegação esperada:
 *   - Botão "OK" → navigation.navigate('Home') ou outra tela principal
 */
export default function HabitAdicionado({ navigation }) {
  return (
    <SafeAreaView style={styles.container}>
      {/* Ícone de bloco de notas com check */}
      <View style={styles.iconContainer}>
        {/* Bloco de notas (simulado com views) */}
        <View style={styles.notepad}>
          <View style={styles.notepadClip} />
          <View style={styles.noteLine} />
          <View style={styles.noteLine} />
          <View style={styles.noteLine} />
          {/* Caneta */}
          <View style={styles.pen} />
        </View>
        {/* Badge de check verde */}
        <View style={styles.checkBadge}>
          <Text style={styles.checkText}>✓</Text>
        </View>
      </View>

      {/* Título */}
      <Text style={styles.title}>Concluído!</Text>

      {/* Subtítulo */}
      <Text style={styles.subtitle}>
        Nova meta de hábito adicionada.{'\n'}
        Vamos fazer o nosso melhor para{'\n'}
        ajudar você com sua meta!
      </Text>

      {/* Botão OK */}
      <TouchableOpacity
        style={styles.button}
        activeOpacity={0.85}
        onPress={() => navigation.navigate('Home')}
      >
        <Text style={styles.buttonText}>OK</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 32,
  },

  // --- Ícone ---
  iconContainer: {
    width: 130,
    height: 130,
    marginBottom: 32,
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
    position: 'relative',
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
  checkText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: 'bold',
  },

  // --- Textos ---
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#1A1A1A',
    marginBottom: 14,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 15,
    color: '#555555',
    textAlign: 'center',
    lineHeight: 22,
    marginBottom: 40,
  },

  // --- Botão ---
  button: {
    width: '100%',
    backgroundColor: '#3DBE29',
    paddingVertical: 16,
    borderRadius: 10,
    alignItems: 'center',
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
});