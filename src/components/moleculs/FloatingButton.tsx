import { View, Text, Animated, TouchableOpacity, StyleSheet } from 'react-native'
import React, { useEffect } from 'react'
import { Colors } from '../../styles/color'
import { moderateScale } from '../../styles/sized'
import Icon from "react-native-vector-icons/Entypo"
import { useNavigation } from '@react-navigation/native'

type Props = {}

const FloatingButton = (props: Props) => {
    const open = React.useRef(false)
    let animation = React.useRef(new Animated.Value(0)).current;
    const icon_1 = React.useRef(new Animated.Value(0)).current;
    const icon_2 = React.useRef(new Animated.ValueXY({ x: 0, y: 0 })).current;
    const icon_3 = React.useRef(new Animated.ValueXY({ x: 0, y: 0 })).current;
    const rotation = {
        transform: [
            {
                rotate: animation.interpolate({
                    inputRange: [0, 1],
                    outputRange: ["0deg", '135deg',]
                })
            }
        ]
    }

    const toggleMenu = () => {
        if (open.current) {
            Animated.spring(animation, {
                toValue: 0,
                friction: 5,
                useNativeDriver: true
            }).start()
            Animated.timing(icon_1, {
                toValue: 0,
                duration: 500,
                useNativeDriver: false,
            }).start();
            Animated.timing(icon_2, {
                toValue: 0,
                duration: 500,
                useNativeDriver: false,
            }).start();
            Animated.timing(icon_3, {
                toValue: 0,
                duration: 500,
                useNativeDriver: false,
            }).start();
        } else {
            Animated.spring(animation, {
                toValue: 1,
                friction: 5,
                useNativeDriver: true
            }).start()

            Animated.spring(icon_1, {
                toValue: -70,
                friction: 5,
                useNativeDriver: false,
            }).start();
            Animated.spring(icon_2, {
                toValue: { x: -50, y: -50 },
                friction: 5,
                useNativeDriver: false,
            }).start();
            Animated.spring(icon_3, {
                toValue: { x: -70, y: 0 },
                friction: 5,
                useNativeDriver: false,
            }).start();
        }
        open.current = !open.current
    }
    const navigation = useNavigation()

    useEffect(() => {
        return () => {
            animation.setValue(0);
        }
    }, [])
    return (
        <View style={{ flex: 1 }}>
            <Animated.View style={[
                styles.circle,
                {
                    transform: [{ translateY: icon_1 }]
                }
            ]
            }>
                <TouchableOpacity
                    //@ts-ignore
                    onPress={() => navigation.navigate("Create", { category: "Design" })}
                >
                    <Icon color={"#fff"} name='round-brush' size={28} />
                </TouchableOpacity>
            </Animated.View>
            <Animated.View style={[
                styles.circle,
                {
                    transform: icon_2.getTranslateTransform()
                }
            ]
            }>
                <TouchableOpacity
                    //@ts-ignore
                    onPress={() => navigation.navigate("Create", { category: "Programming" })}
                >
                    <Icon color={"#fff"} name='code' size={28} />
                </TouchableOpacity>
            </Animated.View>
            <Animated.View style={[
                styles.circle,
                {
                    transform: icon_3.getTranslateTransform()
                }
            ]
            }>
                <TouchableOpacity
                    //@ts-ignore
                    onPress={() => navigation.navigate("Create", { category: "Content" })}
                >
                    <Icon color={"#fff"} name='video-camera' size={28} />
                </TouchableOpacity>
            </Animated.View>
            <TouchableOpacity
                activeOpacity={0.8}
                onPress={toggleMenu}
                style={[
                    styles.circle,
                    {
                        transform: [{ rotate: open ? "45deg" : "0deg" }]
                    },
                    rotation]}
            >
                <Icon color={"#fff"} name='plus' size={28} />
            </TouchableOpacity>
        </View>
    )
}

export default FloatingButton

const styles = StyleSheet.create({
    circle: {
        zIndex: 1000,
        position: 'absolute',
        backgroundColor: Colors.yellow,
        borderRadius: 1000,
        right: 40,
        bottom: 40,
        padding: moderateScale({ size: 6 }),
    }
})