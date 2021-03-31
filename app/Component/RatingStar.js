import React,{useState} from 'react';
import {View,StyleSheet} from 'react-native';
import StarRating from 'react-native-star-rating';
function CustomStarExample(){
 const[starrating,setStarRating]=useState(3);
  return (
      <View style={styles.container}>
      <StarRating
        disabled={false}
        maxStars={5}
        rating={starrating}
        selectedStar={(rating) => setStarRating(rating)}
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
