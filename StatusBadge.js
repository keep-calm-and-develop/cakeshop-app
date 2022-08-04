import { StyleSheet, Text, View } from "react-native";

export const StatusBadge = ({ status }) => (
    <View style={[styles.badge, styles[status.toLowerCase()]]}>
        <Text style={[styles.badgeText]}>
            {status.replace('_', ' ')}
        </Text>
    </View>
);

const styles = StyleSheet.create({
    badge: {
        marginTop: 10,
        padding: 5,
        borderRadius: 15,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    badgeText: {
        color: 'white',
        fontWeight: 'bold',
    },
    pending: {
        backgroundColor: '#2dccff',
    },
    layered: {
        backgroundColor: '#fce83a',
    },
    finished: {
        backgroundColor: 'lightseagreen',
    },
    fondant_finished: {
        backgroundColor: 'lightcoral',
    },
    decorated: {
        backgroundColor: 'tomato',
    },
    unapproved: {
        backgroundColor: '#9ea7ad',
    },
    cancelled: {
        backgroundColor: '#9ea7ad',
    },
    ready: {
        backgroundColor: '#ffb302',
    },
    completed: {
        backgroundColor: '#56f000',
    },
});
