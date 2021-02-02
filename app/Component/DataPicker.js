import React, { useState } from 'react';
import { Text, View, Button, Platform, TouchableOpacity, Image, StyleSheet } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';

export const DatePicker = ({ action }) => {
  const [ date, setDate ] = useState(new Date(1598051730000));
  const [ mode, setMode ] = useState('date');
  const [ show, setShow ] = useState(false);

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;

    setShow(Platform.OS === 'ios');
    setDate(currentDate);
    console.log(date);
    action(JSON.stringify(date));
  };

  const showMode = currentMode => {
    setShow(true);
    setMode(currentMode);
  };

  const showDatepicker = () => {
    showMode('date');
  };

  return (
    <View>
      <View style={styles.container}>
        <TouchableOpacity onPress={showDatepicker}>
          <Text style={styles.backarrow}>Date Time</Text>
          <Image
            style={styles.img}
            source={require('../Images/calender.jpg')}
          />
        </TouchableOpacity>
      </View>
      {show &&
        <DateTimePicker
          testID="dateTimePicker"
          value={date}
          mode={mode}
          is24Hour={true}
          display="default"
          onChange={
            onChange}
        />
      }
    </View>
  );
};

export default DatePicker;

const styles = StyleSheet.create({ backarrow: {
  color: '#000000',
  fontSize: 16,
  lineHeight: 45,
  marginTop: '1.6%',
  marginLeft: '2.8%',
},
img: {
  width: 35,
  height: 35,
  marginTop: '-13.2%',
  marginLeft: '28%',
},
container: {
  borderColor: '#000000',
  borderRadius: 3,
  borderStyle: 'solid',
  borderWidth: 0.5,
  alignItems: 'flex-start',
  paddingBottom: 5,
} });


//     {/* date */}
//     <View>
//       <View style={styles.container2}>
//         <TouchableOpacity onPress={showDatepicker}>
//           <Text style={styles.backarrow2}>Date Time</Text>
//           <Image
//             style={styles.img2}
//             source={require('../../Images/calender.jpg')}
//           />
//         </TouchableOpacity>
//       </View>
//       {show &&
// <DateTimePicker
//   testID="dateTimePicker"
//   value={date}
//   mode={mode}
//   is24Hour={true}
//   display="default"
//   onChange={onChange}
// />
//       }

//     </View>

//     {/* date */}
