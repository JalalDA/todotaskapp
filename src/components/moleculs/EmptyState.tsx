import { Image, SafeAreaView } from 'react-native'
import React from 'react'
import CustomText from '../atoms/CustomText'
import { Colors } from '../../styles/color'

type Props = {}

const EmptyState = (props: Props) => {
  return (
    <SafeAreaView style={{flex : 1, alignItems : 'center', justifyContent : 'center'}}>
        <Image style={{width : 300 ,height : 400}}  resizeMode='contain' source={require("../../../assets/img/empty.png")}/>
        <CustomText fontFamily='Poppins-Regular' color={Colors.white} children={"Oops it's looks like you don't have any task yet"}/>
    </SafeAreaView>
  )
}

export default EmptyState