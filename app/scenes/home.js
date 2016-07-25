
/**
 * @flow
 */
import React, { Component, PropTypes } from 'react';
import { ScrollView, View, Text, StyleSheet } from 'react-native';
import Scene from '../components/scene';
import Button from '../components/button';

export default class Home extends Component {
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
              <Text>Home: {scene.route.key}</Text>
            </View>

            <Button
              label="About"
              onPress={() => navigate({ type: 'push', key: 'about' })}
            />
            <Button
              label="Modal"
              onPress={() => navigate({ type: 'push', key: 'modal' })}
            />
            <Button
              label="Pop Route"
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
  },
});
