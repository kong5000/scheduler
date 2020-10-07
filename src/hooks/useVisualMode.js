import { useState } from 'react'
export default function (initial) {
  const [mode, setMode] = useState(initial);
  const [history, setHistory] = useState([initial]);

  function transition(newMode, replace) {
    setMode(newMode)
    if (!replace) {
      setHistory(prev => {
        return ([...prev, newMode])
      })
    } else {
      setHistory(prev => {
        const copy = [...prev];
        copy.pop();
        copy.push(newMode)
        return copy
      })
    }

  }

  function back() {
    if (history.length > 1) {
      setHistory(prev => {
        const copy = [...prev];
        copy.pop();
        setMode(copy[copy.length - 1])
        return copy
      })
    }
  }

  return {
    mode,
    transition,
    back
  };
}