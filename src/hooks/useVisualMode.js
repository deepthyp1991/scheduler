import { useState } from 'react';

export default function useVisualMode(initial) {
	const [ mode, setMode ] = useState(initial);
	const [ history, setHistory ] = useState([ initial ]);

  const transition = (newMode, replace = false) => {
    if (replace){
    setHistory(prev => [...prev].slice(0,-1));
    } 
    setHistory(prev => [ ...prev,newMode]);
    setMode(newMode);
    
    } 

	function back() {
    const historyCopy = history.slice(0,-1)
		if (history.length > 1) {
      
			// historyCopy.pop();
			setHistory(historyCopy);
			setMode(historyCopy[historyCopy.length - 1]);
		} 
	}

	return { mode, transition, back };
}
