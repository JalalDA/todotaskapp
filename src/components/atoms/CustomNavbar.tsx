import React from 'react';
import { TouchableOpacity, View, StyleSheet, ViewStyle } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Colors } from '../../styles/color';
import CustomText from './CustomText';
import Icon from 'react-native-vector-icons/Feather'

interface CustomNavBarProps {
  title: string;
  showBackButton?: boolean;
  style ?: ViewStyle
}

const CustomNavBar: React.FC<CustomNavBarProps> = ({ title, showBackButton = true, style }) => {
  const navigation = useNavigation();

  const handleBackButtonPress = () => {
    navigation.goBack();
  };

  return (
    <View style={[styles.container, style]}>
      {showBackButton && (
        <TouchableOpacity style={{width : '30%'}} onPress={handleBackButtonPress}>
            <Icon name='chevron-left' size={24} color={Colors.black}/>
        </TouchableOpacity>
      )}
      <CustomText numberOfLines={1} ellipsizeMode='tail' fontFamily='Poppins-Bold' style={{width : "40%", fontWeight : '600'}} children={title}/>
      <View style={{width : '30%'}}/>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 10,
    backgroundColor: Colors.white
  },
  backButton: {
    color: 'white',
    fontSize: 16,
  }
});

export default CustomNavBar;
