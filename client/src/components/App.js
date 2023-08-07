import React, { useEffect, useState } from "react";
import { Switch, Route } from "react-router-dom";
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

function App() {
	const [value, setValue] = useState(new Date());

	return (
		<div>
			<h1>Phase 4 Project Client</h1>
			<Calendar
                onChange={setValue}
                value={value}
            />
		</div>
	);
}

export default App;
