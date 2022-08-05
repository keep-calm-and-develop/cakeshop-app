import { StyleSheet, View, Image } from "react-native";


export const OrderImage = ({ order }) => (
    <View style={styles.imgContainer}>
        <Image
            style={styles.img}
            source={{
                uri: order.imageUrl
            }}
        />
    </View>
);

const styles = StyleSheet.create({
    imgContainer: {
        width: '100%',
        marginBottom: 15,
    },
    img: {
        width: '100%',
        height: 300,
        resizeMode: 'contain',
    },
});