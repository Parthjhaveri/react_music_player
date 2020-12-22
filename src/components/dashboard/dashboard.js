import React, { useState, useEffect } from 'react';

// IMPORT COMPONENTS
import ControlsWidget from '../global/controls.js';

const Dashboard = () => {
    return (
    	<aside className='sec-std' id='main-dashboard'>			
			<ControlsWidget />
    	</aside>
    )
}

export default Dashboard;