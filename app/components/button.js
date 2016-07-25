
/**
 * Button
 * @flow
 */
import React, { PropTypes } from 'react';
import { Text, TouchableHighlight, View, StyleSheet } from 'react-native';

const Button = (props) => (
  <TouchableHighlight onPress={props.onPress}>
    <View style={[styles.button, props.style]}>
      <Text style={[styles.label, props.labelStyle]}>{props.label}</Text>
    </View>
  </TouchableHighlight>
);

Button.propTypes = {
  onPress: PropTypes.func.isRequired,
  label: PropTypes.string,
  style: PropTypes.object,
  labelStyle: PropTypes.object
};

export default Button;

const styles = StyleSheet.create({
  button: {
    padding: 20,
    borderWidth: 3,
    borderColor: 'gray',
    backgroundColor: 'gray'
  },
  label: {
    color: '#ffffff'
  }
});
