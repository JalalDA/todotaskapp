import { View, Animated, TouchableOpacity, StyleSheet } from 'react-native'
import React, { useEffect, useState } from 'react'
import { horizontalScale, moderateScale, verticalScale } from '../../styles/sized'
import SimpleIcon from 'react-native-vector-icons/SimpleLineIcons'
import Icon from 'react-native-vector-icons/Feather'
import { Colors } from '../../styles/color'
import { useDispatch } from 'react-redux'
import { deleteTask, updateTask } from '../../store/reducers/todosReducer'
import { useNavigation } from '@react-navigation/native'
import { Itodo } from '../../types'
import ModalCustom from './modal/ModalCustom'
import CustomText from '../atoms/CustomText'
import Gap from '../atoms/Gap'
import moment from 'moment'

type Props = {
    scale: Animated.AnimatedInterpolation<string | number>
    opacity: Animated.AnimatedInterpolation<string | number>
    item: Itodo
}

const CardItem = ({ scale, opacity, item }: Props) => {
    let optionAnimate = React.useRef(new Animated.Value(0)).current
    const show = React.useRef<Boolean>(false)
    const scaleModal = React.useRef(new Animated.Value(0)).current;
    const [isModalDelete, setModalDelete] = useState(false)
    const [isModalDone, setModalDone] = useState(false)

    const dispatch = useDispatch()
    const showing = () => {
        if (show.current) {
            Animated.spring(optionAnimate, {
                toValue: 0,
                friction: 5,
                useNativeDriver: true
            }).start()
        } else {
            Animated.spring(optionAnimate, {
                toValue: 1,
                friction: 5,
                useNativeDriver: true
            }).start()
        }
        show.current = !show.current
    }

    const openModal = () => {
        setModalDelete(true);
        Animated.spring(scaleModal, {
            toValue: 1,
            friction: 5,
            useNativeDriver: true,
        }).start();
        Animated.spring(optionAnimate, {
            toValue: 0,
            friction: 5,
            useNativeDriver: true
        }).start()
        show.current = !show.current
    };

    const openModalDone = () => {
        setModalDone(true);
        Animated.spring(scaleModal, {
            toValue: 1,
            friction: 5,
            useNativeDriver: true,
        }).start();
        Animated.spring(optionAnimate, {
            toValue: 0,
            friction: 5,
            useNativeDriver: true
        }).start()
        show.current = !show.current
    }

    const closeModal = () => {
        Animated.timing(scaleModal, {
            toValue: 0,
            duration: 300,
            useNativeDriver: true,
        }).start(() => setModalDelete(false));
    };
    const closeModalDone = () => {
        Animated.timing(scaleModal, {
            toValue: 0,
            duration: 300,
            useNativeDriver: true,
        }).start(() => setModalDone(false));
    };

    useEffect(() => {
        return () => {
            scaleModal.setValue(0);
            optionAnimate.setValue(0);
        };
    }, []);

    const navigation = useNavigation()
    return (
        <Animated.View style={[
            styles.container,
            {
                opacity,
                transform: [{ scale }],
            }]}>
            <TouchableOpacity
                //@ts-ignore
                onPress={() => navigation.navigate("Task", { id: item.id })}
                activeOpacity={1}
                style={styles.move}>
                <View style={{ width: '85%' }}>
                    <CustomText
                        style={{ fontWeight: 'bold' }}
                        //color={Colors.white} 
                        children={item?.title || ""} />
                    <Gap height={verticalScale(8)} />
                    <CustomText
                        numberOfLines={2}
                        // color={Colors.white}
                        children={item?.desc || ""} />
                    <Gap height={verticalScale(12)} />
                    <View style={{ alignItems: 'center', justifyContent: 'space-between', flexDirection: 'row' }}>
                        <CustomText
                            style={{ fontWeight: '600' }}
                            //color={Colors.white} 
                            children={moment(item?.startDate).format("DD/MM hh:mm A") || ""} />
                        <CustomText children={"-"} />
                        <CustomText
                            style={{ fontWeight: '600' }}
                            //color={Colors.white} 
                            children={moment(item?.endDate).format("DD/MM hh:mm A") || ""} />
                    </View>
                    <Gap height={verticalScale(12)} />
                    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}>
                        <View
                            style={[
                                styles.status,
                                {
                                    backgroundColor: item?.status === 'done' ? Colors.green : item?.status === "waiting" ? Colors.yellow : Colors.redText,
                                    width: '40%',
                                }
                            ]}>
                            <CustomText style={{ fontWeight: "bold" }} color={Colors.white} children={item.status.toUpperCase()} />
                        </View>
                        <Gap width={horizontalScale(12)} />
                        <View
                            style={
                                [
                                    styles.status,
                                    {
                                        backgroundColor: item?.categoriez === 'Programming' ? Colors.primaryDark : item?.categoriez === "Content" ? Colors.bag9Bg : Colors.redText,
                                        width: '60%',
                                    }]}>
                            <CustomText style={{ fontWeight: "bold" }} color={Colors.white} children={item.categoriez?.toUpperCase()} />
                        </View>
                    </View>
                </View>
                <TouchableOpacity onPress={showing} style={{ padding: 4 }} activeOpacity={0.8}>
                    <SimpleIcon size={24} name='options-vertical' color={Colors.black} />
                </TouchableOpacity>

                {
                    !show.current &&
                    < Animated.View
                        style={[
                            styles.option,
                            {
                                transform: [
                                    { scale: optionAnimate }
                                ]
                            }
                        ]}>
                        <TouchableOpacity onPress={openModal}>
                            <Icon name='trash' size={24} color={Colors.red} />
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => {
                            Animated.spring(optionAnimate, {
                                toValue: 0,
                                friction: 5,
                                useNativeDriver: true
                            }).start()
                            show.current = !show.current
                            //@ts-ignore
                            navigation.navigate("Task", { id: item.id })
                        }}>
                            <Icon name='edit' size={24} color={Colors.primary} />
                        </TouchableOpacity>
                        <TouchableOpacity onPress={openModalDone}>
                            <Icon name='check-square' size={24} color={Colors.green} />
                        </TouchableOpacity>
                    </Animated.View>
                }
                <ModalCustom
                    action={() => {
                        dispatch(deleteTask(item.id))
                    }}
                    title='Delete Task'
                    desc='Are you sure want to delete this task?'
                    isModalVisible={isModalDelete}
                    closeModal={closeModal}
                    scale={scaleModal}
                />
                <ModalCustom
                    action={() => {
                        dispatch(updateTask({ ...item, status: "done" }))
                    }}
                    title='Done Task'
                    desc='Are you sure want to done this task?'
                    isModalVisible={isModalDone}
                    closeModal={closeModalDone}
                    scale={scaleModal}
                />
            </TouchableOpacity>
        </Animated.View>
    )
}

export default CardItem

const styles = StyleSheet.create({
    container: {
        borderRadius: 12,
        marginTop: verticalScale(20),
        height: verticalScale(200),
        width: '90%',
        alignSelf: 'center',
        padding: moderateScale({ size: 8 }),
        backgroundColor: Colors.white,
        alignItems: 'center',
        justifyContent: 'space-between',
        flexDirection: 'row',
        position: 'relative',
    },
    move: {
        width: '100%',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexDirection: 'row',
        position: 'relative',
        height: verticalScale(190)
    },
    status: {
        alignItems: 'center',
        justifyContent: 'center',
        padding: moderateScale({ size: 6 }),
        borderRadius: moderateScale({ size: 6 })
    },
    option: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        position: 'absolute',
        bottom: verticalScale(4),
        right: horizontalScale(32),
        height: verticalScale(68),
        width: horizontalScale(140),
        backgroundColor: Colors.white,
        borderRadius: 8,
        borderWidth: 1,
        borderColor: Colors.gray,
        paddingHorizontal: horizontalScale(12),
    }
})