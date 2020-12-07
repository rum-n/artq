import React from 'react';


function SeeMore() {
    const [counter, setCounter] = React.useState(60);
  
    // Third Attempts
    React.useEffect(() => {
      const timer =
        counter > 0 && setInterval(() => setCounter(counter - 1), 1000);
      return () => clearInterval(timer);
    }, [counter]);
  
    return (
      <div className="App">
        <div>Countdown: {counter}</div>
      </div>
    );
  }

export default SeeMore;