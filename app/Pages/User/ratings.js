import React from 'react';
import {View,Text, TouchableOpacity,TextInput,StyleSheet,Button} from 'react-native';
import { useSelector } from 'react-redux'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import CustomStarExample from '../../Component/RatingStar';
function Delivery({navigation}){
  const SelectedTrip = useSelector(state => state.SelectedTrip);
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
            <CustomStarExample></CustomStarExample>
            <View style={styles.comment}>
            <TextInput > Please let know any comments</TextInput>
            </View>
            <Button title="DONE" color="orange" onPress={() => navigation.navigate('CustomerWelcome')}/>
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