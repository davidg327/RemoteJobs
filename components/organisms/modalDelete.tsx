import {Modal, StyleSheet, TouchableOpacity, View} from "react-native";
import {ThemedText} from "@/components/atoms";

interface IModalDelete{
    visible: boolean;
    cancelDelete: () => void;
    handleConfirmDelete: () => void;
}

const black = '#000000';
const white = '#FFFFFF';
const green = '#16A34A';

export function ModalDelete ({
                                 visible,
                                 cancelDelete,
                                 handleConfirmDelete,
}: IModalDelete) {

    return (
        <Modal
            visible={visible}
            transparent
            animationType="fade"
        >
            <View style={styles.overlay}>
                <View style={styles.container}>
                    <ThemedText type='defaultSemiBold' darkColor={black} style={styles.text}>
                        ¿Desea eliminarlo de favoritos? Esta acción no se puede revertir.
                    </ThemedText>
                    <View style={styles.containerButtons}>
                        <TouchableOpacity
                            onPress={cancelDelete}
                            style={styles.buttonCancel}>
                            <ThemedText darkColor={black} >Cancelar</ThemedText>
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={handleConfirmDelete}
                            style={styles.buttonOk}>
                            <ThemedText lightColor={white} >Aceptar</ThemedText>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </Modal>
    )
}

const styles = StyleSheet.create({
    buttonCancel: {
        borderColor: black,
        borderRadius: 12,
        borderWidth: 1,
        paddingHorizontal: 15,
        paddingVertical: 5,
    },
    buttonOk: {
        backgroundColor: green,
        borderRadius: 12,
        paddingHorizontal: 15,
        paddingVertical: 5,
    },
    container: {
        width: "80%",
        maxHeight: "50%",
        backgroundColor: white,
        borderRadius: 16,
        padding: 20,
    },
    containerButtons: {
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 20,
    },
    overlay: {
        flex: 1,
        backgroundColor: "rgba(0,0,0,0.4)",
        justifyContent: "center",
        alignItems: "center",
    },
    text: {
        textAlign: 'center'
    },
});
