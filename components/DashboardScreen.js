import React, { useState, useEffect, useMemo } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Alert,
  ScrollView,
  Dimensions,
  Platform,
  SafeAreaView,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Crypto from 'expo-crypto';
import AddEditModal from '../components/AddEditModal';
import ToDoItem from '../components/ToDoItem';

const { width } = Dimensions.get('window');
const STORAGE_KEY = 'priority_todos_v1';
const CATEGORIES = ['Work', 'Personal', 'Urgent'];
const PRIORITIES = ['High', 'Medium', 'Low'];

export default function DashboardScreen({ navigation }) {
  const [todos, setTodos] = useState([]);
  const [filterText, setFilterText] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [editingTodo, setEditingTodo] = useState(null);

  const newId = Crypto.randomUUID();

  useEffect(() => {
    loadTodos();
  }, []);

  useEffect(() => {
    saveTodos();
  }, [todos]);

  const loadTodos = async () => {
    try {
      const raw = await AsyncStorage.getItem(STORAGE_KEY);
      if (raw) setTodos(JSON.parse(raw));
    } catch (e) {
      console.warn('Load todos error', e);
    }
  };

  const saveTodos = async () => {
    try {
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(todos));
    } catch (e) {
      console.warn('Save todos error', e);
    }
  };

  const addTodo = (data) => {
    const newTodo = {
      id: newId,
      title: data.title,
      description: data.description || '',
      priority: data.priority,
      category: data.category,
      completed: false,
      createdAt: Date.now(),
    };
    setTodos((prev) => [newTodo, ...prev]);
    setModalVisible(false);
  };

  const updateTodo = (id, data) => {
    setTodos((prev) => prev.map((t) => (t.id === id ? { ...t, ...data } : t)));
    setEditingTodo(null);
    setModalVisible(false);
  };

  const deleteTodo = (id) => {
    Alert.alert('Delete task', 'Are you sure you want to delete this task?', [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Delete',
        style: 'destructive',
        onPress: () => setTodos((prev) => prev.filter((t) => t.id !== id)),
      },
    ]);
  };

  const toggleComplete = (id) => {
    setTodos((prev) =>
      prev.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t))
    );
  };

  const priorityOrder = { High: 3, Medium: 2, Low: 1 };
  const sortTasks = (list) => {
    return [...list].sort((a, b) => {
      const pa = priorityOrder[a.priority] || 0;
      const pb = priorityOrder[b.priority] || 0;
      if (pa !== pb) return pb - pa;
      return b.createdAt - a.createdAt;
    });
  };

  const activeTodos = todos.filter((t) => !t.completed);
  const completedTodos = todos.filter((t) => t.completed);

  const filteredActive = activeTodos.filter(
    (t) =>
      t.title.toLowerCase().includes(filterText.toLowerCase()) ||
      t.description.toLowerCase().includes(filterText.toLowerCase())
  );

  const grouped = useMemo(() => {
    const map = {};
    CATEGORIES.forEach((c) => (map[c] = []));
    filteredActive.forEach((t) => {
      if (!map[t.category]) map[t.category] = [];
      map[t.category].push(t);
    });
    Object.keys(map).forEach((cat) => (map[cat] = sortTasks(map[cat])));
    return map;
  }, [filteredActive, todos]);

  const handleLogout = async () => {
    await AsyncStorage.removeItem('auth_token');
    navigation.replace('Login');
  };

  const openEdit = (todo) => {
    setEditingTodo(todo);
    setModalVisible(true);
  };

  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.container}>
        <View style={styles.headerRow}>
          <Text style={styles.headerTitle}>Dashboard</Text>
          <TouchableOpacity onPress={handleLogout} style={styles.logoutBtn}>
            <Text style={styles.logoutText}>Logout</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.controls}>
          <TextInput
            placeholder="Search title or description..."
            value={filterText}
            onChangeText={setFilterText}
            style={styles.search}
          />
          <TouchableOpacity
            style={styles.addBtn}
            onPress={() => {
              setEditingTodo(null);
              setModalVisible(true);
            }}>
            <Text style={styles.addBtnText}>+ Add</Text>
          </TouchableOpacity>
        </View>

        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 100 }}>
          {CATEGORIES.map((cat) => (
            <View key={cat} style={styles.categoryBlock}>
              <Text style={styles.categoryTitle}>
                {cat} ({grouped[cat]?.length || 0})
              </Text>
              {grouped[cat] && grouped[cat].length > 0 ? (
                grouped[cat].map((item) => (
                  <ToDoItem
                    key={item.id}
                    todo={item}
                    onDelete={() => deleteTodo(item.id)}
                    onToggle={() => toggleComplete(item.id)}
                    onEdit={() => openEdit(item)}
                  />
                ))
              ) : (
                <Text style={styles.noTask}>No tasks</Text>
              )}
            </View>
          ))}

          <View style={[styles.categoryBlock, { backgroundColor: '#fff8e6' }]}>
            <Text style={styles.categoryTitle}>
              Completed ({completedTodos.length})
            </Text>
            {completedTodos.length > 0 ? (
              completedTodos.map((item) => (
                <ToDoItem
                  key={item.id}
                  todo={item}
                  onDelete={() => deleteTodo(item.id)}
                  onToggle={() => toggleComplete(item.id)}
                  onEdit={() => openEdit(item)}
                />
              ))
            ) : (
              <Text style={styles.noTask}>No completed tasks</Text>
            )}
          </View>
        </ScrollView>

        <AddEditModal
          visible={modalVisible}
          onClose={() => {
            setModalVisible(false);
            setEditingTodo(null);
          }}
          onSubmit={(data) => {
            if (editingTodo) updateTodo(editingTodo.id, data);
            else addTodo(data);
          }}
          defaultValues={editingTodo}
          categories={CATEGORIES}
          priorities={PRIORITIES}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: '#f2f5fb',
    paddingTop: Platform.OS === 'ios' ? 10 : 28,
  },
  container: {
    flex: 1,
    paddingHorizontal: width * 0.04,
    paddingTop: Platform.OS === 'ios' ? 10 : 28,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  headerTitle: { fontSize: width * 0.06, fontWeight: '700', color: '#222' },
  logoutBtn: {
    backgroundColor: '#f43',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
  },
  logoutText: { color: '#fff', fontWeight: '600' },
  controls: {
    flexDirection: 'row',
    marginTop: 12,
    gap: 8,
    alignItems: 'center',
  },
  search: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 10,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  addBtn: {
    backgroundColor: '#2b6ef6',
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderRadius: 8,
  },
  addBtnText: { color: '#fff', fontWeight: '600' },
  categoryBlock: {
    marginTop: 12,
    backgroundColor: '#fff',
    padding: 12,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#eee',
  },
  categoryTitle: { fontWeight: '700', fontSize: width * 0.045, marginBottom: 8 },
  noTask: { color: '#666', marginBottom: 8 },
});
