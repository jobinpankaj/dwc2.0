import React, { Component } from 'react';
import Router from '../src/router/router';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { Provider, useDispatch } from 'react-redux';
import store from './redux/store';

export default class Layout extends Component {
  render() {
    return (
      <div>
        <DndProvider backend={HTML5Backend}>
          <Provider store={store}>
            <Router />
          </Provider>
        </DndProvider>
      </div>
    )
  }
}