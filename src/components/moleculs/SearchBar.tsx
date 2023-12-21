import { View,StyleSheet, TouchableOpacity } from 'react-native'
import React, { useRef } from 'react'
import { Colors } from '../../styles/color'
import { verticalScale } from '../../styles/sized'
import Icon from 'react-native-vector-icons/Feather'
import { TextInput } from 'react-native-paper'

type Props = {
    setSearch : React.Dispatch<React.SetStateAction<string>>
    getSearch : ()=>void;
}
const SearchBar = ({setSearch, getSearch}: Props) => {
    return (
        <View style={styles.container}>
            <TextInput
                onChangeText={e=>setSearch(e)}
                placeholder='Search . . .'
                textColor={Colors.black}
                autoFocus={false}
                activeUnderlineColor={Colors.primary}
                underlineColor={Colors.gray}
                style={{
                    backgroundColor: Colors.white,
                    width: '88%'
                }} mode='flat' />
            <TouchableOpacity onPress={getSearch} style={{ padding: 4, width: '12%' }}>
                <Icon name='search' size={24} color={Colors.black} />
            </TouchableOpacity>
        </View>
    )
}

export default SearchBar

const styles = StyleSheet.create({
    container: {
        marginTop: verticalScale(12),
        backgroundColor: Colors.white,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        width: '90%',
        alignSelf: 'center',
    }
})