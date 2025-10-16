// import React, { useState, useEffect } from 'react';
// import {
//   View,
//   Text,
//   TextInput,
//   TouchableOpacity,
//   StyleSheet,
//   Alert,
//   ActivityIndicator,
// } from 'react-native';
// import AsyncStorage from '@react-native-async-storage/async-storage';

// export default function LoginScreen({ navigation }) {
//   const [username, setUsername] = useState('');
//   const [password, setPassword] = useState('');
//   const [loading, setLoading] = useState(false);

//   useEffect(() => {
//     (async () => {
//       const token = await AsyncStorage.getItem('auth_token');
//       if (token) navigation.replace('Dashboard');
//     })();
//   }, []);

//   const handleLogin = async () => {
//     if (!username || !password) {
//       Alert.alert('Error', 'Please enter username and password');
//       return;
//     }
//     setLoading(true);
//     fetch('https://dummyjson.com/auth/login', {
//       method: 'POST',
//       headers: { 'Content-Type': 'application/json' },
//       body: JSON.stringify({
//         username: username,
//         password: password,
//         expiresInMins: 30,
//       }),
//       credentials: 'include',
//     })
//       .then((res) => res.json())
//       .then(async (result) => {
//         console.log('result', result);
//         if (result?.accessToken) {
//           await AsyncStorage.setItem('auth_token', result.accessToken);
//           await AsyncStorage.setItem('auth_user', JSON.stringify(result));
//           navigation.replace('Dashboard');
//         } else {
//           Alert.alert('Login failed', 'Invalid response from auth API');
//         }
//       })
//       .catch((err) => {
//         const message =
//           err?.response?.data?.message || err.message || 'Login failed';
//         Alert.alert('Login error', message);
//       })
//       .finally(() => {
//         setLoading(false);
//       });
//   };

//   return (
//     <View style={styles.container}>
//       <Text style={styles.title}>Priority To-Do</Text>

//       <TextInput
//         placeholder="Username"
//         value={username}
//         onChangeText={setUsername}
//         style={styles.input}
//         autoCapitalize="none"
//       />
//       <TextInput
//         placeholder="Password"
//         value={password}
//         onChangeText={setPassword}
//         style={styles.input}
//         secureTextEntry
//       />

//       <TouchableOpacity
//         style={styles.button}
//         onPress={handleLogin}
//         disabled={loading}>
//         {loading ? (
//           <ActivityIndicator color="#fff" />
//         ) : (
//           <Text style={styles.buttonText}>Login</Text>
//         )}
//       </TouchableOpacity>

//       <View style={{ marginTop: 20 }}>
//         <Text style={{ textAlign: 'center', color: '#666' }}>
//           Test credentials (from dummyjson):
//         </Text>
//         <Text style={{ textAlign: 'center', color: '#666' }}>
//           username: kminchelle • password: 0lelplR
//         </Text>
//       </View>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: 'center',
//     padding: 20,
//     backgroundColor: '#f7f7f7',
//   },
//   title: {
//     fontSize: 28,
//     fontWeight: '700',
//     textAlign: 'center',
//     marginBottom: 24,
//   },
//   input: {
//     backgroundColor: '#fff',
//     padding: 12,
//     borderRadius: 8,
//     marginBottom: 10,
//     borderWidth: 1,
//     borderColor: '#ddd',
//   },
//   button: {
//     backgroundColor: '#2b6ef6',
//     padding: 14,
//     borderRadius: 8,
//     alignItems: 'center',
//   },
//   buttonText: { color: '#fff', fontWeight: '600', fontSize: 16 },
// });

import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  ActivityIndicator,
  KeyboardAvoidingView,
  ScrollView,
  Platform,
  Dimensions,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const { width, height } = Dimensions.get('window');

export default function LoginScreen({ navigation }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    (async () => {
      const token = await AsyncStorage.getItem('auth_token');
      if (token) navigation.replace('Dashboard');
    })();
  }, []);

  const handleLogin = async () => {
    if (!username || !password) {
      Alert.alert('Error', 'Please enter username and password');
      return;
    }
    setLoading(true);
    fetch('https://dummyjson.com/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        username,
        password,
        expiresInMins: 30,
      }),
    })
      .then((res) => res.json())
      .then(async (result) => {
        if (result?.accessToken) {
          await AsyncStorage.setItem('auth_token', result.accessToken);
          await AsyncStorage.setItem('auth_user', JSON.stringify(result));
          navigation.replace('Dashboard');
        } else {
          Alert.alert('Login failed', 'Invalid credentials');
        }
      })
      .catch((err) => {
        Alert.alert('Login error', err.message || 'Something went wrong');
      })
      .finally(() => setLoading(false));
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
      <ScrollView
        contentContainerStyle={styles.scrollContainer}
        keyboardShouldPersistTaps="handled">
        <View style={styles.container}>
          <Text style={styles.title}>Priority To-Do</Text>

          <TextInput
            placeholder="Username"
            value={username}
            onChangeText={setUsername}
            style={styles.input}
            autoCapitalize="none"
            placeholderTextColor="#999"
          />
          <TextInput
            placeholder="Password"
            value={password}
            onChangeText={setPassword}
            style={styles.input}
            secureTextEntry
            placeholderTextColor="#999"
          />

          <TouchableOpacity
            style={[styles.button, loading && { opacity: 0.7 }]}
            onPress={handleLogin}
            disabled={loading}>
            {loading ? (
              <ActivityIndicator color="#fff" />
            ) : (
              <Text style={styles.buttonText}>Login</Text>
            )}
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    paddingVertical: 20,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: width * 0.08,
    backgroundColor: '#f9f9f9',
  },
  title: {
    fontSize: width * 0.08,
    fontWeight: '700',
    textAlign: 'center',
    marginBottom: height * 0.04,
    color: '#1a1a1a',
  },
  input: {
    backgroundColor: '#fff',
    paddingVertical: Platform.OS === 'ios' ? 14 : 12,
    paddingHorizontal: 12,
    borderRadius: 10,
    marginBottom: 14,
    borderWidth: 1,
    borderColor: '#ddd',
    fontSize: width * 0.045,
    color: '#000',
  },
  button: {
    backgroundColor: '#2b6ef6',
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 8,
  },
  buttonText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: width * 0.045,
  },
  testCredentials: {
    marginTop: 25,
    alignItems: 'center',
  },
  infoText: {
    color: '#666',
    fontSize: width * 0.04,
    textAlign: 'center',
  },
  bold: { fontWeight: '700', color: '#333' },
});
