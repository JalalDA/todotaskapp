import React from 'react'
import Home from './src/screens/Home'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { PaperProvider } from 'react-native-paper'
import { Provider } from 'react-redux'
import { store, persistor } from './src/store/store'
import { PersistGate } from 'redux-persist/integration/react'
import Create from './src/screens/Create'
import Task from './src/screens/Task'

type Props = {}

const App = (props: Props) => {
  const Stack = createNativeStackNavigator()
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <PaperProvider>
          <NavigationContainer>
            <Stack.Navigator screenOptions={{ headerShown: false }} initialRouteName='Home'>
              <Stack.Screen name='Home' component={Home} />
              {/* @ts-ignore */}
              <Stack.Screen name="Create" component={Create} />
              {/* @ts-ignore */}
              <Stack.Screen name="Task" component={Task} />
            </Stack.Navigator>
          </NavigationContainer>
        </PaperProvider>
      </PersistGate>
    </Provider>
  )
}

export default App