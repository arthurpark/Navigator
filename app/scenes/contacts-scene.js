
/**
 * @flow
 */
import React, { Component, PropTypes } from 'react';
import { ScrollView, View, Text, StyleSheet } from 'react-native';
import Scene from '../components/scene';
import Button from '../components/button';

export default class ContactsScene extends Component {
  static propTypes = {
    onNavigate: PropTypes.func.isRequired,
    scene: PropTypes.object.isRequired,
    transitionProps: PropTypes.object.isRequired,
  };

  render() {
    const { onNavigate, scene, transitionProps } = this.props;
    return (
      <Scene {...transitionProps}>
        <ScrollView style={styles.scrollView}>

          <ScrollView style={styles.scrollView}>
            <View>
              <Text>Contacts: {scene.route.key}</Text>
            </View>

            <Button
              label="Pop"
              onPress={() => onNavigate({ type: 'pop' })}
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
  },
});
