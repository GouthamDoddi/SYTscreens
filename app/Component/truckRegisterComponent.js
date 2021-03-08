import React from 'react';
import { Text, View } from 'react-native';

const TruckRegisterComponent = ({ truckComponents }) =>
  <View>
    {
      truckComponents.map((component, i) =>
        <View key={i}>
          { component }
        </View>)
    }
  </View>;

export default TruckRegisterComponent;

// const styles = StyleSheet.create({
//   truck: { marginTop: 30,
//     paddingLeft: 10,
//     height: 70,
//     width: 70,
//     marginBottom: 10,
//     borderWidth: 1,
//     borderStyle: 'dashed',
//     borderColor: '#ff8f35' },
//   truckText: { color: 'white',
//     // paddingTop: 15,
//     paddingLeft: 3,
//     textDecorationLine: 'underline' },
//   truckText2: { color: 'white',
//     paddingLeft: 3 },
//   viewBorder:
//   { marginTop: '7%',
//     borderColor: 'white',
//     borderWidth: 1,
//     borderRadius: 5,
//     borderStyle: 'dotted' },
// });
