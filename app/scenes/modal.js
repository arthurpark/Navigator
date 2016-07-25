
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
    scene: PropTypes.object.isRequired,
    transitionProps: PropTypes.object.isRequired,
  };

  render() {
    const { navigate, scene, transitionProps } = this.props;
    return (
      <Scene {...transitionProps}>
        <ScrollView style={styles.scrollView}>

          <ScrollView style={styles.scrollView}>
            <View>
              <Text>Modal: {scene.route.key}</Text>
            </View>

            <Button
              label="Close"
              onPress={() => navigate({ type: 'pop' })}
            />
          </ScrollView>
        </ScrollView>
      </Scene>
    )
  }
}

const styles = StyleSheet.create({
  scrollView: {
    flex: 1,
    backgroundColor: '#cecece',
  },
});
