import React from 'react';
import ClassNames from 'classnames';
import { If } from '../if.component';

const SectionItem = React.createClass({
  handleDragStart(evt) {
    this.props.onDragStart(evt, this.props.item);
  },
  handleDragEnd(evt) {
    this.props.onDragEnd(evt, this.props.item);
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
    return (<ul className={ClassNames('section__body',{
      'section__body--move-away': this.props.movingAway,
      'section__body--move-in': this.props.movingIn
    })}>
      <If cond={!this.props.items.length}>
         <h3 className="section__body-message">NO ITEMS</h3>
      </If>
      {this.props.items.map((item, index) =>
        <SectionItem
          item={item}
          key={index}
          onDragStart={this.props.onItemDragStart}
          onDragEnd={this.props.onItemDragEnd}>
        </SectionItem>)
      }
    </ul>);
  }
});