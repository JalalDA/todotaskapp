import { View, Text, SafeAreaView, Button, TouchableOpacity, Alert } from 'react-native'
import React, { useState } from 'react'
import { RouteProp, useNavigation } from '@react-navigation/native'
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store/store';
import { addTask, updateTask } from '../store/reducers/todosReducer';
import Toast from 'react-native-toast-message';
import { Colors } from '../styles/color';
import CustomNavBar from '../components/atoms/CustomNavbar';
import DropDownPicker from 'react-native-dropdown-picker';
import Gap from '../components/atoms/Gap';
import { verticalScale } from '../styles/sized';
import CustomTextInput from '../components/atoms/CustomTextInput';
import { StyleSheet } from 'react-native';
import CustomButton from '../components/atoms/CustomButton';
import DatePicker from 'react-native-date-picker';
import moment from 'moment';
import { Itodo } from '../types';

type DetailScreenRouteProp = RouteProp<{ id: { id: "" } }, 'id'>;

type Props = {
  route: DetailScreenRouteProp
}

const Task = ({route}: Props) => {
  const id =route.params.id
  const data = useSelector((state:RootState)=>state.todos.todo)
  const singelData = data.filter((item:Itodo)=>item.id === id)[0]
  console.log({singelData});
  const navigation = useNavigation()
  const [title, setTitle] = useState(singelData?.title)
  const [desc, setDesc] = useState(singelData?.desc)
  const [startDate, setStartDate] = useState<Date>(singelData?.startDate)
  const [openStartDate, setOpenStartDate] = useState<boolean>(false)
  const [openEndDate, setOpenEndDate] = useState<boolean>(false)
  const [endDate, setEndDate] = useState<Date>(singelData.endDate)
  const [openCat, setOpenCat] = useState(false)
  const [value, setValue] = useState(singelData.categoriez)
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
  const [valueStatus, setValueStatus] = useState(singelData.status)
  const [openStatus, setOpenStatus] = useState(false)
  const [status, setStatus] = useState([
    {
      label: "WAITING",
      value: "waiting"
    },
    {
      label: "PROGRESS",
      value: "progress"
    },
    {
      label: "DONE",
      value: "done"
    }
  ])

  const dispatch = useDispatch()
  const updateTodos = () => {
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
    dispatch(updateTask({id, desc, endDate, startDate, status : valueStatus, title, categoriez : value}))
    setTimeout(() => {
      navigation.navigate("Home" as never)
    }, 300)
  }
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: Colors.white, alignItems: 'center', justifyContent: 'flex-start', }}>
      <CustomNavBar style={{ width: '100%' }} showBackButton title={`Task ${singelData.title}`} />
      <DropDownPicker
        style={{ width: "90%", alignSelf: 'center', marginTop: 20, borderColor: Colors.primary }}
        stickyHeader={true}
        open={openCat}
        //@ts-ignore
        value={value}
        items={categoriez}
        setOpen={setOpenCat}
        setValue={setValue}
        setItems={setCategoriez}
        labelStyle={{ fontWeight: "bold" }}
        dropDownContainerStyle={{ backgroundColor: Colors.primary }}
      // containerStyle={{width : '90%', alignSelf : 'center', borderRadius : moderateScale({size : 12})}}
      />
      <DropDownPicker
        style={{ width: "90%", alignSelf: 'center', marginTop: 20, borderColor: Colors.primary }}
        stickyHeader={true}
        open={openStatus}
        //@ts-ignore
        value={valueStatus}
        items={status}
        setOpen={setOpenStatus}
        setValue={setValueStatus}
        setItems={setStatus}
        labelStyle={{ fontWeight: "bold" }}
        dropDownContainerStyle={{ backgroundColor: Colors.primary }}
      />
      <Gap height={verticalScale(20)} />
      <CustomTextInput value={title} onChangeText={e=>setTitle(e)} label='Title' style={{ width: "90%", alignSelf: 'center', backgroundColor: Colors.white }} />
      <Gap height={verticalScale(20)} />
      <CustomTextInput value={desc} onChangeText={e=>setDesc(e)} multiline={true} label='Description . . .' style={{ width: "90%", alignSelf: 'center', backgroundColor: Colors.white, height : verticalScale(120) }} />
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
        onPress={updateTodos}
        style={{
          width: '90%',
          alignSelf: 'center',
          borderRadius: 8
        }}
        label='Update Task' />
    </SafeAreaView>
  )
}

export default Task

const styles = StyleSheet.create({
  dateContainer: {
    flexDirection: 'row',
    width: '90%',
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'space-between'
  }
})