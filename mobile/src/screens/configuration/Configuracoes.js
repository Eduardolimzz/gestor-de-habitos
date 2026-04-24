import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import { useAuth } from '../../context/AuthContext';

function MenuItem({ label, onPress }) {
  return (
    <TouchableOpacity style={styles.menuItem} onPress={onPress} activeOpacity={0.7}>
      <Text style={styles.menuLabel}>{label}</Text>
      <Text style={styles.menuArrow}>›</Text>
    </TouchableOpacity>
  );
}

export default function Configuracoes({ navigation }) {
  const { logout } = useAuth();

  function handleSair() {
    logout();
    navigation.reset({ index: 0, routes: [{ name: 'Signup' }] });
  }

  return (
    <View style={styles.container}>
      <Text style={styles.pageTitle}>Configurações</Text>

      <View style={styles.card}>
        <MenuItem label="Conta" onPress={() => navigation.navigate('Conta')} />
        <View style={styles.divider} />
        <MenuItem label="Sobre o app" onPress={() => navigation.navigate('SobreOApp')} />
      </View>

      <TouchableOpacity style={styles.sairBtn} onPress={handleSair}>
        <Text style={styles.sairText}>Sair</Text>
      </TouchableOpacity>

      <View style={styles.bottomNav}>
        <TouchableOpacity onPress={() => navigation.navigate('Home')}>
          <Text style={styles.navIcon}>⌂</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('Progress')}>
          <Text style={styles.navIcon}>⌁</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('Configuracoes')}>
          <Text style={styles.navIconActive}>⚙</Text>
        </TouchableOpacity>
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
  pageTitle: {
    fontSize: 26,
    fontWeight: '800',
    color: '#1F2937',
    marginBottom: 28,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 12,
    overflow: 'hidden',
  },
  menuItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 18,
    paddingVertical: 18,
  },
  menuLabel: {
    fontSize: 16,
    color: '#1F2937',
    fontWeight: '500',
  },
  menuArrow: {
    fontSize: 22,
    color: '#9CA3AF',
  },
  divider: {
    height: 1,
    backgroundColor: '#F3F4F6',
    marginHorizontal: 18,
  },
  sairBtn: {
    marginTop: 24,
    backgroundColor: '#fff',
    borderRadius: 12,
    paddingVertical: 18,
    paddingHorizontal: 18,
    alignItems: 'center',
  },
  sairText: {
    fontSize: 16,
    fontWeight: '700',
    color: '#EF4444',
  },
  bottomNav: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    height: 52,
    backgroundColor: '#fff',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: '#EEE',
  },
  navIcon: { fontSize: 24, color: '#999' },
  navIconActive: { fontSize: 24, color: '#39B54A' },
});
