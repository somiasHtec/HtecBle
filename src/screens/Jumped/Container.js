import React, { useState } from 'react';

import Interface from './Interface';

const Container = () => {
  const [mode, setMode] = useState('sound');
  const [peak, setPeak] = useState(false);
  const [display, setDisplay] = useState('fields');

  const handleMode = () => {
    if (mode === 'sound') {
      setMode('jump');
    }

    if (mode === 'jump') {
      setMode('snoezelen');
    }

    if (mode === 'snoezelen') {
      setMode('sound');
    }
  };

  const handlePeak = () => setPeak((prevValue) => !prevValue);

  const handleDisplay = () => {
    if (display === 'fields') {
      setDisplay('rainbow');
    }

    if (display === 'rainbow') {
      setDisplay('window');
    }

    if (display === 'window') {
      setDisplay('fields');
    }
  };

  return (
    <Interface
      mode={mode}
      handleMode={handleMode}
      peak={peak}
      handlePeak={handlePeak}
      display={display}
      handleDisplay={handleDisplay}
    />
  );
};

export default Container;
