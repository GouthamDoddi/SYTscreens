import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { Picker } from '@react-native-community/picker';


const DropDown = () => {
  const [ selectedValue, setSelectedValue ] = useState('Hyderabad');

  return (
    <View style={styles.container}>
      <Picker
        selectedValue={selectedValue}
        style={{ color: '#000000', fontSize: 14, lineHeight: 16, letterSpacing: 0 }}
        onValueChange={(itemValue, itemIndex) => setSelectedValue(itemValue)}
      >
        <Picker.Item label="Hyderabad" value="Hyderabad" />
        <Picker.Item label="Bengulur" value="Bengulur" />
        <Picker.Item label="Chennai" value="Chennai" />
        <Picker.Item label="Mumbai" value="Mumbai" />
        <Picker.Item label="Delhi" value="Delhi" />
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

export default DropDown;
