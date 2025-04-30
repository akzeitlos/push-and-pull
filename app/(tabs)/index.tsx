import { useEffect, useState } from 'react';
import axios from 'axios';
import { View, Text, StyleSheet, ActivityIndicator } from 'react-native';
import * as SecureStore from 'expo-secure-store';
import { useRouter } from 'expo-router'; // <-- import router

export default function PushupsScreen() {
  const [users, setUsers] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>('');
  const router = useRouter(); // <-- initialize router

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const token = await SecureStore.getItemAsync('token');
        if (!token) {
          router.replace('/(auth)/login'); // <-- redirect to login
          return;
        }

        const response = await axios.get('https://www.pushandpull.app/api/user', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setUsers(response.data);
      } catch (err: any) {
        if (axios.isAxiosError(err)) {
          if (err.response?.status === 401) {
            // Token is invalid or expired
            await SecureStore.deleteItemAsync('token'); // optional: clear invalid token
            router.replace('/(auth)/login'); // <-- redirect to login
          } else {
            setError(`Axios Error: ${err.message}`);
          }
        } else {
          setError('Unknown error occurred while fetching users');
        }
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  if (loading) {
    return <ActivityIndicator size="large" color="#ffffff" />;
  }

  if (error) {
    return (
      <View>
        <Text>{error}</Text>
      </View>
    );
  }

  return (
    <View>
      <Text>User List:</Text>
      {/* Render your user data here */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 16,
    backgroundColor: 'black'
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 12,
    paddingLeft: 8,
  },
  errorText: {
    color: 'red',
    marginBottom: 12,
  },
  loader: {
    marginTop: 20,
  },
});
