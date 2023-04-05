import logo from './logo.svg';
import React, { useState, useEffect } from "react"

function AppSimple() {
  const [clients, setClients] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch('/manager/items');
      const body = await response.json();

      setClients(body);
    }

    fetchData()
      .catch(console.error);
  }, []);

  useEffect(() => {
    console.log("Clients = " + clients)
  }, [clients]);

  return (
    <div className="App">
    <header className="App-header">
      <img src={logo} className="App-logo" alt="logo" />
      <div className="App-intro">
        <h2>Clients</h2>
        {clients.map(client =>
            <div key={client.id}>
              {client.name}
            </div>
        )}
      </div>
    </header>
  </div>
  );
}

export default AppSimple;