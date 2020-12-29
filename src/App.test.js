import { render, screen } from '@testing-library/react';
import App from './App';

import React from 'react';
import {connect, Provider} from "react-redux";
import { expect } from 'chai';
import { Enzyme, shallow, configure } from 'enzyme';
import sinon from 'sinon';
import Adapter from 'enzyme-adapter-react-16';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

configure({adapter: new Adapter()});

it('renders without crashing', () => {
  const store = mockStore({}); // Instead of {}, you can give your initial store
  shallow(
    <Provider store={store}> 
      <App />
    </Provider>
  );
});