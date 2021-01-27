import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';


function SubmitButton ({ data }) {
  const { label, onSubmit, disabled } = data;

  return (
    <View style={styles.btnBlock} >
      <TouchableOpacity disabled={disabled} onPress={onSubmit}>
        <View><Text style={styles.btn}>{label}</Text></View>
      </TouchableOpacity>
    </View >
  );
}

export default SubmitButton;

const styles = StyleSheet.create({
  btnBlock: {
    backgroundColor: '#DFDFDF',
    height: 24,
    width: '30.3%',
    alignSelf: 'flex-end',
    paddingVertical: '1.2%',
    marginTop: '1.6%',
  },
  btn: {
    color: '#FFFFFF',
    fontSize: 13,
    lineHeight: 15,
    letterSpacing: 0,
    marginTop: '0.6%',
    textAlign: 'center',
  },
});
