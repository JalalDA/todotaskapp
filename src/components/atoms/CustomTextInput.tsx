import React from 'react';
import { TextInput  } from 'react-native-paper';
import { ViewStyle, StyleProp } from 'react-native';
import { Colors } from '../../styles/color';

interface CustomTextInputProps {
  label?: string;
  value?: string;
  onChangeText?: (text: string) => void;
  style?: StyleProp<ViewStyle>;
  multiline?:boolean
  disabled?:boolean
  editable?:boolean
  onPress?:()=>void;
  textColor?:string;
  pointerEvents? : "auto" | "none" | "box-none" | "box-only"
}

const CustomTextInput: React.FC<CustomTextInputProps> = ({
  label,
  value,
  onChangeText,
  style,
  multiline=false,
  disabled=false,
  editable=true,
  onPress,
  textColor=Colors.black,
  pointerEvents="auto"
}) => {
  return (
    <TextInput
      textColor={textColor}
      label={label}
      value={value}
      onChangeText={onChangeText}
      style={style}
      mode="outlined"
      outlineColor={Colors.gray}
      activeOutlineColor={Colors.primary}
      multiline={multiline}
      disabled={disabled}
      editable={editable}
      onPressIn={onPress}
      pointerEvents={pointerEvents}
    />
  );
};

export default CustomTextInput;