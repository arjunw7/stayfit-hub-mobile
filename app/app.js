import React, {Component} from 'react'
import HomeScreen from './memberScreens/HomeScreen'
import ProfileScreen from './memberScreens/ProfileScreen'
import LoginScreen from './memberScreens/LoginScreen'
import SignupScreen from './memberScreens/SignupScreen'
import GoalScreen from './memberScreens/GoalScreen'
import MemberDetailsScreen from './memberScreens/MemberDetailsScreen'
import ConnectEmailScreen from './memberScreens/ConnectEmailScreen'
import HealthProfileScreen from './memberScreens/HealthProfileScreen'
import AccountDetailsScreen from './memberScreens/AccountDetailsScreen'
import ActivePacksScreen from './memberScreens/ActivePacksScreen'
import FeedbackScreen from './memberScreens/FeedbackScreen'
import FAQscreen from './memberScreens/FAQscreen'
import MyTrainerScreen from './memberScreens/MyTrainerScreen'
import SupportScreen from './memberScreens/SupportScreen'
import SuperAdminAddDiet from './superadminScreens/SuperAdminAddDiet'
import SuperAdminAddEmployee from './superadminScreens/SuperAdminAddEmployee'
import SuperAdminAddExercise from './superadminScreens/SuperAdminAddExercise'
import SuperAdminAddGym from './superadminScreens/SuperAdminAddGym'
import SuperAdminAddMeal from './superadminScreens/SuperAdminAddMeal'
import SuperAdminAddMember from './superadminScreens/SuperAdminAddMember'
import SuperAdminAddWorkout from './superadminScreens/SuperAdminAddWorkout'
import SuperAdminHome from './superadminScreens/SuperAdminHome'
import SuperAdminViewDiet from './superadminScreens/SuperAdminViewDiet'
import SuperAdminViewEmployee from './superadminScreens/SuperAdminViewEmployee'
import SuperAdminViewExercise from './superadminScreens/SuperAdminViewExercise'
import SuperAdminViewGym from './superadminScreens/SuperAdminViewGym'
import SuperAdminViewMeal from './superadminScreens/SuperAdminViewMeal'
import SuperAdminViewMember from './superadminScreens/SuperAdminViewMember'
import SuperAdminViewWorkout from './superadminScreens/SuperAdminViewWorkout'
import MemberTabNavigation from './components/MemberTabNavigation'
import SuperAdminGymHome from './superadminScreens/SuperAdminGymHome'
import SuperAdminMemberHome from './superadminScreens/SuperAdminMemberHome'
import SuperAdminEmployeeHome from './superadminScreens/SuperAdminEmployeeHome'
import SuperAdminExerciseHome from './superadminScreens/SuperAdminExerciseHome'
import SuperAdminWorkoutHome from './superadminScreens/SuperAdminWorkoutHome'
import SuperAdminMealHome from './superadminScreens/SuperAdminMealHome'
import SuperAdminDietHome from './superadminScreens/SuperAdminDietHome'

import {
  StackNavigator,
} from 'react-navigation';
const Router = StackNavigator({
    Home: { screen: HomeScreen },
    Profile: { screen: ProfileScreen }, 
    Login: { screen: LoginScreen },
    Signup: { screen: SignupScreen },
    GoalSelection: { screen: GoalScreen },
    MemberDetails: { screen: MemberDetailsScreen},
    ConnectEmail: {screen: ConnectEmailScreen},
    HealthProfile: {screen: HealthProfileScreen},
    AccountDetails: {screen: AccountDetailsScreen},
    ActivePacks: {screen:ActivePacksScreen},
    Feedback: {screen:FeedbackScreen},
    FAQ: {screen:FAQscreen},
    MyTrainer: {screen: MyTrainerScreen},
    Support: {screen: SupportScreen},
    Dashboard: { screen: MemberTabNavigation,
        navigationOptions: ({ navigation }) => ({
        header:null
        })
    },
    SuperAdminAddDiet:{ screen: SuperAdminAddDiet},
    SuperAdminAddEmployee: {screen: SuperAdminAddEmployee},
    SuperAdminAddExercise: {screen: SuperAdminAddExercise},
    SuperAdminAddGym: {screen: SuperAdminAddGym},
    SuperAdminAddMeal: {screen: SuperAdminAddMeal},
    SuperAdminAddMember: {screen: SuperAdminAddMember},
    SuperAdminAddWorkout: {screen: SuperAdminAddWorkout},
    SuperAdminHome: { screen: SuperAdminHome},
    SuperAdminViewDiet: { screen: SuperAdminViewDiet},
    SuperAdminViewEmployee: { screen: SuperAdminViewEmployee},
    SuperAdminViewExercise: { screen: SuperAdminViewExercise},
    SuperAdminViewGym: { screen: SuperAdminViewGym},
    SuperAdminViewMeal: { screen: SuperAdminViewMeal},
    SuperAdminViewMember: { screen: SuperAdminViewMember},
    SuperAdminViewWorkout: { screen: SuperAdminViewWorkout},
    SuperAdminGymHome: { screen: SuperAdminGymHome},
    SuperAdminMemberHome: { screen: SuperAdminMemberHome},
    SuperAdminEmployeeHome: { screen: SuperAdminEmployeeHome},
    SuperAdminExerciseHome: { screen: SuperAdminExerciseHome},
    SuperAdminWorkoutHome: { screen: SuperAdminWorkoutHome},
    SuperAdminMealHome: { screen: SuperAdminMealHome},
    SuperAdminDietHome: { screen: SuperAdminDietHome}
  }
);

export default class App extends Component{
  render() {
      return <Router />;   
  }
}