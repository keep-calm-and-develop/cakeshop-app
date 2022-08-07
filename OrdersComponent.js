import { endOfDay, startOfDay } from "date-fns";
import { collection, getDocs, orderBy, query, where } from "firebase/firestore";
import { useCallback, useEffect, useState } from "react";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { getParsedDocsFromQuerySnapShot } from "./App";
import { firestore } from "./firebase";
import { ACTIONS, useGlobalContext } from "./globalContext";
import { Orders } from "./Orders";
import { WeekComponent } from "./WeekComponent";

export const OrdersComponent = ({ callback: onLogout }) => {
    const {state, dispatch} = useGlobalContext();
    const [loading, setLoading] = useState(false);
    const [day, setDay] = useState(new Date());

    const onDayChange = useCallback((date) => {
        setDay(date);
    }, []);

    const fetchOrders = async () => {
        setLoading(true);
        const dayStart = startOfDay(day).getTime();
        const dayEnd = endOfDay(day).getTime();
        const q = query(
            collection(firestore, 'orders'),
            where("deliveryDate", ">=", dayStart),
            where("deliveryDate", "<", dayEnd),
            where("isAssigned", "==", true),
            orderBy('deliveryDate', 'asc')
        );
        const querySnapshot = await getDocs(q);
        const orders = getParsedDocsFromQuerySnapShot(querySnapshot);

        const ordersByProcessCategories = {
            layering: [],
            decorating: [],
            finishing: [],
            fondantFinishing: [],
        };
        const employeeId = state.currentEmployee?.id;
        const filteredOrders = orders.filter(order => {
            return !['CANCELLED', 'READY', 'COMPLETED'].includes(order.status)
        });
        filteredOrders.forEach(order => {
            ['layering', 'finishing', 'decorating', 'fondantFinishing'].forEach(process => {
                if (order[process]?.value === employeeId) {
                    ordersByProcessCategories[process].push(order);
                }
            });
        });
        dispatch({ type: ACTIONS.SET_ORDERS, payload: ordersByProcessCategories });
        setLoading(false);
    };

    useEffect(() => {
        if (state.currentEmployee) {
            fetchOrders();
        }
    }, [state.currentEmployee, day]);

    return (
        <View style={styles.container}>
            <View style={styles.headerContainer}>
                <Text style={styles.title}>{state?.currentEmployee?.name??'Employee'}</Text>
                <Pressable onPress={onLogout}><Text style={styles.logout}>logout</Text></Pressable>
            </View>
            <View style={{ width: '100%', height: '80%' }}>
                <ScrollView contentContainerStyle={styles.pageContainer}>
                    <WeekComponent onChange={onDayChange} currentDay={day} />
                    <Orders orders={state.orders} fetchOrders={fetchOrders} />
                </ScrollView>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: '100%',
        height: '100%',
    },
    headerContainer: {
        paddingVertical: 20,
        paddingHorizontal: 30,
        width: '100%',
        borderBottomColor: 'gray',
        borderBottomWidth: 2,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    pageContainer: {
        width: '100%',
        paddingVertical: 20,
        paddingHorizontal: 30,
    },
    title: {
        fontSize: 28,
        fontWeight: 'bold',
    },
    logout: {
        fontSize: 22,
        color: 'gray',
        fontWeight: 'bold',
    }
});