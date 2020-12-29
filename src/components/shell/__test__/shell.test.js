import React from 'react';
import {connect, Provider} from "react-redux";
import { expect } from 'chai';
import { Enzyme, shallow, configure } from 'enzyme';
import sinon from 'sinon';
import Adapter from 'enzyme-adapter-react-16';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';

// IMPORT COMPONENTS
import SongList from './../songlist';
import InfoWidget from './.././../global/info-widget/info_widget.js';
import ControlsWidget from './.././../global/controls/controls.js';
import Playlist from './.././.././../data/playlist.js';
import App from './.././.././../App.js';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

configure({adapter: new Adapter()});

// CHECK FOR ASIDE ELEMENTS IN PLAYLIST
it('Renders <aside></aside>s in the songlist', () => {
	const store = mockStore({});
	const wrapper = shallow(
		<Provider store={store}> 
	      <SongList />
	    </Provider>
	);
	expect(wrapper.find('aside'));
});

// CHECK FOR CHILD COMPONENTS
it('Renders song-widgets when passed in', () => {
const store = mockStore({});
const wrapper = shallow(
	<Provider store={store}> 
      <SongList>
      	<InfoWidget />
      	<ControlsWidget />
      </SongList>
    </Provider>
);
expect(wrapper.contains(<InfoWidget />, <ControlsWidget/>)).to.equal(true);
});



