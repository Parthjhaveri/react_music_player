import React, { useState, useEffect } from 'react';

// IMPORT WIDGETS
import InfoWidget from '../global/info_widget';
	
const SongList = () => {
    return (
    	<aside id='song-list'>
    		<h1>Song List</h1>
            <InfoWidget />
    	</aside>
    )
}

export default SongList;