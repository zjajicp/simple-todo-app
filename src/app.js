import { Section } from './section/section.component';

import ReactDOM from 'react-dom';
import React from 'react';

const sectionTypes = ['todo', 'inProgress', 'done'];
const App = React.createClass({
  getInitialState() {
    return {
      successfulDrop: false,
      todo: {
        title: 'TO DO',
        taskDescription: '',
        items: [{
          text: 'Create this app'
        }, {
          text: 'Make it worth looking at'
        }]
      },
      inProgress: {
        taskDescription: '',
        title: 'IN PROGRESS',
        items: [{
          text: 'In progres2 1'
        }, {
          text: 'In progress 3'
        }]
      },
      done: {
        taskDescription: '',
        title: 'DONE',
        items: [{
          text: 'Done 1'
        }, {
          text: 'Done 2'
        }]
      }
    };
  },

  handleItemMovingStart(item, type) {
    const section = this.state[type];
    this.sourceSection = type;
    this.setState({
      [type]: {
        ...section,
        movingAway: true
      }
    });
  },

  handleItemMovingOver(type) {
    if (type === this.sourceSection) {
      return;
    }
    
    const section = this.state[type];
    this.setState({
      [type]: {
        ...section,
        movingIn: true
      }
    });
  },

  handleItemDrop(item, type) {
    if (type === this.sourceSection) {
      return;
    }

    const section = this.state[type];
    this.setState({
      successfulDrop: true,
      [type]: {
        ...section,
        items: section.items.concat(item),
        movingIn: false
      }
    });
  },

  handleItemDragEnd(droppedItem, type) {
    const section = this.state[type];
    let newState;
    const sectionStates = sectionTypes.reduce((acc, sectionType) => ({
      ...acc,
      [sectionType]: {
        ...this.state[sectionType],
        movingAway: false,
        movingIn: false
      }
    }), {});
    if (this.state.successfulDrop) {
      newState = {
        successfulDrop: false,
        ...sectionStates,
        [type]: {
          ...sectionStates[type],
          items: section.items.filter(item => item !== droppedItem),
        }
      };
    } else {
      newState = sectionStates;
    }

    this.sourceSection = null;
    this.setState(newState);
  },

  handleTaskAdd(sectionType, description) {
    const section = this.state[sectionType];
    this.setState({
      [sectionType]: {
        ...section,
        taskDescription: '',
        items: section.items.concat({
          text: description
        })
      }
    });
  },

  handleTaskDescriptionChange(secionType, description) {
    this.setState({
      [secionType]: {
        ...this.state[secionType],
        taskDescription: description
      }
    });
  },

  render() {
    return (
      <div className="sections">
        {sectionTypes.map(sectionType =>
          <Section
            enableAdd={sectionType === 'todo'}
            key={sectionType}
            type={sectionType}
            movingIn={this.state[sectionType].movingIn}
            movingAway={this.state[sectionType].movingAway}
            items={this.state[sectionType].items}
            onItemMovingStart={this.handleItemMovingStart}
            onItemMovingOver={this.handleItemMovingOver}
            onItemDrop={this.handleItemDrop}
            onItemDragEnd={this.handleItemDragEnd}
            onTaskAdd={this.handleTaskAdd}
            onTaskDescriptionChange={this.handleTaskDescriptionChange}
            taskDescription={this.state[sectionType].taskDescription}
            title={this.state[sectionType].title}>
          </Section>
        )}
      </div>
    );
  } 
});

ReactDOM.render(<App></App>, document.querySelector('#content'));