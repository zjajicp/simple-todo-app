import React from 'react';
import ClassNames from 'classnames';
import { If } from '../if.component';
import CSSTransition from 'react-transition-group/CSSTransition';
import TransitionGroup from 'react-transition-group/TransitionGroup';
import { Fade } from '../fade.component';

const SectionItem = React.createClass({
  handleDragStart(evt) {
    this.props.onDragStart(evt, this.props.item);
  },

  handleDragEnd(evt) {
    this.props.onDragEnd(evt, this.props.item);
  },

  componentWillUnmount() {
  },

  componentDidMount() {
  },
  render() {
    return (
      <li
        draggable="true"
        onDragStart={this.handleDragStart}
        onDragEnd={this.handleDragEnd}
        className="section__body-item">
        {this.props.item.text}
      </li>
    );
  }
});

const handleDragStart = (evt) => { };

export const SectionBody = React.createClass({
  render() {
    const animatedItems = this.props.items.map((item, index) =>
      <Fade key={index}>
        <SectionItem
          item={item}
          onDragStart={this.props.onItemDragStart}
          onDragEnd={this.props.onItemDragEnd}>
        </SectionItem>
      </Fade>);

    return (
      <ul className={ClassNames('section__body', {
        'section__body--move-away': this.props.movingAway,
        'section__body--move-in': this.props.movingIn
      })}>
        <If cond={!this.props.items.length}>
          <h3 className="section__body-message">NO ITEMS</h3>
        </If>
        <TransitionGroup>
          {animatedItems}
        </TransitionGroup>
      </ul>);
  }
});