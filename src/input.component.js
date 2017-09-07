import React from 'react';
import Print from './common-module';
import { Component } from 'react';


export class Input extends Component {
  componentDidMount() {
    Print('Input mounted');
  }
  render() {
    return (
      <input type="text" placeholder={this.props.placeholder} />
    );
  }
}