import { useContext } from 'react';

import { PeripheralContext } from '../context/PeripheralContext';

export default () => {
  const usePeripheral = useContext(PeripheralContext);

  return usePeripheral;
};
