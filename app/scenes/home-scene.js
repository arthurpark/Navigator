/**
 * HomeScene
 *   Show screens under Home tab
 * @flow
 */
import React, { Component, PropTypes } from 'react';
import Conversations from './conversations';
import Thread from './thread';
import Modal from './modal';

// TODO: Inspect scene to determine which screen to show
//       while staying at Home tab
export default class HomeScene extends Component {
  static propTypes = {
    sceneProps: PropTypes.object.isRequired,
    onNavigate: PropTypes.func.isRequired,
  };

  render() {
    const { onNavigate, sceneProps } = this.props;
    const { scene, scenes } = sceneProps;

    switch (scene.route.key) {
    case 'Thread':
      return (
        <Thread sceneProps={sceneProps} navigate={onNavigate} />
      );
    case 'Modal':
      return (
        <Modal sceneProps={sceneProps} navigate={onNavigate} />
      );

    case 'Home':
    default:
      return (
        <Conversations sceneProps={sceneProps} navigate={onNavigate} />
      );
    }
  }
}
