import { StyleSheet } from 'react-native';
import * as Font from 'expo-font';


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'red',
    height: '100%',
    width: '100%',
  },
  //   responsiveBox: {
  //     width: wp('100%'),
  //     height: hp('100%'),
  //   },
  part1: {
    width: '100%',
    height: '33.33%',
    backgroundColor: '#FF9F00',
  },
  img: {
    marginTop: '5%',
    marginLeft: '10%',
  },
  mainText: {
    color: '#FFFFFF',
    fontSize: 24,
    lineHeight: 32,
    fontFamily: Font.PTSans,
    marginTop: '22%',
    marginBottom: '3%',
    textAlign: 'center',
    // marginLeft:'25.9%',
    // marginRight:'26.1%',
  },
  part2: {
    width: '100%',
    height: '33.33%',
    backgroundColor: '#FF8200',
  },
  img2: {
    marginTop: '-10%',
  },
  mainText2: {
    color: '#FFFFFF',
    fontSize: 24,
    lineHeight: 32,
    fontFamily: Font.PTSans,
    marginTop: '22%',
    marginBottom: '3%',
    textAlign: 'center',
    // marginLeft:'25.9%',
    // marginRight:'26.1%',
  },
  part3: {
    width: '100%',
    height: '33.33%',
    backgroundColor: '#000000',
  },
  img3: {
    marginTop: '-10%',
  },
  mainText3: {
    color: '#FFFFFF',
    fontSize: 24,
    lineHeight: 32,
    fontFamily: Font.PTSans,
    marginTop: '22%',
    marginBottom: '3%',
    textAlign: 'center',
    // marginLeft:'25.9%',
    // marginRight:'26.1%',
  },
  arrowing: {
    tintColor: '#FFFFFF',
    alignSelf: 'flex-end',
    marginRight: '19.5%',
    width: 35,
    height: 30,
  },
});

export default styles;
