import React from 'react';
import {connect, Provider} from "react-redux";
import { expect } from 'chai';
import { Enzyme, shallow, configure } from 'enzyme';
import sinon from 'sinon';
import Adapter from 'enzyme-adapter-react-16';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import AudioPlayer from 'react-h5-audio-player';

// IMPORT COMPONENTS
import InfoWidget from './.././.././../global/info-widget/info_widget.js';
import ControlsWidget from './../controls.js';
import App from './.././.././.././../App.js';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

configure({adapter: new Adapter()});

// CHECK FOR CHILD COMPONENTS
it('Renders audio-element when passed in', () => {
	const store = mockStore({});
	const wrapper = shallow(
		<Provider store={store}> 
	      <ControlsWidget>
	      	<AudioPlayer />	      	
	      </ControlsWidget>
	    </Provider>
	);
	expect(wrapper.contains(<AudioPlayer />)).to.equal(true);
});