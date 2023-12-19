import React, { useEffect } from 'react';

const MyComponent = () => {
  useEffect(() => {
    const handleWindowClose = (e:any) => {
      // Conditionally display the confirmation message
      const confirmationMessage = 'Are you sure you want to leave?';
      e.returnValue = confirmationMessage;
      return confirmationMessage;
    };

    // Event listener for beforeunload
    window.addEventListener('beforeunload', handleWindowClose);

    // Cleanup the event listener when component unmounts
    return () => {
      window.removeEventListener('beforeunload', handleWindowClose);
    };
  }, []);

  const handleCloseTab = () => {
    // Ask for confirmation when the user clicks a custom close button
    const confirmed = window.confirm('Are you sure you want to close the tab?');
    if (confirmed) {
      // Close the tab or perform any other action
      // You can't directly close the tab programmatically due to browser security restrictions
      // However, you can request to close the tab or window like this:
      window.close();
    }
  };

  return (
    <div>
      {/* Your component's content */}
      <button onClick={handleCloseTab}>Close Tab</button>
    </div>
  );
};

export default MyComponent;
