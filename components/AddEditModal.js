// import React, { useEffect, useState } from 'react';
// import {
//   Modal,
//   View,
//   Text,
//   TextInput,
//   TouchableOpacity,
//   StyleSheet,
//   Picker,
//   Platform,
// } from 'react-native';

// export default function AddEditModal({
//   visible,
//   onClose,
//   onSubmit,
//   defaultValues,
//   categories,
//   priorities,
// }) {
//   const [title, setTitle] = useState('');
//   const [description, setDescription] = useState('');
//   const [category, setCategory] = useState(categories[0]);
//   const [priority, setPriority] = useState(priorities[1]);

//   useEffect(() => {
//     if (defaultValues) {
//       setTitle(defaultValues.title || '');
//       setDescription(defaultValues.description || '');
//       setCategory(defaultValues.category || categories[0]);
//       setPriority(defaultValues.priority || priorities[1]);
//     } else {
//       setTitle('');
//       setDescription('');
//       setCategory(categories[0]);
//       setPriority(priorities[1]);
//     }
//   }, [defaultValues, visible]);

//   const submit = () => {
//     if (!title.trim()) {
//       alert('Please enter title');
//       return;
//     }
//     onSubmit({
//       title: title.trim(),
//       description: description.trim(),
//       category,
//       priority,
//     });
//   };

//   return (
//     <Modal visible={visible} animationType="slide" transparent>
//       <View style={styles.backdrop}>
//         <View style={styles.box}>
//           <Text style={styles.heading}>
//             {defaultValues ? 'Edit Task' : 'Add New Task'}
//           </Text>

//           <TextInput
//             placeholder="Title"
//             value={title}
//             onChangeText={setTitle}
//             style={styles.input}
//           />
//           <TextInput
//             placeholder="Description"
//             value={description}
//             onChangeText={setDescription}
//             style={[styles.input, { height: 80 }]}
//             multiline
//           />

//           {/* Category */}
//           {Platform.OS === 'android' ? (
//             <>
//               <Text style={styles.label}>Category</Text>
//               <View style={styles.pickerWrap}>
//                 <Picker selectedValue={category} onValueChange={setCategory}>
//                   {categories.map((c) => (
//                     <Picker.Item key={c} label={c} value={c} />
//                   ))}
//                 </Picker>
//               </View>
//               <Text style={styles.label}>Priority</Text>
//               <View style={styles.pickerWrap}>
//                 <Picker selectedValue={priority} onValueChange={setPriority}>
//                   {priorities.map((p) => (
//                     <Picker.Item key={p} label={p} value={p} />
//                   ))}
//                 </Picker>
//               </View>
//             </>
//           ) : (
//             <>
//               <Text style={styles.label}>Category</Text>
//               <View style={styles.row}>
//                 {categories.map((c) => (
//                   <TouchableOpacity
//                     key={c}
//                     onPress={() => setCategory(c)}
//                     style={[styles.chip, category === c && styles.chipActive]}>
//                     <Text style={category === c ? { color: '#fff' } : {}}>
//                       {c}
//                     </Text>
//                   </TouchableOpacity>
//                 ))}
//               </View>

//               <Text style={styles.label}>Priority</Text>
//               <View style={styles.row}>
//                 {priorities.map((p) => (
//                   <TouchableOpacity
//                     key={p}
//                     onPress={() => setPriority(p)}
//                     style={[styles.chip, priority === p && styles.chipActive]}>
//                     <Text style={priority === p ? { color: '#fff' } : {}}>
//                       {p}
//                     </Text>
//                   </TouchableOpacity>
//                 ))}
//               </View>
//             </>
//           )}

//           <View style={styles.actions}>
//             <TouchableOpacity
//               onPress={onClose}
//               style={[styles.btn, { backgroundColor: '#eee' }]}>
//               <Text>Cancel</Text>
//             </TouchableOpacity>
//             <TouchableOpacity
//               onPress={submit}
//               style={[styles.btn, { backgroundColor: '#2b6ef6' }]}>
//               <Text style={{ color: '#fff' }}>Save</Text>
//             </TouchableOpacity>
//           </View>
//         </View>
//       </View>
//     </Modal>
//   );
// }

// const styles = StyleSheet.create({
//   backdrop: {
//     flex: 1,
//     backgroundColor: 'rgba(0,0,0,0.4)',
//     justifyContent: 'center',
//     padding: 16,
//   },
//   box: { backgroundColor: '#fff', borderRadius: 12, padding: 16 },
//   heading: { fontSize: 18, fontWeight: '700', marginBottom: 8 },
//   input: {
//     borderWidth: 1,
//     borderColor: '#eee',
//     backgroundColor: '#fafafa',
//     padding: 10,
//     borderRadius: 8,
//     marginBottom: 8,
//   },
//   actions: {
//     flexDirection: 'row',
//     justifyContent: 'flex-end',
//     gap: 8,
//     marginTop: 8,
//   },
//   btn: { paddingVertical: 10, paddingHorizontal: 14, borderRadius: 8 },
//   row: { flexDirection: 'row', gap: 8, marginVertical: 8 },
//   chip: {
//     paddingHorizontal: 10,
//     paddingVertical: 6,
//     borderRadius: 20,
//     backgroundColor: '#f0f0f0',
//     marginRight: 8,
//   },
//   chipActive: { backgroundColor: '#2b6ef6' },
//   label: { fontWeight: '600', marginTop: 4, marginBottom: 4 },
//   pickerWrap: {
//     borderWidth: 1,
//     borderColor: '#eee',
//     borderRadius: 8,
//     backgroundColor: '#fafafa',
//     marginBottom: 8,
//   },
// });

