import React from 'react';
import { View, Text, StyleSheet, TextInput } from 'react-native';
import { ArialMT } from 'expo-font';

// creating a custom hook called useInput
const Input = ({ componentData }) => {
  const { label, placeholder, onChangeText, touched, restInput, disabled, defaultValue, color } = componentData;
  const styles = StyleSheet.create({
    labelContainer: {
      color: color
        ? color
        : '#FFFFFF',
      fontFamily: ArialMT,
      fontSize: 10,
      lineHeight: 11,
      letterSpacing: 0.29,
      marginTop: '1%',
    },
    input: {
      color: color
        ? '#000000'
        : '#ffffff',
      fontSize: 20,
      lineHeight: 23,
      letterSpacing: 0,
      fontFamily: ArialMT,
      marginTop: '0.6%',
      marginBottom: '0.6%',
    },
    inputHeader: {
      borderColor: color
        ? color
        : '#FFFFFF',
      height: 50,
      borderBottomWidth: 1,
    },
  });


  return (
    <View style={styles.inputHeader}>
      <Text style={styles.labelContainer}>{label}</Text>
      <TextInput
        style={styles.input}
        label={label}
        placeholder={placeholder}
        errorStyle={{ color: 'red' }}
        errorMessage={touched && error}
        value={defaultValue}
        onChangeText={ text => onChangeText(text) }
        disabled={disabled}
        {...restInput}
        inputStyle={{ color: 'black' }}
        placeholderTextColor= { color
          ? color
          : '#FFFFFF' }
      />
      <Text style={{ color: 'red', marginTop: 5 }}>{touched && error}</Text>
    </View>);
};

export default Input;
