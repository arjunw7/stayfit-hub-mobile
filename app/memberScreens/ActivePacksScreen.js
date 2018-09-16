import React, { Component } from 'react';
import { Avatar, Icon, SocialIcon } from 'react-native-elements';
import LinearGradient from 'react-native-linear-gradient';
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  Image
} from 'react-native';
var width = Dimensions.get('window').width;
export default class ActivePacksScreen extends Component {
    static navigationOptions = {
        title: 'Active Packs/Subscriptions',
        header: null
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
                fontSize:28,
                color:'white',
                marginLeft:30,
                marginTop:-10
              }}>Active Packs/Subscriptions</Text>
            </LinearGradient>
            <View>
              <View style={styles.box}>
                <Image source={require('../assets/memberOption2.jpg')}
                    style={styles.optionLogo}
                    resizeMode="contain">
                </Image>
                <Text style={styles.packType}>Groupex</Text>
              </View>
            </View>
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
      },
      pack:{
        width:width-40,
        margin:20,
        borderRadius:10,
        padding:20,
      },
      packName:{
        fontSize:16,
        fontWeight:'bold',
        alignSelf:'flex-start',
        marginTop:2
      },
      packType:{
        fontSize:16,
        fontWeight:'300',
        alignSelf:'flex-start',
        marginTop:12,
        marginLeft:30
      },
      optionLogo:{
        flex: 1,
        width: undefined,
        height: undefined,
        borderRadius:20,
        marginRight: width/2-20,
      },
      box: {
        flexBasis: width/2+50,
        height:250,
        marginTop:20,
        borderRadius:12,
      }
    });