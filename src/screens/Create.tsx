import { Platform, SafeAreaView, StyleSheet, ToastAndroid, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import { RouteProp, useNavigation } from '@react-navigation/native'
import { useDispatch } from 'react-redux'
import { addTask } from '../store/reducers/todosReducer'
import DatePicker from 'react-native-date-picker'
import DropDownPicker from 'react-native-dropdown-picker'
import { verticalScale } from '../styles/sized'
import { Colors } from '../styles/color'
import CustomTextInput from '../components/atoms/CustomTextInput'
import Gap from '../components/atoms/Gap'
import moment from 'moment'
import CustomButton from '../components/atoms/CustomButton'
import CustomNavBar from '../components/atoms/CustomNavbar'
import Toast from 'react-native-toast-message'

type DetailScreenRouteProp = RouteProp<{ category: { category: "" } }, 'category'>;

type Props = {
  route: DetailScreenRouteProp
}

const Create = ({ route }: Props) => {
  const navigation = useNavigation()
  const [title, setTitle] = useState("")
  const [desc, setDesc] = useState("")
  const [startDate, setStartDate] = useState<Date>(new Date(Date.now()))
  const [openStartDate, setOpenStartDate] = useState<boolean>(false)
  const [openEndDate, setOpenEndDate] = useState<boolean>(false)
  const [endDate, setEndDate] = useState<Date>(new Date(Date.now()))
  const [openCat, setOpenCat] = useState(false)
  const [value, setValue] = useState(route.params.category)
  const [categoriez, setCategoriez] = useState([
    {
      label: "Programming",
      value: "Programming"
    },
    {
      label: "Design",
      value: "Design"
    },
    {
      label: "Content",
      value: "Content"
    }
  ])

  const dispatch = useDispatch()
  const id = `id_${new Date().getTime()}`
  const createTodos = () => {
    if (!title) {
      return Toast.show({
        type: 'error',
        text2: 'Please input title',
        position : 'bottom',
      })
    }
    if (!desc ) {
      return Toast.show({
        type: 'error',
        text2: 'Please input description',
        position : 'bottom',
      })
    }
    if (!startDate && Platform.OS == "android") {
      return ToastAndroid.show("Please input start date", 300)
    }
    if (!endDate && Platform.OS == "android") {
      return ToastAndroid.show("Please input end date", 300)
    }
    dispatch(addTask({
      id,
      categoriez: value,
      desc,
      endDate: endDate,
      startDate: startDate,
      status: "waiting",
      title
    }))
    setTimeout(() => {
      navigation.navigate("Home" as never)
    }, 300)
  }
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: Colors.white, alignItems: 'center', justifyContent: 'flex-start', }}>
      <CustomNavBar style={{ width: '100%' }} showBackButton title='Create New Task' />
      <DropDownPicker
        style={{ width: "90%", alignSelf: 'center', marginTop: 20, borderColor: Colors.primary }}
        stickyHeader={true}
        open={openCat}
        value={value}
        items={categoriez}
        setOpen={setOpenCat}
        setValue={setValue}
        setItems={setCategoriez}
        labelStyle={{ fontWeight: "bold" }}
        dropDownContainerStyle={{ backgroundColor: Colors.primary }}
      // containerStyle={{width : '90%', alignSelf : 'center', borderRadius : moderateScale({size : 12})}}
      />
      <Gap height={verticalScale(20)} />
      <CustomTextInput onChangeText={e=>setTitle(e)} label='Title' style={{ width: "90%", alignSelf: 'center', backgroundColor: Colors.white }} />
      <Gap height={verticalScale(20)} />
      <CustomTextInput onChangeText={e=>setDesc(e)} multiline={true} label='Description . . .' style={{ width: "90%", alignSelf: 'center', backgroundColor: Colors.white, height : verticalScale(120) }} />
      <Gap height={verticalScale(20)} />
      <View style={styles.dateContainer}>
      <TouchableOpacity style={{width: "45%", alignSelf: 'center'}} onPress={()=>setOpenStartDate(true)}>
          <CustomTextInput pointerEvents='none' value={moment(startDate).format("DD/MM hh:mm A")} editable={false} label='Start Date' style={{ backgroundColor: Colors.white }} />
        </TouchableOpacity>
        <TouchableOpacity style={{width: "45%", alignSelf: 'center'}} onPress={()=>setOpenEndDate(true)}>
          <CustomTextInput pointerEvents='none' value={moment(endDate).format("DD/MM hh:mm A")} editable={false} label='End Date' style={{ backgroundColor: Colors.white }} />
        </TouchableOpacity>
      </View>
      <DatePicker
        modal
        open={openStartDate}
        date={moment(startDate).toDate()}
        onConfirm={(date) => {
          setOpenStartDate(false)
          setStartDate(date)
        }}
        onCancel={() => {
          setOpenStartDate(false)
        }}
        minimumDate={moment().toDate()}
      />
      <DatePicker
        modal
        open={openEndDate}
        date={moment(endDate).toDate()}
        onConfirm={(date) => {
          setOpenEndDate(false)
          setEndDate(date)
        }}
        onCancel={() => {
          setOpenEndDate(false)
        }}
        minimumDate={moment(startDate).toDate()}
      />
      <Toast/>
      <Gap height={verticalScale(20)} />
      <CustomButton
        onPress={createTodos}
        style={{
          width: '90%',
          alignSelf: 'center',
          borderRadius: 8
        }}
        label='Create Task' />
    </SafeAreaView>
  )
}

export default Create

const styles = StyleSheet.create({
  dateContainer: {
    flexDirection: 'row',
    width: '90%',
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'space-between'
  }
})