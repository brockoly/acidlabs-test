import Spinner from 'react-spinner-material';
import React, { Component } from 'react';

export default class Example extends Component {
  render() {
    return (
      <Spinner size={50} spinnerColor={"#2c6ea7"} spinnerWidth={10} visible={true} />
    );
  }
}
