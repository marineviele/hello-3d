import React, { useState } from 'react';
import Info from './Info';
import Hello from './Hello';

function App() {
  const [displayInfo, setDisplayInfo] = useState(false);

  return (
      <div>
          {displayInfo ? (<Info/>) : (<Hello/>)}
      </div>
  )
}

export default App;
