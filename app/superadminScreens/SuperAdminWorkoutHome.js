import React, { Component } from 'react';
import { Avatar, SearchBar, ListItem, Icon } from 'react-native-elements';
import LinearGradient from 'react-native-linear-gradient';
import GradientHeader from '../components/GradientHeader'
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  ScrollView
} from 'react-native';
var width = Dimensions.get('window').width;
export default class SuperAdminWorkoutHome extends Component {
    constructor(props) {
        super(props);
        this.state ={
          workoutInput: '',
          workoutList: [
            {
              name: 'LiveFit',
              type: 'Goal: Transform your body'
            },
            {
              name: 'Shortcut To Size',
              type: 'Goal: Gain weight and build muscle'
            },
            {
              name: '12-Week Trainer',
              type: 'Goal: Gain weight and build muscle'
            },
            {
              name: 'Labrada Lean Body',
              type: 'Goal: Lose weight'
            },
            {
              name: 'Shortcut To Shred',
              type: 'Goal: Lose weight'
            },
            {
              name: 'Big Man On Campus',
              type: 'Goal: Gain weight and build muscle'
            }
          ]
        }
    }
    static navigationOptions = {
        title: 'Workouts',
        header: null
    }
  render() {
    const { navigate } = this.props.navigation;
    return (
        <View style={styles.container}>
        <GradientHeader title="Workout Plans" navigation={this.props.navigation}/>
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
            this.state.workoutList
            .filter(i => this.state.workoutInput === '' || i.name.includes(this.state.workoutInput))
            .map((item, i) => (
              <ListItem
                key={i}
                title={item.name}
                subtitle={item.type}
                containerStyle={{width:width}}
                leftIcon={{ name: 'av-timer'}}
                titleStyle={{fontSize:14}}
                subtitleStyle={{fontSize:12}}
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
    headDesign:{
      width:width,
      height:140
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
    }
  });