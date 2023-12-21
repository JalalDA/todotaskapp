import React from 'react';
import { Button } from 'react-native-paper';
import { ViewStyle, StyleProp } from 'react-native';
import { Colors } from '../../styles/color';
import { moderateScale } from '../../styles/sized';

interface CustomButtonProps {
  onPress?: () => void;
  label: string;
  mode?: 'contained' | 'outlined' | 'text';
  style?: StyleProp<ViewStyle>;
}

const CustomButton: React.FC<CustomButtonProps> = ({ onPress, label, mode = 'contained', style }) => {

  return (
    <Button
      mode={mode}
      onPress={onPress}
      style={[
        {
          backgroundColor: mode === 'contained' ? Colors.primary: 'transparent',
        },
        style,
      ]}
      labelStyle={{
        color: mode === 'contained' ? Colors.white: Colors.primary,
        fontFamily : "Poppins-Regular",
        fontSize : moderateScale({size : 16}),
        fontWeight : "600"
      }}
    >
      {label}
    </Button>
  );
};

export default CustomButton;
