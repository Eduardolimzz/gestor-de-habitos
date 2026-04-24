import React, { useState } from 'react';
import {
    View,
    Text,
    FlatList,
    TouchableOpacity,
    ScrollView,
    StyleSheet,
} from 'react-native';

function buildDates() {
    const meses = ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'];
    const dates = [];
    const hoje = new Date();
    for (let i = 0; i < 7; i++) {
        const d = new Date(hoje);
        d.setDate(hoje.getDate() - i);
        dates.push({ id: String(i), dia: d.getDate(), mes: meses[d.getMonth()] });
    }
    return dates;
}

const dates = buildDates();

function HabitRow({ item, onToggle, onDelete }) {
    const [menuOpen, setMenuOpen] = useState(false);

    return (
        <View style={[styles.habitItem, item.done && styles.habitDoneBg]}>
            <Text style={[styles.habitName, item.done && styles.habitNameDone]}>
                {item.title}
            </Text>

            {menuOpen ? (
                <View style={styles.inlineMenu}>
                    <TouchableOpacity onPress={() => setMenuOpen(false)}>
                        <Text style={styles.menuEdit}>Editar</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => { setMenuOpen(false); onDelete(item.id); }}>
                        <Text style={styles.menuDelete}>Excluir</Text>
                    </TouchableOpacity>
                </View>
            ) : (
                <View style={styles.habitActions}>
                    <TouchableOpacity
                        style={[styles.checkbox, item.done && styles.checkboxDone]}
                        onPress={() => onToggle(item.id)}
                    >
                        {item.done && <Text style={styles.checkMark}>✓</Text>}
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => setMenuOpen(true)} style={styles.dotsBtn}>
                        <Text style={styles.dots}>⋮</Text>
                    </TouchableOpacity>
                </View>
            )}
        </View>
    );
}

export default function AllHabits({ route, navigation }) {
    const [habits, setHabits] = useState(route.params?.habits || []);
    const [selectedDate, setSelectedDate] = useState(dates[0].id);

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
                    <Text style={styles.backArrow}>←</Text>
                </TouchableOpacity>
                <Text style={styles.pageTitle}>Seus hábitos</Text>
            </View>


            <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={styles.dateScrollContent}
                style={styles.dateScroll}
            >
                {dates.map((d) => (
                    <TouchableOpacity
                        key={d.id}
                        style={[styles.dateCard, selectedDate === d.id && styles.dateCardActive]}
                        onPress={() => setSelectedDate(d.id)}
                    >
                        <Text style={[styles.dateNum, selectedDate === d.id && styles.dateTextActive]}>{d.dia}</Text>
                        <Text style={[styles.dateMes, selectedDate === d.id && styles.dateTextActive]}>{d.mes}</Text>
                    </TouchableOpacity>
                ))}
            </ScrollView>

            <Text style={styles.sectionTitle}>Hábitos de hoje</Text>

            <FlatList
                data={habits}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                    <HabitRow
                        item={item}
                        onToggle={(id) => setHabits((prev) => prev.map((h) => h.id === id ? { ...h, done: !h.done } : h))}
                        onDelete={(id) => setHabits((prev) => prev.filter((h) => h.id !== id))}
                    />
                )}
                contentContainerStyle={styles.listContent}
                ListEmptyComponent={<Text style={styles.emptyText}>Nenhum hábito cadastrado.</Text>}
            />
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
        paddingHorizontal: 16,
        marginBottom: 12,
    },
    backBtn: { marginRight: 12 },
    backArrow: { fontSize: 26, color: '#1F2937' },
    pageTitle: { fontSize: 20, fontWeight: '800', color: '#1F2937' },
    dateScroll: { marginBottom: 4 ,
    flexGrow: 0.2, },
    dateScrollContent: { paddingHorizontal: 16, gap: 8 },
    dateCard: {
        width: 56,
        height: 64,
        borderRadius: 10,
        backgroundColor: '#E5E7EB',
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 8,
    },
    dateCardActive: { backgroundColor: '#39B54A' },
    dateNum: { fontSize: 18, fontWeight: '800', color: '#374151' },
    dateMes: { fontSize: 12, fontWeight: '600', color: '#6B7280', marginTop: 2 },
    dateTextActive: { color: '#fff' },
    sectionTitle: {
        fontSize: 18,
        fontWeight: '800',
        color: '#1F2937',
        paddingHorizontal: 16,
        marginTop: 2,
        marginBottom: 8,
    },
    listContent: { paddingHorizontal: 16, paddingBottom: 24 },
    habitItem: {
        backgroundColor: '#fff',
        borderRadius: 8,
        paddingHorizontal: 14,
        height: 52,
        marginBottom: 10,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    habitDoneBg: { backgroundColor: '#E9F8EC' },
    habitName: { flex: 1, fontSize: 15, fontWeight: '600', color: '#1F2937' },
    habitNameDone: { color: '#39B54A' },
    habitActions: { flexDirection: 'row', alignItems: 'center' },
    checkbox: {
        width: 26,
        height: 26,
        borderRadius: 6,
        borderWidth: 2,
        borderColor: '#9CA3AF',
        alignItems: 'center',
        justifyContent: 'center',
    },
    checkboxDone: { backgroundColor: '#39B54A', borderColor: '#39B54A' },
    checkMark: { color: '#fff', fontSize: 14, fontWeight: '800' },
    dotsBtn: { paddingHorizontal: 6, marginLeft: 6 },
    dots: { fontSize: 20, color: '#6B7280' },
    inlineMenu: { flexDirection: 'row', alignItems: 'center', gap: 16 },
    menuEdit: { fontSize: 14, fontWeight: '600', color: '#374151' },
    menuDelete: { fontSize: 14, fontWeight: '600', color: '#EF4444' },
    emptyText: { textAlign: 'center', color: '#9CA3AF', marginTop: 40, fontSize: 15 },
});
