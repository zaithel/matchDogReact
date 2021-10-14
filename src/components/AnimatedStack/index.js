import React, {useEffect, useState} from 'react';
import {View, StyleSheet, useWindowDimensions} from 'react-native';
import Animated, {
  useSharedValue, 
  useAnimatedStyle, 
  withSpring, 
  useAnimatedGestureHandler, 
  useDerivedValue, 
  interpolate, 
  runOnJS} from 'react-native-reanimated';
import { PanGestureHandler } from 'react-native-gesture-handler';
import Like from '../../../assets/images/dog.png'
import Nope from '../../../assets/images/poop.png'

const ROTATION = 50;
const SWIPE_VELOCITY = 900;

const AnimatedStack = (props) =>{

  const{data, renderItem, onSwipeRigth, onSwipeLeft} = props;

  const [currentIndex, setCurrentIndex] = useState (0);
  const [nextIndex, setNextIndex] = useState (currentIndex+1);
  const currentProfile = data[currentIndex];
  const nextProfile = data[nextIndex];
  const {width : screenWidth} = useWindowDimensions();
  const hiddenTranslateX = 2 * screenWidth;
  const translateX = useSharedValue(0);
  const rotate = useDerivedValue(()=> interpolate(
      translateX.value,
      [0, hiddenTranslateX],
      [0, ROTATION],
    ) + 'deg');

  const cardStyle = useAnimatedStyle (() =>({
    transform: [{
      translateX: translateX.value,
    },
    {
      rotate: rotate.value,
    },
  ],
  }));
  
  const nextCardStyle = useAnimatedStyle (() =>({
    transform: [{
      scale : interpolate(translateX.value, [-hiddenTranslateX, 0, hiddenTranslateX], [1, 0.8 , 1]) 
    }],
    opacity: interpolate(translateX.value, [-hiddenTranslateX, 0 , hiddenTranslateX],
      [1, 0.7, 1],
      ),
  }));

  const likeStyle = useAnimatedStyle (()=>({
    opacity: interpolate(translateX.value, [0 , hiddenTranslateX/4],
      [0, 1],
      ),
  }));
  const nopeStyle = useAnimatedStyle (()=>({
    opacity: interpolate(translateX.value, [ 0 , -hiddenTranslateX/4],
      [0, 1],
      ),
  }));

  const gestureHandler = useAnimatedGestureHandler({
    onStart: ( _, context) => {
      context.startX = translateX.value;
    },
    onActive: (event, context) =>{
      translateX.value = context.startX + event.translationX;
    },
    onEnd: (event) => {
      if (Math.abs(event.velocityX) < SWIPE_VELOCITY){
        translateX.value = withSpring(0);
        return;
      }
      translateX.value = withSpring(
        hiddenTranslateX * Math.sign(event.velocityX),
        {},
        () => runOnJS(setCurrentIndex)(currentIndex + 1)
        );
        const onSwipe = event.velocityX>0 ? onSwipeRigth : onSwipeLeft;
        onSwipe && runOnJS(onSwipe)(currentProfile);
    },
  });

  useEffect(()=>{
    translateX.value =0;
    setNextIndex(currentIndex +1);
  },[currentIndex, translateX]
  );

  return(
    <View style= {styles.root}>
      {nextProfile && (<View style={styles.nextCardContainer}>
        <Animated.View style={[styles.animatedCard, nextCardStyle]}> 
            {renderItem({item: nextProfile})}
        </Animated.View>
      </View>
      )}
      {currentProfile &&(
      <PanGestureHandler onGestureEvent={gestureHandler}>
        <Animated.View style={[styles.animatedCard, cardStyle]}>
          <Animated.Image source={Like} style={[styles.like, {left:10}, likeStyle]} resizeMode="contain"></Animated.Image>
          <Animated.Image source={Nope} style={[styles.like, {right:10}, nopeStyle]} resizeMode="contain"></Animated.Image>
          {renderItem({item: currentProfile})}
        </Animated.View>
      </PanGestureHandler>)}
    </View>
  );
};

const styles = StyleSheet.create({
    root:{
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
    width: '100%', 
    backgroundColor:'#D9DCD6'
  },
  animatedCard: {
    width: '90%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center', 
  },
  nextCardContainer: {  
    ...StyleSheet.absoluteFillObject,

    justifyContent: 'center',
    alignItems: 'center',
  
  },
  like:{
    width:100,
    height:100,
    position: 'absolute',
    top:10,
    zIndex: 1,
   // elevation: 1,

  },
});

export default AnimatedStack;