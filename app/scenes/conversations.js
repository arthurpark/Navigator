/**
 * Conversations
 * @flow
 */
import React, { Component, PropTypes } from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import Scene from '../components/scene';
import Button from '../components/button';

export default class Conversations extends Component {
  static propTypes = {
    conversations: PropTypes.array,
    sceneProps: PropTypes.object.isRequired,
    navigate: PropTypes.func.isRequired,
  };

  render() {
    const { sceneProps, navigate } = this.props;
    const { scene, scenes } = sceneProps;

    return (
      <Scene {...sceneProps} navigate={navigate}>
        <ScrollView style={styles.scrollView}>

          <View>
            <Text>Conversations: {scene.route.key}</Text>
          </View>

          <Button
            label="Thread"
            onPress={() => navigate({ type: 'push', route: { key: 'Thread' } })}
          />
          <Button
            label="Pop Route"
            onPress={() => navigate({ type: 'pop' })}
          />

        </ScrollView>
      </Scene>
    );
  }
}

const styles = StyleSheet.create({
  scrollView: {
    flex: 1,
  },
});