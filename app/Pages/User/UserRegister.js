import React from 'react';
import { StatusBar, SafeAreaView, Text, View, Image, StyleSheet,
  TouchableOpacity, ScrollView } from 'react-native';
import Input from '../../Component/input';
import { useSelector } from 'react-redux';
import AppLoading from 'expo-app-loading';
import { useFonts, Poppins_400Regular } from '@expo-google-fonts/poppins';
import axios from 'axios';
import { firstNameData, lastNameData, mobileNumData } from '../../utils/formData';


const CustomerRegister = ({ navigation }) => {
  // using selectors
  const customerFirstName = useSelector(state => state.CustomerFirstName);
  const customerLastName = useSelector(state => state.CustomerLastName);
  const customerMobileNum = useSelector(state => state.CustomerMobileNum);

  // functions
  const backPage = () => navigation.navigate('Welcome');

  const config = {
    mode: 'cors',
    crossDomain: true,
    // 'Access-Control-Allow-Origin': 'http://localhost:3000/customerRegister',
    headers: {
      'content-type': 'application/x-www-form-urlencoded;charset=utf-8',
    },
  };

  const onSubmit = async () => {
    await axios.post('http://localhost:3000/customerRegister', qs.stringify({
      firstName: customerFirstName,
      lastName: customerLastName,
      mobileNum: customerMobileNum,
    }), config)
      .then(response => {
        console.log(response);
      })
      .catch(error => console.log(error));
  };

  // loading fonts
  const [ isLoaded ] = useFonts({
    Poppins_400Regular,
  });

  if (!isLoaded)
    return <AppLoading />;


  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <TouchableOpacity onPress={backPage}>
          <Image
            style={styles.leftarrowing}
            source={require('../../Images/left-arrow.png')}
          />
        </TouchableOpacity>
        <View style={styles.form}>
          <Image
            style={styles.img}
            source={require('../../Images/logowhite.jpg')}
          />
          <Text style={styles.headText}>Want to <Text style={styles.bold}>Send</Text></Text>
          <Text style={styles.headText}>(or) <Text style={styles.bold}>Recive </Text>Package?</Text>
          <View>
            <Text style={styles.mainText}>Register</Text>
            <TouchableOpacity onPress={onSubmit}>
              <Text style={styles.loginText}>Already registered? Please <Text
                style={styles.underline}>Login</Text></Text>
            </TouchableOpacity>
            <Input componentData={ firstNameData } />
            <Input componentData={ lastNameData } />
            <Input componentData={ mobileNumData } />
          </View>
          <View>
            <TouchableOpacity onPress={onSubmit}>
              <Text style={styles.arrow}>&#x2794;</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ff8200',
    height: '100%',
    width: '100%',
    marginTop: StatusBar.currentHeight,
  },
  leftarrowing: {
    tintColor: '#FFFFFF',
    width: 25,
    height: 18,
    marginTop: '1.6%',
    marginLeft: '1.8%',
  },
  form: {
    paddingHorizontal: '8.8%',
  },
  img: {
    width: 73.7,
    height: 94,
    marginTop: '3.2%',
  },
  headText: {
    color: '#FFFFFF',
    fontSize: 14,
    lineHeight: 16,
    letterSpacing: 0.4,
    fontFamily: 'Poppins_400Regular',
    marginTop: '0.9%',
  },
  bold: {
    fontWeight: 'bold',
  },
  mainText: {
    color: '#FFFFFF',
    fontSize: 30,
    lineHeight: 34,
    letterSpacing: 0.86,
    fontFamily: 'Poppins_400Regular',
    marginTop: '4.7%',
  },
  loginText: {
    color: '#FFFFFF',
    fontSize: 14,
    lineHeight: 16,
    letterSpacing: 0.4,
    fontFamily: 'Poppins_400Regular',
    marginTop: '0.4%',
    marginBottom: '1.6%',
  },
  underline: {
    textDecorationLine: 'underline',
  },
  arrow: {
    color: '#FFFFFF',
    fontSize: 40,
    lineHeight: 45,
    letterSpacing: 1.37,
    fontFamily: 'Poppins_400Regular',
    marginTop: '5.9%',
    marginBottom: '3%',
    textAlign: 'right',
  },
});


export default CustomerRegister;
