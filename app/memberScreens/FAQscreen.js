import React, { Component } from 'react';
import { Avatar, Icon, SocialIcon } from 'react-native-elements';
import LinearGradient from 'react-native-linear-gradient';
import {
  StyleSheet,
  Text,
  View,
  Dimensions
} from 'react-native';
var width = Dimensions.get('window').width;
export default class FAQscreen extends Component {
    static navigationOptions = {
        title: "FAQ's",
        header:null
      };
      render() {
        const { navigate } = this.props.navigation;
        return (
          <View style={styles.container}>
              <LinearGradient colors={['#b24d2e', '#b23525', '#E62221']} style={styles.headDesign}>
              <Avatar
                size="small"
                rounded
                icon={{name: 'arrow-back'}}
                onPress={() => navigate('Profile')}
                containerStyle={{margin: 30}}
              />
              <Text style={{
                fontSize:24,
                color:'white',
                marginLeft:30,
                marginTop:-10
              }}>FAQs</Text>
            </LinearGradient>
          </View>
        );
      }
    }
    
    const styles = StyleSheet.create({
      container: {
        flex: 1,
        backgroundColor: '#F5FCFF',
      },
      headDesign:{
        width:width,
        height:140
      }
    });