import { format } from "date-fns";
import { StyleSheet, Text, View, Pressable, Modal, ScrollView } from "react-native";
import { OrderImage } from "./OrderImage";
import { PropertiesTable } from "./PropertiesTable";

export const OrderDetailsModal = ({ visible, onClose, order, onMarkAsCompleted, isInEmployeesHand }) => {
    return (
        <Modal
            animationType="fade"
            visible={visible}
            onRequestClose={onClose}
            supportedOrientations={['portrait', 'portrait-upside-down', 'landscape', 'landscape-left', 'landscape-right']}
        >
            <View style={styles.centeredView}>
                <View style={styles.modalHeader}>
                    <Text style={styles.modalTitle}>Order Details</Text>
                    <Pressable style={styles.button} onPress={onClose}>
                        <Text style={styles.buttonText}>Close</Text>
                    </Pressable>
                </View>
                <View style={{ width: '100%', height: '80%' }}>
                    <ScrollView contentContainerStyle={styles.modalBody}>
                        <View style={[styles.productAndDeliveryDetails, { marginBottom: 15 }]}>
                            <Text style={styles.textStyle}>{order.productType}</Text>
                            <View style={styles.deliveryDetails}>
                                <Text style={styles.textStyle}>{format(order.deliveryDate, 'dd MMM, hh:mm a')}</Text>
                                <View style={styles.deliveryType}>
                                    <Text style={styles.deliveryTypeText}>{order.deliveryType}</Text>
                                </View>
                            </View>
                        </View>
                        <Text style={[styles.textStyle, { marginBottom: 15 }]}>Special Instructions: {order?.specialInstructions??'---'}</Text>
                        <Text style={[styles.textStyle, { marginBottom: 15 }]}>{order.properties?.length} Properties</Text>
                        <PropertiesTable properties={order.properties} />
                        {isInEmployeesHand && <View style={[styles.productAndDeliveryDetails, { marginBottom: 15 }]}>
                            <Text style={styles.textStyle}>Customer Name: {order.customer?.name}</Text>
                            <Pressable style={styles.completeButton} onPress={onMarkAsCompleted}>
                                <Text style={[styles.textStyle, styles.completeButtonText]}>Mark as Completed</Text>
                            </Pressable>
                        </View>}
                        <OrderImage order={order} />
                    </ScrollView>
                </View>
            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    productAndDeliveryDetails: {
        flexDirection: 'row',
        justifyContent: "space-between",
        alignItems: "center",
        width: '100%',
    },
    deliveryDetails: {
        flexDirection: 'row',
        justifyContent: "flex-start",
        alignItems: "center",
    },
    deliveryType: {
        backgroundColor: 'sienna',
        paddingVertical: 5,
        paddingHorizontal: 15,
        borderRadius: 20,
        marginLeft: 20,
    },
    deliveryTypeText: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 16,
    },
    centeredView: {
        justifyContent: "center",
        alignItems: "center",
        flexDirection: 'column',
    },
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
        alignItems: "flex-start",
        flexDirection: 'column',
        width: '100%',
        padding: 20,
    },
    modalTitle: {
        fontWeight: "bold",
        fontSize: 28,
        textAlign: 'left',
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
        fontSize: 18,
    },
});