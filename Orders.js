import React, { useState } from "react";
import { StyleSheet, Text, View, Pressable } from "react-native";
import { PROCESSES } from "./constants";
import { OrderDetailsModal } from "./OrderDetailsModal";
import { StatusBadge } from "./StatusBadge";
import { StatusChangeModal } from "./StatusChangeModal";

export const Orders = ({ orders, fetchOrders }) => {
    const [currentState, setOrder] = useState({ order: null, currentProcess: null });
    const [modalVisible, setModalVisible] = useState(false);
    const [statusConfirmVisible, setStatusConfirmVisible] = useState(false);

    const onClose = () => setModalVisible(false);

    const onStatusConfirmClose = (update = false) => {
        setStatusConfirmVisible(false);
        onClose();
        if (update) {
            fetchOrders();
        }
    };
    
    const onMarkAsCompleted = () => setStatusConfirmVisible(true);
    
    return (
        <React.Fragment>
            {
                PROCESSES.map(process => (
                    <View key={process.value} style={styles.processContainer}>
                        <View style={styles.processTitle}>
                            <Text style={styles.processTitleText}>{process.label}</Text>
                        </View>
                        <View style={styles.ordersContainer}>
                            {
                                orders[process.value].map(order => (
                                    <Pressable
                                        key={order.id}
                                        style={styles.card}
                                        onPress={() => {
                                            setOrder({ order, currentProcess: process.value });
                                            setModalVisible(true);
                                        }}
                                    >
                                        <Text style={[styles.processTitleText, { fontSize: 14 }]}>{order.productType}</Text>
                                        {order.specialInstructions ? <Text style={styles.specialInstructions}>*special instructions</Text> : null}
                                        <StatusBadge status={order.status} />
                                    </Pressable>
                                ))
                            }
                        </View>
                    </View>
                ))
            }
            {currentState.order && <OrderDetailsModal visible={modalVisible} onClose={onClose} order={currentState.order} onMarkAsCompleted={onMarkAsCompleted} />}
            {currentState.order && <StatusChangeModal order={currentState.order} process={currentState.currentProcess} visible={statusConfirmVisible} onClose={onStatusConfirmClose} />}
        </React.Fragment>
    );
};

const styles = StyleSheet.create({
    processContainer: {
        width: '100%',
        paddingHorizontal: 10,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
        justifyContent: 'flex-start',
        marginBottom: 15,
    },
    processTitle: {
        paddingVertical: 10,
        borderBottomWidth: 2,
        width: '100%',
    },
    processTitleText: {
        fontWeight: 'bold',
        fontSize: 16,
        color: 'gray',
    },
    ordersContainer: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start',
        paddingVertical: 10,
        width: '100%',
        flexWrap: 'wrap',
    },
    card: {
        width: '23%',
        minHeight: 80,
        padding: 10,
        backgroundColor: '#efefef',
        borderWidth: 1,
        borderRadius: 15,
        borderColor: 'gray',
        margin: 10,
    },
    specialInstructions: {
        fontSize: 12,
        fontStyle: 'italic',
    },
});