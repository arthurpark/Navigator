/**
 * Contacts
 * @flow
 */
 import React, { Component, PropTypes } from 'react';
 import { View, Text, ScrollView, StyleSheet } from 'react-native';
 import Scene from '../components/scene';
 import Button from '../components/button';

export default class Contacts extends Component {
  static propTypes = {
    contacts: PropTypes.array,
    sceneProps: PropTypes.object.isRequired,
    navigate: PropTypes.func.isRequired,
  };

  render() {
    const { sceneProps, navigate } = this.props;
    const { scene, scenes } = sceneProps;

    return (
      <ScrollView style={styles.scrollView}>

        <View>
          <Text>Contacts: {scene.route.title}</Text>
        </View>

        <Button
          label="Thread"
          onPress={() => navigate({ type: 'push', route: { key: 'Thread', title: 'Thread from Contacts tab' } })}
        />
        <Button
          label="Modal"
          onPress={() => navigate({ type: 'push', route: { key: 'Modal', title: 'Modal', direction: 'vertical' } })}
        />

      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  scrollView: {
    flex: 1,
    paddingTop: 64,
  },
});
