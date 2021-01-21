/* eslint-disable no-undef */
import React from 'react';
import { View, Text, StyleSheet, Icon, TextInput } from 'react-native';
import * as Font from 'expo-font';


const Input = formData => {
  const { label, placeholder, touched, error, onChangeText,
    disabled, restInput } = formData;

  return (
    <View style={styles.inputHeader}>
      <Text style={styles.labelContainer}>{label}</Text>
      <TextInput
        style={styles.input}
        label={label}
        placeholder={placeholder}
        errorStyle={{ color: 'red' }}
        errorMessage={touched && error}
        onChangeText={onChangeText}
        disabled={disabled}
        {...restInput}
        inputStyle={{ color: 'black' }}
        placeholderTextColor="#FFFFFF"
      />
      <Text style={{ color: 'red', marginTop: 5 }}>{touched && error}</Text>
    </View>);
};

const styles = StyleSheet.create({
  labelContainer: {
    color: '#FFFFFF',
    fontFamily: Font.ArialMT,
    fontSize: 10,
    lineHeight: 11,
    letterSpacing: 0.29,
    marginTop: '1%',
  },
  input: {
    color: '#FFFFFF',
    fontSize: 20,
    lineHeight: 23,
    letterSpacing: 0,
    fontFamily: Font.ArialMT,
    marginTop: '0.6%',
    marginBottom: '0.6%',
  },
  inputHeader: {
    borderColor: '#FFFFFF',
    height: 50,
    borderBottomWidth: 1,
  },
});

export default Input;