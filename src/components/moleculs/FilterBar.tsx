import { Animated, TouchableOpacity } from 'react-native'
import React from 'react'
import { Colors } from '../../styles/color'
import CustomText from '../atoms/CustomText'
import { horizontalScale, moderateScale, screenWidth, verticalScale } from '../../styles/sized'
import Gap from '../atoms/Gap'
import { ICat } from '../../types'

type Props = {
    setCatData : React.Dispatch<React.SetStateAction<ICat[]>>
    filtering : ICat[]
}

const FilterBar = ({
    setCatData,
    filtering,
}: Props) => {
    // const filtering : ICat[] = 
    let scrollX = React.useRef(new Animated.Value(0)).current
    const width = screenWidth * 0.4
    return (
        <Animated.FlatList
            horizontal
            keyExtractor={(e, index) => index.toString()}
            onScroll={Animated.event([
                {
                    nativeEvent: {
                        contentOffset: { x: scrollX }
                    }
                }
            ], { useNativeDriver: true })}
            showsHorizontalScrollIndicator={false}
            snapToInterval={screenWidth * 0.4}
            scrollEventThrottle={16}
            contentContainerStyle={{ alignItems: 'center', height : 80 }}
            data={filtering}
            renderItem={({ item, index }) => {
                if (index === 0 || index === filtering.length - 1) {
                    return <Gap width={(screenWidth - (screenWidth * 0.4)) / 2} />
                }
                const inputRange = [
                    (index - 3) * width,
                    (index - 1) * width,
                    index * width
                ]

                const translateY = scrollX.interpolate({
                    inputRange,
                    outputRange: [0, -10, 10]
                })
                const opacity = scrollX.interpolate({
                    inputRange,
                    outputRange: [0.3, 1, 0.3]
                })
                return <Animated.View
                    style={{
                        backgroundColor: item.isActive ?  item.color : Colors.white,
                        borderRadius : moderateScale({size : 8}),
                        height: verticalScale(40),
                        alignItems: 'center',
                        justifyContent : 'center',
                        width,
                        marginRight: horizontalScale(10),
                        transform: [{ translateY }], opacity
                    }}>
                        <TouchableOpacity style={{height: verticalScale(40), width,  alignItems: 'center',
                        justifyContent : 'center',}} onPress={()=>{
                            const selectedCategories = filtering.map((cat)=>{
                                if(item.name.toLocaleUpperCase() === cat.name.toLocaleUpperCase()){
                                    return {...cat, isActive : !cat.isActive}
                                }
                                return cat
                            })
                            setCatData(selectedCategories)
                        }} activeOpacity={0.8}>
                            <CustomText color={item.isActive ? Colors.white : Colors.black} children={item.name.toUpperCase()} />
                        </TouchableOpacity>
                </Animated.View>
            }}
        />
    )
}

export default FilterBar