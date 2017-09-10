import React from 'react';

export const If = React.createClass({
  render() {
    return (
      <div>{this.props.cond ? this.props.children : ''}</div>
    );
  }
});