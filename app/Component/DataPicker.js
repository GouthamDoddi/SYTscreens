import React, { useState } from 'react';
import { SafeAreaView, StyleSheet, View } from 'react-native';
import DatePicker from 'react-native-datepicker';

const App = () => {
  const [ date, setDate ] = useState('09-10-2020');

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.container}>
        <DatePicker
          style={styles.datePickerStyle}
          date={date} // Initial date from state
          mode="date" // The enum of date, datetime and time
          placeholder="select date"
          format="DD-MM-YYYY"
          minDate="01-10-2020"
          maxDate="01-01-2030"
          confirmBtnText="Confirm"
          cancelBtnText="Cancel"
          customStyles={{
            dateIcon: {
              // display: 'none',
              position: 'absolute',
              left: 0,
              top: 4,
              marginLeft: 0,
            },
            dateInput: {
              marginLeft: 36,
            },
          }}
          onDateChange={e => {
            setDate(e);
          }}
        />
      </View>
    </SafeAreaView>
  );
};

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // padding: 10,
    justifyContent: 'center',
    // alignItems: 'center',
  },
  datePickerStyle: {
    backgroundColor: '#FFFFFF',
    borderWidth: 0.5,
    borderColor: '#979797',
  },
});
