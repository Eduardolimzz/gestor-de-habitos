import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Alert,
} from 'react-native';
import { useAuth } from '../../context/AuthContext';

function CampoTexto({ label, value, onChangeText, secureTextEntry = false, keyboardType }) {
  const [mostrarSenha, setMostrarSenha] = useState(false);
  const isSenha = secureTextEntry;

  return (
    <View style={styles.campoWrapper}>
      <Text style={styles.campoLabel}>{label}</Text>
      <View style={styles.inputRow}>
        <TextInput
          style={styles.input}
          value={value}
          onChangeText={onChangeText}
          secureTextEntry={isSenha && !mostrarSenha}
          keyboardType={keyboardType}
          autoCapitalize="none"
          placeholderTextColor="#9CA3AF"
        />
        {isSenha ? (
          <TouchableOpacity onPress={() => setMostrarSenha((v) => !v)} style={styles.iconBtn}>
            <Text style={styles.iconText}>{mostrarSenha ? '👁' : '🙈'}</Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity style={styles.iconBtn}>
            <Text style={styles.iconText}>✏️</Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
}

export default function Conta({ navigation }) {
  const { user, updateUser } = useAuth();

  const [nome, setNome] = useState(user?.name ?? '');
  const [email, setEmail] = useState(user?.email ?? '');
  const [senha, setSenha] = useState('');
  const [confirmSenha, setConfirmSenha] = useState('');

  function handleAtualizar() {
    if (senha && senha !== confirmSenha) {
      Alert.alert('Atenção', 'As senhas não coincidem.');
      return;
    }
    updateUser({ name: nome, email });
    Alert.alert('Sucesso', 'Dados atualizados!');
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
          <Text style={styles.backArrow}>←</Text>
        </TouchableOpacity>
        <Text style={styles.pageTitle}>Conta</Text>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scroll}>
        <CampoTexto label="Nome" value={nome} onChangeText={setNome} />
        <CampoTexto label="Email" value={email} onChangeText={setEmail} keyboardType="email-address" />
        <CampoTexto label="Senha" value={senha} onChangeText={setSenha} secureTextEntry />
        <CampoTexto label="Confirmação da senha" value={confirmSenha} onChangeText={setConfirmSenha} secureTextEntry />

        <TouchableOpacity style={styles.button} activeOpacity={0.85} onPress={handleAtualizar}>
          <Text style={styles.buttonText}>Atualizar</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F7F8FA',
    paddingTop: 52,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    marginBottom: 28,
  },
  backBtn: { marginRight: 12 },
  backArrow: { fontSize: 26, color: '#1F2937' },
  pageTitle: { fontSize: 20, fontWeight: '800', color: '#1F2937' },
  scroll: {
    paddingHorizontal: 20,
    paddingBottom: 40,
  },
  campoWrapper: {
    marginBottom: 20,
  },
  campoLabel: {
    fontSize: 13,
    fontWeight: '600',
    color: '#6B7280',
    marginBottom: 6,
  },
  inputRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    paddingHorizontal: 14,
    height: 50,
  },
  input: {
    flex: 1,
    fontSize: 15,
    color: '#1F2937',
  },
  iconBtn: { paddingLeft: 8 },
  iconText: { fontSize: 16 },
  button: {
    backgroundColor: '#39B54A',
    borderRadius: 10,
    paddingVertical: 16,
    alignItems: 'center',
    marginTop: 12,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '700',
  },
});
