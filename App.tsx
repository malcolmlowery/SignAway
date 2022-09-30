import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

// Screens
import ApartmentFeed from './src/screens/apartment-feed';

const Stack = createNativeStackNavigator();

const App = () => {
   const isAuthenticated = true;

   return (
      <NavigationContainer>
         <Stack.Navigator>
            { isAuthenticated ?
               <Stack.Group screenOptions={{ headerShadowVisible: false, headerTransparent: true, headerBlurEffect: 'prominent' }}>
                  <Stack.Screen name='home' component={ApartmentFeed} options={{ headerLargeTitle: true, headerTitle: 'SignAway' }} />
               </Stack.Group>
            :
               <>
               <Stack.Screen name='login' component={null} />
               </>
            }
         </Stack.Navigator>
      </NavigationContainer>
   );
};

export default App;