import React from 'react';
import { Text } from 'react-native-paper';
import { TextStyle } from 'react-native';
import { Colors } from '../../styles/color';
import { moderateScale } from '../../styles/sized';

interface CustomTextProps {
    style?: TextStyle;
    children: React.ReactNode;
    color?: string,
    fontFamily?: "Poppins-SemiBold" | "Poppins-Regular" | "Poppins-Bold",
    fontSize?: number
    numberOfLines? : number,
    ellipsizeMode? : "head" | "middle" | "tail" | "clip" | undefined
}

const CustomText: React.FC<CustomTextProps> = (
    {
        style,
        color = Colors.black,
        children,
        fontFamily = "Poppins-Regular",
        fontSize = 16,
        numberOfLines = 2,
        ellipsizeMode = 'tail'
    }) => {

    return (
        <Text 
            numberOfLines={numberOfLines}
            ellipsizeMode={ellipsizeMode}
            style={[{ fontFamily: fontFamily, fontSize: moderateScale({ size: fontSize }), color, }, style]}>
            {children}
        </Text>
    );
};

export default CustomText;
