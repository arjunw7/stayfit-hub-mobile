import React, { Component } from 'react';
import { Avatar, SearchBar, ListItem, Icon } from 'react-native-elements';
import LinearGradient from 'react-native-linear-gradient';
import axios from 'axios';
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  ScrollView
} from 'react-native';
var width = Dimensions.get('window').width;
import CONFIG from '../config/config'

export default class SuperAdminWorkoutHome extends Component {
    constructor(props) {
        super(props);
        this.state ={
          workoutInput: '',
          workoutsList: []
        }
        axios.get(CONFIG.base_url + 'workoutPlans')
        .then((response) => {
            this.setState({workoutsList:response.data._embedded.workoutPlans})
        })
        .catch((error) => {
            alert(error)
        })
    }
    static navigationOptions = {
        title: 'Workouts',
        header: null
    }
  render() {
    const { navigate } = this.props.navigation;
    return (
        <View style={styles.container}>
        <LinearGradient colors={['#b24d2e', '#b23525', '#E62221']} style={styles.headDesign}>
           <Avatar
               size="small"
               rounded
               icon={{name: 'arrow-back'}}
               onPress={() => navigate("SuperAdminHome")}
               containerStyle={{margin: 30}}
           />
           <Text style={{
               fontSize:24,
               color:'white',
               marginLeft:30,
               marginTop:-10
           }}>Workout Plans</Text>
       </LinearGradient>
       <Icon raised reverse name='add' color='#E62221'
            containerStyle={{
              position:'absolute', 
              bottom:10,
              zIndex:2,
              right:10,
              shadowColor: '#7f7f7f',
              shadowOffset: { width: 0, height: 2 },
              shadowOpacity: 0.8,
              shadowRadius: 5
            }}
            onPress={() => navigate('SuperAdminAddWorkout')}
          />
        <SearchBar
          round
          lightTheme
          searchIcon={{ size: 24 }}
          containerStyle={{width:width, backgroundColor:'#f7f7f7'}}
          inputStyle={{backgroundColor:'white'}}
          inputContainerStyle={{backgroundColor:'white'}}
          onChangeText={(workoutInput) => this.setState({workoutInput})}
          placeholder='Search workout plans...' />
          <ScrollView>
          {
            this.state.workoutsList
            .filter(i => this.state.workoutInput === '' || i.name.includes(this.state.workoutInput))
            .map((item, i) => (
              <ListItem
                key={i}
                title={item.name}
                subtitle={item.description}
                containerStyle={{width:width}}
                leftIcon={{ name: 'av-timer'}}
                titleStyle={{fontSize:14}}
                subtitleStyle={{fontSize:12}}
                onPress={() => navigate('SuperAdminViewWorkout', {workoutPlan: JSON.stringify(item)})}
              />
            ))
          }
          </ScrollView>
     </View>
    );
  }
}


const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#F5FCFF',
      width:width
    },
    mainIcons:{
      width:width-40,
      margin:10,
      marginLeft: 5,
      flex:1,
      flexWrap: 'wrap',
      flexDirection: 'row',
    },
    mainIcon:{
      width:width/3-20,
      margin:10,
      paddingTop:20,
      paddingBottom:20,
      borderRadius:7,
      shadowOffset:{  width: 0,  height: 0,  },
      shadowColor: 'grey',
      shadowOpacity: 0.5,
      shadowRadius: 5,
      backgroundColor:'white',
      height:100
    },
    iconText:{
      fontSize:12,
      color:'#E62221',
      alignSelf:'center',
      alignItems:'center',
      marginTop:10
    },
    headDesign:{
      width:width,
      height:140
    },
  });