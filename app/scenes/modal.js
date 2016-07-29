
/**
 * @flow
 */
import React, { Component, PropTypes } from 'react';
import { ScrollView, View, Text, StyleSheet } from 'react-native';
import Scene from '../components/scene';
import Button from '../components/button';

export default class Modal extends Component {
  static propTypes = {
    navigate: PropTypes.func.isRequired,
    sceneProps: PropTypes.object.isRequired,
  };

  render() {
    const { navigate, sceneProps } = this.props;
    const { scene } = sceneProps;

    return (
      <ScrollView style={styles.scrollView}>
        <View style={styles.container}>
          <Text style={styles.text}>Modal: {scene.route.key}</Text>

          <Button
            label="Close"
            onPress={() => navigate({ type: 'pop' })}
          />
        </View>


      </ScrollView>
    )
  }
}

const styles = StyleSheet.create({
  scrollView: {
    flex: 1,
    paddingTop: 16,
    backgroundColor: '#777777',
  },
  container: {
    flex: 1,
    // flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'stretch',
  },
  text: {
    color: '#ffffff',
    fontSize: 20,
    padding: 20,
    textAlign: 'center',
  }
});
