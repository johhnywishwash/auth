//import libraries
import React, { Component } from 'react';
import { View, Text } from 'react-native';
import firebase from 'firebase';
import { Header, Button, Spinner, Card, CardSection } from './components/common';
import LoginForm from './components/LoginForm';

//make the component
class App extends Component {
  state = { loggedIn: null };

  componentWillMount() {
    firebase.initializeApp({
      apiKey: 'AIzaSyCmchsXZpQSCtgcNIjKwS7AF5ZJ2t-iWPE',
      authDomain: 'auth-e874c.firebaseapp.com',
      databaseURL: 'https://auth-e874c.firebaseio.com',
      projectId: 'auth-e874c',
      storageBucket: 'auth-e874c.appspot.com',
      messagingSenderId: '198277549458'
    });

    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        this.setState({ loggedIn: true });
      } else {
        this.setState({ loggedIn: false });
      }
    });
  }

  renderContent() {
    switch (this.state.loggedIn) {
      case true:
        return (
          <Card>
            <CardSection>
              <Button
                onPress={() => {
                  firebase.auth().signOut();
                }}
              >
                Log Out
              </Button>
            </CardSection>
          </Card>
        );
      case false:
        return <LoginForm />;
      default:
        return (
          <Card>
            <CardSection>
              <Spinner size="large" />
            </CardSection>
          </Card>
        );
    }
  }

  render() {
    return (
      <View>
        <Header headerText="Authentication" />
        {this.renderContent()}
      </View>
    );
  }
}

//make the component available
export default App;
