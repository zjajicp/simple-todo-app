import React from 'react';
import { SectionTitle } from './section-title.component';
import { SectionBody } from './section-body.component';
import { TaskAdder } from './task-adder.component';
import styles from './section.less';
import { If } from '../if.component';

export const Section = React.createClass({
  handleDragOver(evt) {
    evt.preventDefault();
    evt.dataTransfer.dropEffect = 'move';
    this.props.onItemMovingOver(this.props.type);
  },

  handleDragStart(evt, item) {
    evt.dataTransfer.clearData();
    evt.dataTransfer.effectAllowed = 'move';
    evt.dataTransfer.setData('item', JSON.stringify(item));
    this.props.onItemMovingStart(item, this.props.type);
  },

  handleDrop(evt) {
    const item = JSON.parse(evt.dataTransfer.getData('item'));
    this.props.onItemDrop(item, this.props.type);
  },

  handleDragEnd(evt, item) {
    this.props.onItemDragEnd(item, this.props.type);
  },

  handleTaskAdd(value) {
    this.props.onTaskAdd(this.props.type, value);
  },

  handleTaskDescriptionChange(value) {
    this.props.onTaskDescriptionChange(this.props.type, value);
  },
  render() {
    return (
      <div className="section"
        onDrop={this.handleDrop}
        onDragOver={this.handleDragOver}>
        <SectionTitle
          title={this.props.title}></SectionTitle>
        <If cond={this.props.enableAdd}>
          <TaskAdder
            placeholder="Enter task description here"
            description={this.props.taskDescription}
            onAdd={this.handleTaskAdd}
            onChange={this.handleTaskDescriptionChange} />
        </If>
        <SectionBody
          movingIn={this.props.movingIn}
          movingAway={this.props.movingAway}
          items={this.props.items}
          onItemDragEnd={this.handleDragEnd}
          onItemDragStart={this.handleDragStart}>
        </SectionBody>
      </div>
    );
  }
});
