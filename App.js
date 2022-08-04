import AsyncStorage from '@react-native-async-storage/async-storage';
import { StatusBar } from 'expo-status-bar';
import { doc, getDoc } from "firebase/firestore";
import { useCallback, useEffect, useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { firestore } from './firebase';
import { ACTIONS, GlobalContextProvider, useGlobalContext } from './globalContext';
import { LoginComponent } from './LoginComponent';
import { OrdersComponent } from './OrdersComponent';

export const getParsedDocsFromQuerySnapShot = (querySnapShot) => {
    const collection = [];
    querySnapShot.forEach(doc => {
        collection.push({ id: doc.id, ...doc.data() });
    });
    return collection;
};

export default function App() {
    return (
        <GlobalContextProvider>
            <MainApp/>
        </GlobalContextProvider>
    );
}

const MainApp = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [loading, setLoading] = useState(true);
    const {state, dispatch} = useGlobalContext();

    useEffect(() => {
        (async () => {
            const employeeId = await AsyncStorage.getItem('employeeId');
            if (employeeId !== '') {
                const docRef = doc(firestore, "employees", employeeId);
                const docSnap = await getDoc(docRef);
                setIsLoggedIn(docSnap.exists());
                if (docSnap.exists()) {
                    dispatch({ type: ACTIONS.SET_EMPLOYEE, payload: { id: docSnap.id, ...docSnap.data() }});
                }
            } else {
                setIsLoggedIn(false);
            }
            setLoading(false);
        })()
    }, []);

    const onLogin = useCallback(async (employeeId) => {
        await AsyncStorage.setItem('employeeId', employeeId);
        setIsLoggedIn(true);
    }, []);

    const onLogout = useCallback(async () => {
        await AsyncStorage.setItem('employeeId', '');
        setIsLoggedIn(false);
    }, []);

    return (
        <View style={styles.container}>
            {
                loading
                ?
                <Text>Loading please wait...</Text>
                :
                isLoggedIn
                ?
                <OrdersComponent callback={onLogout} />
                :
                <LoginComponent callback={onLogin} />
            }
            <StatusBar style="auto" />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
});
