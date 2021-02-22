import React, { useState } from 'react';
import { Text, View, Button, Platform, TouchableOpacity, Image, StyleSheet } from 'react-native';
import { useDispatch } from 'react-redux';
import DateTimePicker from '@react-native-community/datetimepicker';
import { pickUpDate } from '../Redux/actions/packageDetails';

export const DatePicker2 = () => {
  const [ date, setDate ] = useState(new Date(1598051730000));
  const [ mode, setMode ] = useState('date');
  const [ show, setShow ] = useState(false);

  const dispatch = useDispatch();

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;

    setShow(Platform.OS === 'ios');
    setDate(currentDate);
    dispatch(pickUpDate(JSON.stringify(currentDate)));
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
            onChange }
        />
      }
    </View>
  );
};

export default DatePicker2;

const styles = StyleSheet.create({ backarrow: {
  color: '#000000',
  fontSize: 16,
  lineHeight: 15,
  marginTop: '8.2%',
  marginLeft: '2.8%',
},
img: {
  width: 35,
  height: 26.3,
  marginTop: '-15.2%',
  marginLeft: '58%',
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
