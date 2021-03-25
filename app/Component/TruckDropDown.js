import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { Picker } from '@react-native-community/picker';
import { useSelector } from 'react-redux';


const TruckDropDown = ({ action }) => {
  const [ selectedValue, setSelectedValue ] = useState('Hyderabad');
  const AllTruckData = useSelector(state => state.AllTruckData);
  const trucks = AllTruckData.map((data, i) => <Picker.Item key={i} label={data.truck_no} value={data.truck_no} />);


  return (
    <View style={styles.container}>
      <Picker
        selectedValue={selectedValue}
        style={{ color: '#000000', fontSize: 14, lineHeight: 16, letterSpacing: 0 }}
        onValueChange={(itemValue, itemIndex) => {
          setSelectedValue(itemValue);
          action(itemValue);
          console.log(itemValue);
        }}
      >
        { trucks }
      </Picker>
    </View>
  );
};


const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFFFFF',
    borderWidth: 0.5,
    borderColor: '#979797',
    marginBottom: '1.2%',
  },
});

export default TruckDropDown;
