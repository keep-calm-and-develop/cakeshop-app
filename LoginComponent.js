import { collection, getDocs, query, where } from "firebase/firestore";
import { useCallback, useState } from "react";
import { Pressable, StyleSheet, Text, TextInput, View } from "react-native";
import { getParsedDocsFromQuerySnapShot } from "./App";
import { firestore } from './firebase';
import { ACTIONS, useGlobalContext } from "./globalContext";

export const LoginComponent = ({ callback }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const {dispatch} = useGlobalContext();

    const onEmailChange = useCallback((event) => {
        setEmail(event.target.value);
    }, []);
    const onPasswordChange = useCallback((event) => {
        setPassword(event.target.value);
    }, []);
    const onLogin = useCallback(async () => {
        setError('');
        setLoading(true);
        try {
            const q = await query(collection(firestore, "employees"), where("email", "==", email));
            const querySnapshot = await getDocs(q);
            let employee = getParsedDocsFromQuerySnapShot(querySnapshot)?.[0];
            if (employee) {
                const role = employee.role?.toLowerCase();
                if (role === 'employee') {
                    if (employee.password === password) {
                        dispatch({ type: ACTIONS.SET_EMPLOYEE, payload: employee });
                        callback(employee.id);
                    } else {
                        const errorMessage = 'Incorrect email or password. Please check credentials or contact administrator.';
                        setError(errorMessage);
                    }
                } else {
                    const errorMessage = 'Incorrect email or password. Please check credentials or contact administrator.';
                    setError(errorMessage);
                }
            } else {
                const errorMessage = 'Incorrect email or password. Please check credentials or contact administrator.';
                setError(errorMessage);
            }
        } catch (err) {
            console.error(error);
            setError(error.toString());
        } finally {
            setLoading(false);
        }
    }, [email, password]);
    return (
        <View style={styles.container}>
            <TextInput
                style={styles.textInput}
                keyboardType="email-address"
                placeholder="Enter Your Email"
                value={email}
                onChange={onEmailChange}
            />
            <TextInput
                style={styles.textInput}
                secureTextEntry
                placeholder="Enter Your Password"
                value={password}
                onChange={onPasswordChange}
            />
            <Pressable style={styles.button} onPress={onLogin} disabled={loading || !email || !password}>
                <Text style={styles.buttonLabel}>{loading ? 'Checking...' : 'Login'}</Text>
            </Pressable>
            <Text style={styles.errorText}>{error}</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
        gap: 20,
    },
    textInput: {
        paddingVertical: 15,
        paddingHorizontal: 25,
        fontSize: 22,
        borderWidth: 3,
        borderRadius: 10,
        width: 400,
    },
    button: {
        backgroundColor: 'black',
        paddingVertical: 15,
        paddingHorizontal: 45,
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
        display: 'flex',
    },
    buttonLabel: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 22,
    },
    errorText: {
        fontSize: 18,
        color: 'brown',
        fontWeight: 'bold',
        fontStyle: 'italic',
    }
});