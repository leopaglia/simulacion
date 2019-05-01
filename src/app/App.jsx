import React, { useEffect, useState } from 'react';
import { Form, Table } from './components';
import simulate from '../simulation';

const localStorageKey = 'simulacion-tickets';

const getResultsFromStorage = () => JSON.parse(localStorage.getItem(localStorageKey) || '[]');
const saveResultsToStorage = results => localStorage.setItem(localStorageKey, JSON.stringify(results));

const App = () => {
  const [isSimulationRunning, setIsSimulationRunning] = useState(false);
  const [simulationResults, setSimulationResults] = useState(getResultsFromStorage());

  useEffect(() => setSimulationResults(getResultsFromStorage), []);

  const saveResults = ({ name, results }) => {
    const newResults = [
      ...simulationResults,
      { name, ...results },
    ];

    saveResultsToStorage(newResults);

    return setSimulationResults(newResults);
  };

  const onSubmit = ({ name, seniorQty, nonSeniorQty }) => {
    setIsSimulationRunning(true);
    return simulate({ seniorQty, nonSeniorQty })
      .then(results => saveResults({ name, results }))
      .then(() => setIsSimulationRunning(false));
  };

  return (
    <div className="container">
      <hr />
      <Form onSubmit={onSubmit} isSimulationRunning={isSimulationRunning} />
      <Table results={simulationResults} />
    </div>
  );
};

export default App;
