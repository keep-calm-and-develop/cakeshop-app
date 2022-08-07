import { doc, Timestamp, updateDoc } from "firebase/firestore";
import { useState } from "react";
import { StyleSheet, Text, View, Pressable, Modal } from "react-native";
import { NEXT_STATUS_MAPPING } from "./constants";
import { firestore } from "./firebase";
import { useGlobalContext } from "./globalContext";

export const StatusChangeModal = ({ visible, order, onClose }) => {
    const {state} = useGlobalContext();
    const [updating, setUpdating] = useState(false);
    const onConfirm = async () => {
        if (!updating) {
            setUpdating(true);
            await updateDoc(doc(firestore, "orders", order.id), {
                status: NEXT_STATUS_MAPPING[order.status], updatedBy: state.currentEmployee?.email, updatedOn: Timestamp.now(new Date()),
            });
            setUpdating(false);
            onClose(true);
        }
    };
    return (
        <Modal
            animationType="fade"
            visible={visible}
            onRequestClose={onClose}
            supportedOrientations={['portrait', 'portrait-upside-down', 'landscape', 'landscape-left', 'landscape-right']}
        >
            <View style={styles.centeredView}>
                <View style={styles.modalHeader}>
                    <Text style={styles.modalTitle}>Confirm Status Change</Text>
                    <Pressable style={styles.button} onPress={onClose}>
                        <Text style={styles.buttonText}>Cancel</Text>
                    </Pressable>
                </View>
                <View style={styles.modalBody}>
                    <Text style={[styles.textStyle, { marginBottom: 15 }]}>Does this order has been {NEXT_STATUS_MAPPING[order.status].replace('_', ' ')}?</Text>
                    <Pressable style={[styles.completeButton, { marginLeft: 15, marginBottom: 15 }]} onPress={onConfirm} disabled={updating}>
                        <Text style={styles.completeButtonText}>Yes, Confirm</Text>
                    </Pressable>
                </View>
            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    modalHeader: {
        flexDirection: 'row',
        justifyContent: "space-between",
        alignItems: "center",
        width: '100%',
        borderBottomWidth: 2,
        borderBottomColor: 'black',
        padding: 20,
    },
    modalBody: {
        justifyContent: "flex-start",
        alignItems: "center",
        flexDirection: 'row',
        width: '100%',
        padding: 20,
    },
    modalTitle: {
        fontWeight: "bold",
        fontSize: 28,
        textAlign: 'left',
    },
    button: {
        borderRadius: 10,
        paddingVertical: 10,
        paddingHorizontal: 20,
        elevation: 2,
        backgroundColor: 'black',
    },
    buttonText: {
        color: 'white',
        fontWeight: "bold",
        textAlign: "center",
    },
    textStyle: {
        color: "black",
        fontWeight: "bold",
        textAlign: "left",
        fontSize: 22,
    },
    centeredView: {
        justifyContent: "center",
        alignItems: "center",
        flexDirection: 'column',
    },
    completeButton: {
        backgroundColor: '#00B2FF',
        borderRadius: 15,
        paddingHorizontal: 25,
        paddingVertical: 15,
        elevation: 2,
    },
    completeButtonText: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 22,
    },
});