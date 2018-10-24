import React, { Component } from 'react';
import { Avatar, Icon, SocialIcon } from 'react-native-elements';
import LinearGradient from 'react-native-linear-gradient';
import DatePicker from 'react-native-datepicker';
import { Picker } from 'react-native-picker-dropdown'
import SelectMultiple from 'react-native-select-multiple'
import axios from 'axios';
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  TouchableHighlight,
  TextInput,
  ActivityIndicator,
  ScrollView
} from 'react-native';
import CONFIG from '../config/config'
var width = Dimensions.get('window').width;
export default class SuperAdminViewWorkout extends Component {
  static navigationOptions = {
    title: 'Workout Details',
    header:null
  };
  constructor(props) {
    super(props);
    this.state = {
      workoutPlan: JSON.parse(this.props.navigation.state.params.workoutPlan),
      selectedItems:JSON.parse(this.props.navigation.state.params.workoutPlan).muscleGroups
    }
    axios.get(CONFIG.base_url + 'exercises')
    .then((response) => {
        this.setState({exercisesList:response.data._embedded.exercises})
    })
    .catch((error) => {
        alert(error)
    })
    axios.get(CONFIG.base_url + 'muscleGroups')
    .then((response) => {
        this.setState({muscleGroups:response.data._embedded.muscleGroups})
    })
    .catch((error) => {
        alert(error)
    })
}

componentDidMount(){

}
addRow(){
  var workoutExercise = {}
  axios.post(CONFIG.base_url + 'workoutExercises', workoutExercise)
    .then((response) => {
       var workoutPlan = this.state.workoutPlan
       var exercises = workoutPlan.workoutExercises
       exercises.push(response.data)
       workoutPlan.workoutExercises = exercises;
       this.setState({workoutPlan: workoutPlan})
    })
    .catch((error) => {
        alert(error)
    })
}
removeRow(index, i){
  axios.delete(CONFIG.base_url + 'workoutExercises/' + index)
    .then((response) => {
        var workoutPlan = this.state.workoutPlan
        workoutPlan.workoutExercises.splice(i, 1);
        this.setState({workoutPlan: workoutPlan})
    })
    .catch((error) => {
        alert("Error modifying exercises.")
    })
}
updateExerciseListItemExercise(item, i){
  axios.get(CONFIG.base_url + 'exercises/'+item)
    .then((response) => {
      var plan = this.state.workoutPlan;
      plan.workoutExercises[i].exId = item;
      plan.workoutExercises[i].exercise = response.data
      this.setState({workoutPlan: plan})
    })
    .catch((error) => {
        alert("Error updating exercises.")
    })
}
updateExerciseListItemReps(reps, i){
  var plan = this.state.workoutPlan
  plan.workoutExercises[i].repititions = reps;
  this.setState({
    workoutPlan: plan
  })
}
updateExerciseListItemSets(sets, i){
  var plan = this.state.workoutPlan
  plan.workoutExercises[i].sets = sets;
  this.setState({
    workoutPlan: plan
  })
}
updateDayOdfWeek(day, i){
  var plan = this.state.workoutPlan
  plan.workoutExercises[i].dayOfWeek = day;
  this.setState({
    workoutPlan: plan
  })
}
renderExercise(item, i){
  if(item.exercise){
    return(
      <Picker
        style={styles.exerciseItem}
        textStyle
        placeholder="Select exercise"
        selectedValue={item.exercise.id}
        onValueChange={(itemValue) => this.updateExerciseListItemExercise(itemValue, i)}>
          {
            this.state.exercisesList
            .map((item, i) => (
              <Picker.Item key={i} label={item.name} value={item.id} />
            ))
          }
    </Picker>
    )
  }
else{
  return(
    <Picker
      style={styles.exerciseItem}
      placeholder="Select gender"
      onValueChange={(itemValue) => this.updateExerciseListItemExercise(itemValue, i)}>
        {
          this.state.exercisesList
          .map((item, i) => (
            <Picker.Item key={i} label={item.name} value={item.id} />
          ))
        }
  </Picker>
  )
}}
renderDay(item, i){
  if(item.dayOfWeek){
    return(
      <Picker
        style={styles.exerciseItem}
        placeholder="Select day"
        selectedValue={item.dayOfWeek}
        onValueChange={(itemValue) => this.updateDayOdfWeek(itemValue, i)}>
        <Picker.Item key={i} label="Monday" value="Monday" />
        <Picker.Item key={i} label="Tuesday" value="Tuesday" />
        <Picker.Item key={i} label="Wednesday" value="Wednesday" />
        <Picker.Item key={i} label="Thursday" value="Thursday" />
        <Picker.Item key={i} label="Friday" value="Friday" />
        <Picker.Item key={i} label="Saturday" value="Saturday" />
    </Picker>
    )
  }  
  else{
    return(
      <Picker
        style={styles.exerciseItem}
        placeholder="Select day"
        onValueChange={(itemValue) => this.updateDayOdfWeek(itemValue, i)}>
        <Picker.Item key={i} label="Monday" value="Monday" />
        <Picker.Item key={i} label="Tuesday" value="Tuesday" />
        <Picker.Item key={i} label="Wednesday" value="Wednesday" />
        <Picker.Item key={i} label="Thursday" value="Thursday" />
        <Picker.Item key={i} label="Friday" value="Friday" />
        <Picker.Item key={i} label="Saturday" value="Saturday" />
    </Picker>
    )
  }
}
renderReps(item, i){
  if(item.repititions){
    return(
    <TextInput
      maxLength={30}
      style={styles.inputStyle3}
      placeholder="Reps"
      value={item.repititions.toString()}
      onChangeText={(reps) => this.updateExerciseListItemReps(reps, i)}
    />)
  }
  else{
    return(
      <TextInput
      maxLength={30}
      style={styles.inputStyle3}
      placeholder="Reps"
      onChangeText={(reps) => this.updateExerciseListItemReps(reps, i)}
    />
    )
  }
}
renderSets(item, i){
  if(item.sets){
    return(
    <TextInput
      maxLength={30}
      style={styles.inputStyle3}
      placeholder="Sets"
      value={item.sets.toString()}
      onChangeText={(sets) => this.updateExerciseListItemSets(sets, i)}
    />)
  }
  else{
    return(
      <TextInput
      maxLength={30}
      style={styles.inputStyle3}
      placeholder="Sets"
      onChangeText={(sets) => this.updateExerciseListItemSets(sets, i)}
    />
    )
  }
}
onSelectionsChange = (selectedItems) => {
  this.setState({ selectedItems });
  var plan = this.state.workoutPlan;
  plan.muscleGroups = selectedItems
  this.setState({
    workoutPlan: plan
  })
}
updateName(name){
  var plan = this.state.workoutPlan;
  plan.name = name;
  this.setState({
    workoutPlan: plan
  })
}
updateDescription(description){
  var plan = this.state.workoutPlan;
  plan.description = description;
  this.setState({
    workoutPlan: plan
  })
}
updateSuitableFor(value){
  var plan = this.state.workoutPlan;
  plan.suitableFor = value;
  this.setState({
    workoutPlan: plan
  })
}
updateWorkout(){
    axios.put(CONFIG.base_url + 'workoutPlans/'+this.state.workoutPlan.id, this.state.workoutPlan)
    .then((response) => {
        alert("Workout plan Updated.")
    })
    .catch((error) => {
        console.log(error)
        alert(JSON.stringify(error))
    })
  }
  render() {
    const { navigate } = this.props.navigation;
    if(this.state.exercisesList && this.state.muscleGroups){
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
             }}>Workout Plan Details</Text>
         </LinearGradient>
         <ScrollView>
         <View style={styles.inputForm}>
              <View style={styles.inputContainer}>
                <Icon name='rename-box' type='material-community' color="#595959"/>
                <TextInput
                    maxLength={30}
                    style={styles.inputStyle1}
                    placeholder="Enter workout name"
                    value={this.state.workoutPlan.name}
                    onChangeText={(name) => this.updateName(name)}
                  />
              </View>
              <View style={styles.inputContainer}>
                <Icon name='rename-box' type='material-community' color="#595959"/>
                <TextInput
                    maxLength={30}
                    style={styles.inputStyle1}
                    placeholder="Enter workout description."
                    value={this.state.workoutPlan.description}
                    onChangeText={(description) => this.updateDescription(description)}
                  />
              </View>
              <View style={styles.inputContainer}>
                  <Icon name='rename-box' type='material-community' color="#595959"/>
                  <Picker
                      style={styles.inputStyle}
                      placeholder="Select suitable for"
                      selectedValue={this.state.workoutPlan.suitableFor}
                      onValueChange={(itemValue) => this.updateSuitableFor(itemValue)}>
                      <Picker.Item label="Men" value="men" />
                      <Picker.Item label="Women" value="women" />
                      <Picker.Item label="Men & Women" value="both" />
                </Picker>
              </View>
              <View style={styles.inputContainer1}>
                <View style={{flexDirection: 'row'}}>
                  <Icon name='rename-box' type='material-community' color="#595959"/>
                  <Text style={{fontSize:12, marginTop:5, marginLeft:5}}> Target Muscles</Text>
                </View>
                <SelectMultiple
                  items={this.state.muscleGroups}
                  selectedItems={this.state.selectedItems}
                  onSelectionsChange={this.onSelectionsChange} />
              </View>
              <View style={styles.inputContainer2}>
                    <Text style={styles.listTitle}>Exercise List</Text>
                    {
                      this.state.workoutPlan.workoutExercises.map((item, i) => (
                        <View key={i} style={styles.exercises}>
                          <View style={styles.exerciseItemContainer}>
                            {this.renderExercise(item, i)}
                          </View>
                          <View style={styles.repsContainer}>
                            {this.renderReps(item, i)}
                          </View>
                          <View style={styles.setsContainer}>
                           {this.renderSets(item, i)}
                          </View>
                          <View style={styles.dayContainer}>
                           {this.renderDay(item, i)}
                          </View>
                          <View style="closeIcon">
                          <Icon onPress={() => this.removeRow(item.id, i)} 
                              name='close' type='ionicons' color='grey'/>
                          </View>
                        </View>
                      ))
                    }
                     <TouchableHighlight 
                      style={styles.addRowButton}
                      onPress={() => this.addRow()} 
                      underlayColor="transparent">
                      <Text style={styles.addRowText}>Add row</Text>
                    </TouchableHighlight>
              </View>
              <TouchableHighlight onPress={() => this.updateWorkout()} underlayColor="transparent">
                  <View style={styles.login}>
                    <Text style={styles.loginText}>Update Workout</Text>
                  </View>
              </TouchableHighlight>
          </View>
          </ScrollView>
        </View>
      );
    }
    return(
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
  inputContainer1: {
    backgroundColor: '#ededed',
    padding:5,
    paddingTop: 8,
    marginTop: 15,
  },
  inputContainer2: {
    backgroundColor: '#ededed',
    padding:8,
    paddingTop: 8,
    marginTop: 15,
  },
  inputContainer: {
    flexDirection: 'row',
    backgroundColor: '#ededed',
    height:40,
    paddingLeft:5,
    marginTop: 15,
  },
  inputStyle: {
    flex: 1,
    fontSize:16,
    height:40,
    marginTop: -5,
  },
  inputStyle1: {
    paddingLeft: 12,
    fontSize:16,
  },
  inputStyle3: {
    paddingLeft: 12,
    fontSize:12,
    paddingTop: 5,
    height:40
  },
  inputStyle2: {
    marginTop: -6,
  },
  login:{
    width:width-60,
    height:50,
    backgroundColor: '#E62221',
    borderRadius: 50,
    marginBottom: 30,
    alignItems: 'center',
    padding:8,
    paddingTop:15,
    marginTop: 20,
  },
  loginText:{
    color:'white'
  },
  inputForm:{
    margin:20,
    padding:10,
    paddingTop:0,
    width:width-40,
    backgroundColor:'white'
  },
  inputText:{
    width:width-80,
    borderWidth:0,
    borderBottomColor: '#E62221',
    borderBottomWidth: 1,
    marginTop: 5,
    marginBottom: 5,
    height:30
  },
  inputLabel:{
    marginTop: 20,
  },
  loader:{
    marginTop:'100%',
  }, 
  exercises:{
    flexDirection: 'row',
    marginTop: 8,
    height:30
  },
  exerciseItem:{
    marginTop: -7,
    fontSize:10
  },
  exerciseItemContainer:{
    width:130,
    backgroundColor:'white'
  },
  repsContainer:{
    width:30,
    marginLeft: 5,
    backgroundColor:'white'
  },
  setsContainer:{
    width:30,
    marginLeft: 5,
    backgroundColor:'white'
  },
  dayContainer:{
    width:110,
    marginLeft: 5,
    backgroundColor:'white'
  },
  listTitle:{
    width:width-100
  },
  addRowButton:{
    backgroundColor: '#E62221',
    borderRadius:30,
    padding:5,
    width:70,
    alignContent: 'center',
    marginTop: 10,
  },
  addRowText:{
    color:'white',
    alignSelf: 'center',
  }
});