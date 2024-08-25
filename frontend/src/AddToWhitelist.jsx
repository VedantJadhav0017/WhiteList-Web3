import React, { useState } from 'react';

const App = () => {
  const [address, setAddress] = useState('');

  const handleAddToWhitelist = async () => {
    try {
      const response = await fetch('http://localhost:3001/run', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ address }),
      });

      if (response.ok) {
        alert('Address added to whitelist and NFT minted successfully!');
      } else {
        const errorText = await response.text();
        alert(`An error occurred: ${errorText}`);
      }
    } catch (error) {
      console.error('Error:', error);
      // alert('An error occurred. Please check the console for details.');
    }
  };

  return (
    <div>
      <h1>Whitelist and Mint NFT</h1>
      <input
        type="text"
        value={address}
        onChange={(e) => setAddress(e.target.value)}
        placeholder="Enter address"
      />
      <button onClick={handleAddToWhitelist}>Add to Whitelist and Mint NFT</button>
    </div>
  );
};

export default App;