import React from 'react';
import { View, Text, StyleSheet, TextInput } from 'react-native';
import AppLoading from 'expo-app-loading';
import { useFonts, Poppins_400Regular } from '@expo-google-fonts/poppins';

function Input2 ({ data }) {
  const { label, placeholder, touched, error, disabled,
    restInput, onChangeText } = data;


  // loading fonts
  const [ isLoaded ] = useFonts({
    Poppins_400Regular,
  });

  if (!isLoaded)
    return <AppLoading />;

  return (
    <View style={style.inputHeader}>
      <Text style={style.labelContainer}>{label}</Text>
      <TextInput
        style={style.input}
        label={label}
        placeholder={placeholder}
        errorStyle={{ color: 'red' }}
        errorMessage={touched && error}
        onChangeText={onChangeText}
        disabled={disabled}
        {...restInput}
        inputStyle={{ color: '#000000' }}
        placeholderTextColor="#C7C7C7"
      />
      <Text style={{ color: 'red', marginTop: 5 }}>{touched && error}</Text>
    </View>
  );
}

export default Input2;

const style = StyleSheet.create({
  labelContainer: {
    color: '#FFFFFF',
    fontFamily: 'Poppins_400Regular',
    fontSize: 10,
    lineHeight: 11,
    letterSpacing: 0.29,
    marginTop: '1%',
  },
  input: {
    color: '#000000',
    fontSize: 14,
    lineHeight: 16,
    letterSpacing: 0.4,
    fontFamily: 'Poppins_400Regular',
    marginTop: '1%',
    marginBottom: '1%',
  },
  inputHeader: {
    borderColor: '#A8A8A8',
    height: 60.4,
    borderBottomWidth: 1,
  },
});

