import { useContext } from 'react';

import PeripheralContext from '~/context/PerihperalContext';

export default () => {
  const usePeripheral = useContext(PeripheralContext);

  return usePeripheral;
};
