
/**
 * Button
 * @flow
 */
import React, { PropTypes } from 'react';
import { Text, TouchableOpacity, View, StyleSheet } from 'react-native';

const Button = (props) => (
  <TouchableOpacity onPress={props.onPress} style={[styles.button, props.style]}>
    <Text style={[styles.label, props.labelStyle]}>{props.label}</Text>
  </TouchableOpacity>
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
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 3,
    borderColor: 'lightblue',
    backgroundColor: 'lightblue'
  },
  label: {
    textAlign: 'center',
    color: '#ffffff'
  }
});
