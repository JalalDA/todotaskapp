import { Animated, RefreshControl, SafeAreaView, StyleSheet } from 'react-native'
import React, { useEffect, useState } from 'react'
import FloatingButton from '../components/moleculs/FloatingButton'
import { useSelector } from 'react-redux'
import { RootState } from '../store/store'
import CardItem from '../components/moleculs/CardItem'
import SearchBar from '../components/moleculs/SearchBar'
import { verticalScale } from '../styles/sized'
import { Colors } from '../styles/color'
import { Categories, Status } from '../constant'
import EmptyState from '../components/moleculs/EmptyState'
import FilterBar from '../components/moleculs/FilterBar'
import { ICat, Itodo } from '../types'

type Props = {}

const Home = (props: Props) => {
  const scrollY = React.useRef(new Animated.Value(0.01)).current
  const data = useSelector((state: RootState) => state.todos.todo)
  const [refreshing, setRefreshing] = useState(false)
  const [searchInput, setSearchInput] = React.useState<string>("")
  const [filteredData, setFilteredData] = React.useState<Itodo[]>([])
  const [searchData, setSearchData] = React.useState<Itodo[]>([])
  const [catState, setCateState] = React.useState<ICat[]>([{ name: "" }, ...Categories, ...Status, { name: "" }])
  const getSearchFilter = () => {
    let searchData : Itodo[];
    if(activCat.length !== 0){
      searchData = filteredData.filter((item)=>item.title.toLocaleLowerCase().includes(searchInput.toLocaleLowerCase()))
      setSearchData(searchData)
      setFilteredData(searchData)
    }else{
      searchData = data.filter((item:Itodo) => item.title.toLowerCase().includes(searchInput.toLowerCase()))
      setSearchData(searchData)
      setFilteredData(searchData)
    }
  }

  const activCat = catState.filter((item=>item.isActive))
  let filtering : Itodo[] = []
  const applyFilters = () => {
    if(activCat.length === 0){
      setFilteredData([])
    }
    if(searchData.length !== 0){
      return activCat.map((cat)=>{
        const matching = searchData.filter((item)=>item.status === cat.name || item.categoriez === cat.name)
        if(matching.length === 0){
          return
        }else{
          matching.map((item)=>filtering.push(item))
          setFilteredData(filtering)
        }
      })
    }
    activCat.map((cat)=>{
      const matching = data.filter((item)=>item.status === cat.name || item.categoriez === cat.name)
      if(matching.length === 0){
        return 
      }else{
        matching.map((item)=>filtering.push(item))
        setFilteredData(filtering)
      }
    })
  };

  useEffect(()=>{
    applyFilters()
  }, [activCat.length])

  const reset = ()=>{
    setRefreshing(true)
    setSearchData([])
    setFilteredData([])
    setCateState([{ name: "" }, ...Categories, ...Status, { name: "" }])
    setTimeout(()=>setRefreshing(false), 500)
  }
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: Colors.primary }}>
      <SearchBar getSearch={getSearchFilter} setSearch={setSearchInput} />
      <Animated.FlatList
        ListHeaderComponent={
          <FilterBar filtering={catState} setCatData={setCateState} />
        }
        refreshControl={
          <RefreshControl
            onRefresh={reset}
            refreshing={refreshing}
          />
        }
        ListEmptyComponent={() => <EmptyState />}
        style={{ zIndex: 0 }}
        keyExtractor={(e, index) => index.toString()}
        onScroll={Animated.event([
          {
            nativeEvent: {
              contentOffset: { y: scrollY }
            }
          }
        ], { useNativeDriver: true })}
        showsVerticalScrollIndicator={false}
        data={filteredData.length === 0 ? data : filteredData}
        renderItem={({ item, index }) => {
          const inputRange = [
            -1,
            0,
            200 * index,
            200 * (index + 2)
          ]
          const opacityInputRange = [
            -1,
            0,
            200 * index,
            200 * (index + 0.5)
          ]
          const scale = scrollY.interpolate({
            inputRange,
            outputRange: [1, 1, 1, 0.7]
          })
          const opacity = scrollY.interpolate({
            inputRange: opacityInputRange,
            outputRange: [1, 1, 1, 0.7]
          })
          return <CardItem item={item} scale={scale} opacity={opacity} />
        }}
      />

      < FloatingButton />
    </SafeAreaView >
  )
}

export default Home

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