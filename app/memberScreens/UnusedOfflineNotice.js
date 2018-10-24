import React, { Component } from 'react';
import { View, Modal, Text, Image, TouchableHighlight, NetInfo, Dimensions, StyleSheet } from 'react-native';

const { width } = Dimensions.get('window');

class OfflineNotice extends Component {
  state = {
    isConnected: true
  };

  componentDidMount() {
    NetInfo.isConnected.addEventListener('connectionChange', this.handleConnectivityChange);
  }

  componentWillUnmount() {
    NetInfo.isConnected.removeEventListener('connectionChange', this.handleConnectivityChange);
  }

  handleConnectivityChange = isConnected => {
    if (isConnected) {
      this.setState({ isConnected });
    } else {
      this.setState({ isConnected });
    }
  }

  render() {
    if (!this.state.isConnected) {
      return (
      <Modal
        animationType="none"
        transparent={false}
        visible={true}
        onRequestClose={() => {
          Alert.alert('Modal has been closed.');
        }}>
         <Image source={require('../assets/nointernet.jpg')}
            style={styles.image}
            resizeMode="cover">
        </Image>
        <Text style={{
          position:'absolute',
          bottom:40,
          width:'100%',
          textAlign:'center'
        }}>No Internet connection</Text>
      </Modal>
      )
    }
    return null
  }
}

const styles = StyleSheet.create({
  offlineContainer: {
    backgroundColor: 'white',
    height: "100%",
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    width: "100%",
    position: 'absolute',
    top: 30,
    position:'absolute',
    zIndex:1000
  },
  image:{
    width:180,
    height:130,
    position:'absolute',
    left:"50%",
    marginLeft: -90,
    marginTop: width
  }

});

export default OfflineNotice;
