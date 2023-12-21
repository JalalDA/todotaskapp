import { View, Modal, StyleSheet, Animated } from 'react-native'
import React from 'react'
import Gap from '../../atoms/Gap';
import { horizontalScale, verticalScale } from '../../../styles/sized';
import CustomButton from '../../atoms/CustomButton';
import CustomText from '../../atoms/CustomText';


type Props = {
    isModalVisible: boolean;
    scale: Animated.AnimatedInterpolation<string | number>
    closeModal: () => void;
    title: string;
    desc: string;
    action: () => void;
}

const ModalCustom = ({
    isModalVisible,
    scale,
    closeModal,
    title,
    desc,
    action
}: Props) => {
    return (
        <Modal transparent visible={isModalVisible}>
            <View style={styles.modalContainer}>
                <Animated.View
                    style={[styles.modalContent, { transform: [{ scale }] }]}
                >
                    <CustomText children={title}/>
                    <Gap height={verticalScale(12)} />
                    <CustomText children={desc}/>
                    <Gap height={verticalScale(20)} />
                    <View style={styles.buttonContainer}>
                        <CustomButton mode='outlined' onPress={closeModal} label='No'/>
                        <Gap width={horizontalScale(12)}/>
                        <CustomButton onPress={()=>{
                            action()
                            closeModal()
                        }} label='Yes'/>
                    </View>
                </Animated.View>
            </View>
        </Modal>
    )
}

export default ModalCustom

const styles = StyleSheet.create({
    buttonContainer: {
        flexDirection : 'row',
        alignItems : 'center',
        justifyContent : 'center'
    },
    button: {
        alignItems: 'center',
        justifyContent: 'center',
        padding: 8,
        borderRadius: 4,
        width : 80
    },
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContent: {
        backgroundColor: 'white',
        padding: 20,
        borderRadius: 10,
        elevation: 5,
        alignItems: 'center',
        justifyContent: 'center'
    },
})