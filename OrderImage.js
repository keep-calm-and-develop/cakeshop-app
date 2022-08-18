import { useState } from "react";
import { StyleSheet, View, Image, Pressable, Text } from "react-native";
import { Modal } from 'react-native';
import ImageViewer from 'react-native-image-zoom-viewer';

export const ImageFullView = ({ visible, order, onClose }) => (
    <Modal visible={visible} transparent={true} onDismiss={onClose}>
        <ImageViewer imageUrls={[{ url: order.imageUrl }]} enableSwipeDown onCancel={onClose} swipeDownThreshold={100} />
    </Modal>
);

export const OrderImage = ({ order }) => {
    const [showModal, setShowModal] = useState(false);
    const onFullView = () => {
        setShowModal(true);
    };
    return (
        <View style={{ width: '100%', height: '100%' }}>
            <Pressable onPress={onFullView} style={styles.imgContainer}>
                <Image
                    style={styles.img}
                    source={{
                        uri: order.imageUrl
                    }}
                />
            </Pressable>
            <ImageFullView order={order} visible={showModal} onClose={() => setShowModal(false)}/>
        </View>
    );
};

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
    closeBtn: {
        padding: 15,
        position: 'absolute',
    },
    closeBtnText: {
        fontSize: 16,
        fontWeight: 'bold',
    }
});