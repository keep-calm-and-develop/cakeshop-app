import { StyleSheet, Text, View } from "react-native";


export const PropertiesTable = ({ properties }) => (
    <View style={styles.tableContainer}>
        <View style={styles.tHead}>
            <Text style={styles.th}>Cake</Text>
            <Text style={styles.th}>Filling</Text>
            <Text style={styles.th}>Frosting</Text>
        </View>
        {
            properties.map(property => (
                <View style={styles.tHead} key={`${property.cake}${property.filling}${property.frosting}`}>
                    <Text style={styles.td}>{property.cake || 'NA'}</Text>
                    <Text style={styles.td}>{property.filling || 'NA'}</Text>
                    <Text style={styles.td}>{property.frosting || 'NA'}</Text>
                </View>
            ))
        }
    </View>
);

const styles = StyleSheet.create({
    tableContainer: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        marginBottom: 15,
    },
    tHead: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        width: '100%',
        borderBottomColor: 'gray',
        borderBottomWidth: 2,
    },
    th: {
        fontWeight: 'bold',
        fontSize: 20,
        padding: 10,
        width: '33%',
    },
    tr: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        width: '100%',
    },
    td: {
        fontSize: 18,
        padding: 10,
        width: '33%',
    },
});