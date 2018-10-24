import React, { Component } from 'react';
import { Avatar, Icon, SocialIcon } from 'react-native-elements';
import LinearGradient from 'react-native-linear-gradient';
import StarRating from 'react-native-star-rating';
import axios from 'axios';
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  TextInput,
  TouchableHighlight,
  ScrollView,
  KeyboardAvoidingView,
  ActivityIndicator
} from 'react-native';
var width = Dimensions.get('window').width;
import CONFIG from '../config/config'

export default class FeedbackScreen extends Component {
    static navigationOptions = {
        title: 'Feedback',
        header:null
      };
    constructor(props) {
      super(props);
      this.state = {
        selectedItems: []
      }
    }
    showLoader(){
      if(this.state.showLoader){
              return(
                <View style={styles.ploader}>
                    <ActivityIndicator size="large" color="grey" />
                </View>
              )
          }
      }
    onStarRatingPress(rating) {
      this.setState({
        starCount: rating
      });
    }
    submit(){
      this.setState({showLoader:true})
      var recommendation = ''
      if(this.state.likely) recommendation = "Very Likely"
      else if(this.state.maybe) recommendation = "Maybe"
      else if(this.state.notLikely) recommendation = "Unikely"
      var feedback = {
        rating: this.state.starCount,
        whatDidYouLike: this.state.whatDidYouLike,
        whatToImprove: this.state.whatToImprove,
        timestamp: new Date(),
        recommendation: recommendation
      }
      if(!feedback.rating || !feedback.whatDidYouLike || !feedback.whatToImprove || !feedback.recommendation || !feedback.timestamp){
        alert("Please fill all the fields.")
        this.setState({showLoader:false})
      }
      else{
        axios.post(CONFIG.base_url + 'feedbacks/', feedback)
        .then((response) => {
            alert("Feedback posted successfully.")
            const { navigate } = this.props.navigation;
            navigate("Dashboard")
            this.setState({showLoader:false})
        })
        .catch((error) => {
            alert("You feedback could not be submitted. Please try again later.")
            this.setState({showLoader:false})
        })
      }  
    }
      render() {
        const { navigate } = this.props.navigation;
        return (
          <KeyboardAvoidingView style={styles.container}>
              {this.showLoader()}
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
              }}>How are we doing?</Text>
            </LinearGradient>
            <ScrollView>
            <View style={styles.formContainer}>
              <Text style={styles.label}>How is your experience so far?</Text>
               <StarRating
                  disabled={false}
                  maxStars={5}
                  rating={this.state.starCount}
                  containerStyle={{
                    width:width-200
                  }}
                  emptyStarColor="#E62221"
                  fullStarColor="#E62221"
                  selectedStar={(rating) => this.onStarRatingPress(rating)}
                />
                <Text style={styles.label}>What is it that you liked most?</Text>
                <TextInput
                    style={styles.inputStyle1}
                    multiline={true}
                    onChangeText={(whatDidYouLike) => this.setState({whatDidYouLike:whatDidYouLike})}
                  />
                <Text style={styles.label}>What is it that we should improve?</Text>
                <TextInput
                    style={styles.inputStyle1}
                    multiline={true}
                    onChangeText={(whatToImprove) => this.setState({whatToImprove:whatToImprove})}
                  />
                  <Text style={styles.label}>How likely would you recommend stayfit to your friends?</Text>
                  <View style={styles.preferences}>
                        <TouchableHighlight underlayColor="transparent" onPress={() => this.setState({likely:true, maybe:false, notLikely:false})}>
                            <View style={[styles.preferenceBase, this.state.likely && styles.preference]}>
                                <Text style={styles.prefText}>Very Likely</Text>
                            </View>
                        </TouchableHighlight>
                        <TouchableHighlight underlayColor="transparent" onPress={() => this.setState({likely:false, maybe:true, notLikely:false})}>
                            <View style={[styles.preferenceBase, this.state.maybe && styles.preference]}>
                                <Text style={styles.prefText}>Maybe</Text>
                            </View>
                        </TouchableHighlight>
                        <TouchableHighlight underlayColor="transparent" onPress={() => this.setState({likely:false, maybe:false, notLikely:true})}>
                            <View style={[styles.preferenceBase, this.state.notLikely && styles.preference]}>
                                <Text style={styles.prefText}>I Won't</Text>
                            </View>
                        </TouchableHighlight>
                    </View>
                  <TouchableHighlight onPress={() => this.submit()}
                    underlayColor="transparent">
                    <View style={styles.submitButton}>
                        <Text style={styles.submitText}>Submit</Text>
                    </View>
                </TouchableHighlight>
            </View>
            </ScrollView>

          </KeyboardAvoidingView>
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
      formContainer:{
        alignItems:'center'
      },
      preferences:{
        flexWrap: 'wrap',
        flexDirection: 'row',
        width:width-30,
        height:80
    },
    preference:{
        backgroundColor:'#E62221',
        width:(width-40)/3-15,
        margin:10,
        marginLeft:0,
        height:40,
        borderRadius: 40,
    },
    preferenceBase:{
        backgroundColor:'#ef6464',
        width:(width-40)/3-15,
        margin:10,
        marginLeft:0,
        height:40,
        borderRadius: 40,
    },
    prefText:{
        color:'white',
        alignSelf: 'center',
        fontWeight: 'bold',
        paddingTop: 10,
    },
      submitButton:{
        width:width-60,
        height:50,
        backgroundColor: '#E62221',
        borderRadius: 60,
        alignItems: 'center',
        alignSelf: 'center',
        padding:8,
        paddingTop:15,
        marginLeft:30,
        marginRight:30
      },
      formContainer:{
        width:width-60,
        margin:30,
        marginTop: 10,
      },
      label:{
        fontSize:16,
        marginBottom:10,
        marginTop: 20,
        width:width-40
      },
      inputStyle:{
        borderBottomColor: '#E62221',
        borderBottomWidth: 1,
        backgroundColor:'transparent',
        fontSize: 16,
        color:'grey',
        padding:10
      },
      inputStyle1:{
        borderBottomColor: '#E62221',
        borderBottomWidth: 1,
        backgroundColor:'transparent',
        fontSize: 16,
        color:'grey',
        padding:10
      },
      submitText:{
        color:'white',
        fontSize:14
      },
      ploader:{
        width:width,
        height:"100%",
        position:'absolute',
        zIndex:100,
        backgroundColor:"rgba(255,255,255,0.7)",
        paddingTop:"70%",
        marginTop:140
      }
    });