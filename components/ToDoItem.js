import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const priorityBadgeColor = (p) => {
  if (p === 'High') return '#ff6b6b';
  if (p === 'Medium') return '#ffb84d';
  return '#8ccf8c';
};

export default function ToDoItem({ todo, onDelete, onToggle, onEdit }) {
  return (
    <View style={styles.container}>
      <View style={{ flex: 1 }}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}>
          <Text
            style={[
              styles.title,
              todo.completed && {
                textDecorationLine: 'line-through',
                color: '#6b6b6b',
              },
            ]}>
            {todo.title}
          </Text>
          <View
            style={[
              styles.badge,
              { backgroundColor: priorityBadgeColor(todo.priority) },
            ]}>
            <Text style={{ color: '#fff', fontWeight: '700' }}>
              {todo.priority}
            </Text>
          </View>
        </View>
        <Text
          style={[
            styles.desc,
            todo.completed && {
              textDecorationLine: 'line-through',
              color: '#8a8a8a',
            },
          ]}
          numberOfLines={2}>
          {todo.description}
        </Text>
        <Text style={styles.meta}>
          {todo.category} • {new Date(todo.createdAt).toLocaleString()}
        </Text>
      </View>

      <View style={styles.actions}>
        <TouchableOpacity onPress={onEdit} style={styles.actionBtn}>
          <Text>Edit</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={onToggle}
          style={[
            styles.actionBtn,
            { backgroundColor: todo.completed ? '#f0f0f0' : '#d3f8d3' },
          ]}>
          <Text>{todo.completed ? 'Unmark' : 'Complete'}</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={onDelete}
          style={[styles.actionBtn, { backgroundColor: '#ffd6d6' }]}>
          <Text>Delete</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    padding: 10,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#f0f0f0',
    marginBottom: 8,
    backgroundColor: '#fff',
  },
  title: { fontWeight: '700', fontSize: 16 },
  desc: { color: '#444', marginTop: 4 },
  meta: { color: '#999', fontSize: 12, marginTop: 6 },
  badge: { paddingHorizontal: 8, paddingVertical: 4, borderRadius: 6 },
  actions: {
    justifyContent: 'space-between',
    marginLeft: 8,
    alignItems: 'flex-end',
  },
  actionBtn: {
    padding: 6,
    backgroundColor: '#eee',
    borderRadius: 6,
    marginBottom: 6,
  },
});
