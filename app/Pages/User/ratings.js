import React, { useState } from 'react';
import {View,Text, TouchableOpacity,TextInput,StyleSheet,Button} from 'react-native';
import { useSelector } from 'react-redux';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import axios from 'axios';
import qs from 'querystring';

import CustomStarExample from '../../Component/RatingStar';
import { localAxiosToken } from '../../utils/axios';


function Delivery({navigation}){
  const SelectedTrip = useSelector(state => state.SelectedTrip);
  const CustomerToken = useSelector(state => state.CustomerToken);
  const CustomerMobileNum = useSelector(state => state.CustomerMobileNum);
  const Rating = useSelector(state => state.Rating);
  const [ rated, setRated ] = useState(0);
  const [ review, setReview ] = useState("");


  const addRaing = () => {
    console.log(`rating = ${Rating}`);
    axios(localAxiosToken('/getTruck', qs.stringify({ truckNo: SelectedTrip[0].truck_no }), CustomerToken))
    .then(res => {
      console.log(res.data);
      if (res.data.statusCode === 200) {

        const params = qs.stringify({
          truckNo: SelectedTrip[0].truck_no,
          truckOwnerMobileNo: res.data.message[0].truckowner_mobile_num === null
                          ? 0
                          : res.data.message[0].truckowner_mobile_num,
          companyMobileNo: res.data.message[0].transport_company_mobile_num === null
                          ? 0
                          : res.data.message[0].transport_company_mobile_num,
          tripId: SelectedTrip[0].trip_id,
          rating: Rating,
          mobileNum: SelectedTrip[1].customer_mobile_num,
          receivingPersonNo: SelectedTrip[1].receiving_person_mobile_no,
          comment: review,
          packageId: SelectedTrip[1].package_id,
        })
    
        axios(localAxiosToken('/addRating', params, CustomerToken))
        .then(res => {
          console.log(res.data);
          if (res.data.statusCode === 200) {
            setRated('done');
          } else {
            setRated('failed');
          }
        })

      } else {
        setRated('failed');
      }
    })
    .catch(err => {
      console.log(err);
    })
  }


    return(
        <View style={styles.container}>
            <Text style={styles.deliverystyle}>Delivery Alert</Text>
            <Text style={styles.deliverystyle2}>Delivered</Text>
            <TouchableOpacity>
            <Text style={styles.package}>Did not Recived the Package?</Text>
            </TouchableOpacity>
            <View style={styles.row1}>
            <View style={styles.column1}>
                <Text style={styles.text2}>Package Weight</Text>
                <Text style={styles.text3}>{SelectedTrip[1].package_weight}</Text>
               
            </View>
            <View style={styles.column2}>
                <Text style={styles.text2}>Package Space</Text>
                <Text style={styles.text3}>{SelectedTrip[1].package_space}</Text>
            </View>
            </View>
            <View style={styles.gap}>
                <Text style={styles.bold}>Drop Location</Text>
                <Text style={styles.text1}>{SelectedTrip[1].drop_point}</Text>
            </View>
            <View style={styles.gap}>
                <Text style={styles.bold}>Customer Name</Text>
                <Text style={styles.text1}>{SelectedTrip[1].customer_name}</Text>
            </View>
            <Text style={styles.deliverypartner}>Rate Delivery Partner</Text>
            <View style={styles.row2}>
            <Icon name="phone" size={40}/>
            <View style={styles.left}>
            <Text style={styles.bold}>Driver info</Text>
            <Text style={styles.text}>{SelectedTrip[0].truck_no}</Text>
            </View>
            </View>
            <CustomStarExample />
            <View style={styles.comment}>
            <TextInput
              // style={styles.input}
              placeholder={'Leave a review'}
              errorStyle={{ color: 'red' }}
              onChangeText={ text => setReview(text) }
              inputStyle={{ color: 'black' }}
              placeholderTextColor="#000000"
            />            
          </View>
          <Button title="DONE" color="orange" onPress={addRaing}/>
          {
            rated === 'done'
            ? <Text>Your rating has been added</Text>
            : rated === 'failed'
            ? <Text>Failed to update your review.</Text>
            : <Text></Text>
          }
        </View>     

    )
}
const styles=StyleSheet.create({
    container:{
       padding:25
     },
     deliverystyle:{
         fontSize:25
     },
     deliverystyle2:{
         fontSize:25,
         color:"orange",
         fontWeight:"bold"
     },
     package:{
         color:"orange",
         textDecorationLine:"underline",
         fontSize:17
     },
     gap:{
         marginTop:10,
     },
     bold:{
         fontWeight:"bold",
         fontSize:17
     },
     text1:{
         fontSize:17
     },
     deliverypartner:{
         color:"orange",
         fontSize:25,
         fontWeight:"bold",
         marginTop:20
     },
     comment:{
        borderWidth:2,
        height:80,
        marginTop:15,
        marginBottom:30
    },
    text2:{
        fontSize:12
    },
    text3:{
        fontSize:20
    },
    row1:{
        flexDirection:"row"
    },
    column1:{
        flexDirection:'column',
        marginTop:15
    },
    column2:{
        flexDirection:"column",
        marginTop:15,
        marginLeft:50
        
    },
    row2:{
        marginTop:10,
        marginBottom:10,
        flexDirection:"row"

    },
    left:{
        marginLeft:20
    }
})
export default Delivery;