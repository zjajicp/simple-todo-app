import React from 'react';

export const TaskAdder = React.createClass({
  handleKeyUp(evt) {
    if (evt.nativeEvent.keyCode === 13) {
      this.props.onAdd(evt.target.value);
    } 
  },
  handleChange(evt) {
    this.props.onChange(evt.target.value);
  },
  render() {
    return (
      <div className="section__task-adder">
        <input 
          placeholder={this.props.placeholder}
          className="section__task-adder-input"
          type="text"
          value={this.props.description}
          onChange={this.handleChange}
          onKeyUp={this.handleKeyUp} />
      </div>
    );
  }
});