import React, { useEffect, useState } from 'react';
import {
  Modal,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  Platform,
} from 'react-native';
import { Picker } from '@react-native-picker/picker'; // safer import

export default function AddEditModal({
  visible,
  onClose,
  onSubmit,
  defaultValues,
  categories,
  priorities,
}) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState(categories[0]);
  const [priority, setPriority] = useState(priorities[1]);

  useEffect(() => {
    if (defaultValues) {
      setTitle(defaultValues.title || '');
      setDescription(defaultValues.description || '');
      setCategory(defaultValues.category || categories[0]);
      setPriority(defaultValues.priority || priorities[1]);
    } else {
      setTitle('');
      setDescription('');
      setCategory(categories[0]);
      setPriority(priorities[1]);
    }
  }, [defaultValues, visible]);

  const submit = () => {
    // ✅ Full validation for all fields
    if (!title.trim()) {
      Alert.alert('Validation', 'Please enter a title.');
      return;
    }
    if (!description.trim()) {
      Alert.alert('Validation', 'Please enter a description.');
      return;
    }
    if (!category) {
      Alert.alert('Validation', 'Please select a category.');
      return;
    }
    if (!priority) {
      Alert.alert('Validation', 'Please select a priority level.');
      return;
    }

    onSubmit({
      title: title.trim(),
      description: description.trim(),
      category,
      priority,
    });
  };

  return (
    <Modal visible={visible} animationType="slide" transparent>
      <View style={styles.backdrop}>
        <View style={styles.box}>
          <Text style={styles.heading}>
            {defaultValues ? 'Edit Task' : 'Add New Task'}
          </Text>

          <TextInput
            placeholder="Title *"
            value={title}
            onChangeText={setTitle}
            style={styles.input}
          />
          <TextInput
            placeholder="Description *"
            value={description}
            onChangeText={setDescription}
            style={[styles.input, { height: 80 }]}
            multiline
          />

          {/* Category */}
          {Platform.OS === 'android' ? (
            <>
              <Text style={styles.label}>Category *</Text>
              <View style={styles.pickerWrap}>
                <Picker
                  selectedValue={category}
                  onValueChange={(val) => setCategory(val)}>
                  {categories.map((c) => (
                    <Picker.Item key={c} label={c} value={c} />
                  ))}
                </Picker>
              </View>

              <Text style={styles.label}>Priority *</Text>
              <View style={styles.pickerWrap}>
                <Picker
                  selectedValue={priority}
                  onValueChange={(val) => setPriority(val)}>
                  {priorities.map((p) => (
                    <Picker.Item key={p} label={p} value={p} />
                  ))}
                </Picker>
              </View>
            </>
          ) : (
            <>
              <Text style={styles.label}>Category *</Text>
              <View style={styles.row}>
                {categories.map((c) => (
                  <TouchableOpacity
                    key={c}
                    onPress={() => setCategory(c)}
                    style={[styles.chip, category === c && styles.chipActive]}>
                    <Text style={category === c ? { color: '#fff' } : {}}>
                      {c}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>

              <Text style={styles.label}>Priority *</Text>
              <View style={styles.row}>
                {priorities.map((p) => (
                  <TouchableOpacity
                    key={p}
                    onPress={() => setPriority(p)}
                    style={[styles.chip, priority === p && styles.chipActive]}>
                    <Text style={priority === p ? { color: '#fff' } : {}}>
                      {p}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </>
          )}

          <View style={styles.actions}>
            <TouchableOpacity
              onPress={onClose}
              style={[styles.btn, { backgroundColor: '#eee' }]}>
              <Text>Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={submit}
              style={[styles.btn, { backgroundColor: '#2b6ef6' }]}>
              <Text style={{ color: '#fff' }}>Save</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  backdrop: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.4)',
    justifyContent: 'center',
    padding: 16,
  },
  box: { backgroundColor: '#fff', borderRadius: 12, padding: 16 },
  heading: { fontSize: 18, fontWeight: '700', marginBottom: 8 },
  input: {
    borderWidth: 1,
    borderColor: '#eee',
    backgroundColor: '#fafafa',
    padding: 10,
    borderRadius: 8,
    marginBottom: 8,
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    gap: 8,
    marginTop: 8,
  },
  btn: { paddingVertical: 10, paddingHorizontal: 14, borderRadius: 8 },
  row: { flexDirection: 'row', flexWrap: 'wrap', gap: 8, marginVertical: 8 },
  chip: {
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 20,
    backgroundColor: '#f0f0f0',
    marginRight: 8,
  },
  chipActive: { backgroundColor: '#2b6ef6' },
  label: { fontWeight: '600', marginTop: 4, marginBottom: 4 },
  pickerWrap: {
    borderWidth: 1,
    borderColor: '#eee',
    borderRadius: 8,
    backgroundColor: '#fafafa',
    marginBottom: 8,
  },
});

