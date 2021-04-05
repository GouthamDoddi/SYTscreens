import React,{useState} from 'react';
import {View,StyleSheet} from 'react-native';
import StarRating from 'react-native-star-rating';
import { useDispatch } from 'react-redux';

import { rating } from '../Redux/actions/other';

function CustomStarExample(){
  const[starrating,setStarRating]=useState(0);
  const dispatch = useDispatch();

  return (
      <View style={styles.container}>
      <StarRating
        disabled={false}
        maxStars={5}
        rating={starrating}
        selectedStar={e =>{
          setStarRating(e)
          dispatch(rating(e))
        }}
        fullStarColor={'orange'}
      />
      </View>
    );
  }
  const styles=StyleSheet.create({
    container:{
      width:250
    }
  })


export default CustomStarExample;
