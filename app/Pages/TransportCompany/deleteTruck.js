import React, {useState} from 'react'
import { ScrollView, View, Text, StyleSheet } from 'react-native';
import { useSelector } from 'react-redux';
import { AntDesign } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';
import axios from 'axios';
import qs from 'querystring';

import { localAxiosToken } from '../../utils/axios';

function deleteTruck({navigation}) {
  const AllTruckData = useSelector(state => state.AllTruckData);
  const OwnerToken = useSelector(state => state.OwnerToken)
  const [ deleted, setDeleted ] = useState(false);

  const deleteTruck = ( truckNo, index ) => {

    axios(localAxiosToken('/deleteTruck', qs.stringify({truckNo}), OwnerToken))
    .then(res => {
      if (res.data.statusCode === 200)
        AllTruckData.splice(index, 1)
    })

  }
  return (
    <View style={styles.background}>
      <View style={styles.container}>
        <Text style={styles.headLine}> Delete The Truck </Text>
        <Entypo  style={ styles.cross } name="cross" size={35} color='black' />
        <ScrollView style={styles.listContainer}>
        {
          AllTruckData.map(( data, index) => 
          <View style={ styles.list } key={index}>
            <AntDesign name="exclamationcircleo" size={20} color='black' />
            <Text style={ styles.text } >{ data.truck_no }</Text>
            <AntDesign onPress={() => deleteTruck(data.truck_no, index)} style={styles.delete} name="delete" size={20} color='black' />
            <View style={ styles.borderBottom }></View>
          </View>
            )
        }
        </ScrollView>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  background: {
    backgroundColor: 'black',
    height: '100%'
  },
  container: {
    height: '90%',
    width: '90%',
    marginTop: '10%',
    // marginBottom: '25%',
    marginLeft: '5%',
    backgroundColor: 'white', 
  },
  headLine: {
    fontSize: 25,
    marginTop: '8%',
    marginLeft: '3%',
    marginBottom: '10%',
  },
  cross: {
    marginLeft: '85%',
    marginTop: '-19%'
  },
  list: {
    marginTop: '5%',
  },
  listContainer: {
    marginTop: '8%',
  },
  text: {
    marginLeft: '10%',
    marginTop: '-6%'
  },
  delete: {
    marginLeft: '80%',
    marginTop: '-6%',
  },
  borderBottom: {
    marginTop: '5%',
    backgroundColor: "black",
    borderWidth: 0.5,
    marginRight: '5%',
    marginLeft: '5%',
  },
})

export default deleteTruck;
