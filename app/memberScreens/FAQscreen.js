import React, { Component } from 'react';
import { Avatar, Icon, SocialIcon } from 'react-native-elements';
import LinearGradient from 'react-native-linear-gradient';
import { Container, Header, Content, Accordion } from "native-base";
import axios from 'axios';
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  AsyncStorage,
  ActivityIndicator
} from 'react-native';
var width = Dimensions.get('window').width;
import CONFIG from '../config/config'
export default class FAQscreen extends Component {
    static navigationOptions = {
        title: "FAQ's",
        header:null
      };
      constructor(props) {
        super(props);
        this.state = {
        }
        axios.get(CONFIG.base_url + 'fAQs/')
          .then((response) => {
             this.setState({faqList: response.data._embedded.fAQs})
          })
          .catch((error) => {
              alert("Error fetching FAQs")
          })
      }
      render() {
        const { navigate } = this.props.navigation;
        if(this.state.faqList){
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
              {/* <Content padder>
                <Accordion
                  dataArray={this.state.faqList}
                  iconStyle={{ color: "grey" }}
                  expandedIconStyle={{ color: "#E62221", marginBottom: 5, }}
                  headerStyle={{ backgroundColor: "#b7daf8" }}
                  contentStyle={{ backgroundColor: "#ddecf8" }}
                />
              </Content> */}
            </View>
        );
        }
        return (
          <View style={styles.loader}>
            <ActivityIndicator size="large" color="black" />
          </View>
        )
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
      faqContainer:{
        marginTop:80
      },
      loader:{
        marginTop:'100%',
      }
    });