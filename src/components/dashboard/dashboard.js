import React, { useState, useEffect } from 'react';

// IMPORT COMPONENTS
import ControlsWidget from '../global/controls.js';

const Dashboard = () => {
    return (
    	<aside id='main-dashboard'>
			<h1>Dashboard</h1>
			<ControlsWidget />
    	</aside>
    )
}

export default Dashboard;