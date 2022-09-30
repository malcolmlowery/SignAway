import React from 'react';
import styled from 'styled-components/native';
import MapView from 'react-native-maps';
import { BlurView } from 'expo-blur';
import { Dimensions } from 'react-native';
import { useHeaderHeight } from '@react-navigation/elements'
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { PanGestureHandler } from 'react-native-gesture-handler';
import Animated, { 
   useSharedValue, 
   useAnimatedStyle, 
   useAnimatedGestureHandler,
   withSpring } from 'react-native-reanimated';

const { height, width } = Dimensions.get('screen');

const ApartmentFeed = () => {

   const headerHeight = useHeaderHeight();
   const statusBarHeight = useSafeAreaInsets().top;
   const translateY = useSharedValue(0);


   const containerGestureHandler = useAnimatedGestureHandler({
      onStart: (_, ctx: any) => {
         ctx.startY = translateY.value
      },
      onActive: (event, ctx: any) => {
         translateY.value = ctx.startY + event.translationY
      },
      onEnd: (_) => {
         const translateYPosition = translateY.value
         if(translateYPosition < 280) {
            translateY.value =  withSpring(0, { overshootClamping: true })
            return
         }
         if(translateYPosition > 280) {
            translateY.value = withSpring(500, { mass: 0.6 })
            return
         }
      }
   });

   const containerAnimatedStyle = useAnimatedStyle(() => {
      return {
         borderTopRightRadius: translateY.value < 280 ? 0 : 26,
         borderTopLeftRadius: translateY.value < 280 ? 0 : 26,
         transform: [{ translateY: translateY.value }]
      }
   })

   return(
      <Container>
         <MapView 
            initialRegion={{
               latitude: 26.1224,
               longitude: -80.1373,
               latitudeDelta: 0.232,
               longitudeDelta: 0.0421,
            }}
            style={{ height, width, zIndex: -1 }}/>
         <PanGestureHandler onGestureEvent={containerGestureHandler}>
            <Animated.View 
               style={[
                  containerAnimatedStyle,
                  {
                     bottom: 0,
                     height: height - headerHeight - statusBarHeight - 5, 
                     overflow: 'hidden',
                     position: 'absolute',
                     zIndex: 1,
                     width,
                  }
               ]}>
               <BlurView style={{ height, width, zIndex: -1, position: 'absolute' }} intensity={80} tint='light' />
               <NotchContainer>
                  <BlurView style={{ flex: 1, zIndex: 1000, position: 'relative' }} intensity={80} tint='light'>
                     <Notch />
                  </BlurView>
               </NotchContainer>
               <AptListingsScrollView>
               </AptListingsScrollView>
            </Animated.View>
         </PanGestureHandler>
      </Container>
   )
};

export default ApartmentFeed;

const Container = styled.View``;

const NotchContainer = styled.View`
   height: 40px;
   width: ${width}px;
`;

const Notch = styled.View`
   align-self: center;
   background-color: #a5a5a5;
   border-radius: 3px;
   height: 5px;
   position: relative;
   top: 18px;
   width: 65px;
`;

const AptListingsScrollView = styled.ScrollView`
   align-self: center;
   flex: 1;
   margin-top: 14px;
   width: ${width - 36}px;
`;