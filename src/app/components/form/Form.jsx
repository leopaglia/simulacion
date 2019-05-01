import React, { useState } from 'react';
import { bool, func } from 'prop-types';
import cx from 'classnames';

const Form = ({ isSimulationRunning, onSubmit }) => {
  const [simulationName, setSimulationName] = useState('');
  const [seniorDevsAmount, setSeniorDevsAmount] = useState('');
  const [nonSeniorDevsAmount, setNonSeniorDevsAmount] = useState('');

  const [simulationNameError, setSimulationNameError] = useState('');
  const [seniorDevsAmountError, setSeniorDevsAmountError] = useState('');
  const [nonSeniorDevsAmountError, setNonSeniorDevsAmountError] = useState('');

  const buttonClassName = cx({
    button: true,
    'is-large': true,
    'is-loading': isSimulationRunning,
  });

  const nameFieldClassName = cx({
    input: true,
    'is-danger': !!simulationNameError,
  });

  const seniorDevsAmountClassName = cx({
    input: true,
    'is-danger': !!seniorDevsAmountError,
  });

  const nonSeniorDevsAmountClassName = cx({
    input: true,
    'is-danger': !!nonSeniorDevsAmountError,
  });

  const validate = () => {
    let hasErrors = false;

    if (!simulationName) {
      setSimulationNameError('Ingrese un nombre para la simulacion.');
      hasErrors = true;
    }

    if (!seniorDevsAmount) {
      setSeniorDevsAmountError('Ingrese una cantidad de desarrolladores Senior.');
      hasErrors = true;
    }

    if (seniorDevsAmount < 0) {
      setSeniorDevsAmountError('El numero de desarrolladores Senior no puede ser menor a 0.');
      hasErrors = true;
    }

    if (!nonSeniorDevsAmount) {
      setNonSeniorDevsAmountError('Ingrese una cantidad de desarrolladores no Senior.');
      hasErrors = true;
    }

    if (nonSeniorDevsAmount < 0) {
      setSeniorDevsAmountError('El numero de desarrolladores no Senior no puede ser menor a 0.');
      hasErrors = true;
    }

    return !hasErrors;
  };

  const onFormSubmit = (e) => {
    e.preventDefault();

    if (!validate()) {
      return false;
    }

    return onSubmit({
      name: simulationName,
      seniorQty: seniorDevsAmount,
      nonSeniorQty: nonSeniorDevsAmount,
    });
  };

  return (
    <form onSubmit={onFormSubmit}>
      <div className="field">
        <label className="label">Nombre</label>
        <div className="control">
          <input
            className={nameFieldClassName}
            placeholder="Ingrese nombre para la simulacion"
            value={simulationName}
            onChange={(e) => { setSimulationName(e.target.value); setSimulationNameError(''); }}
          />
        </div>
        {simulationNameError && <p className="help is-danger">{simulationNameError}</p>}
      </div>

      <div className="field">
        <label className="label">Cantidad de desarrolladores Senior</label>
        <div className="control">
          <input
            className={seniorDevsAmountClassName}
            placeholder="Ingrese cantidad de desarrolladores Senior"
            type="number"
            value={seniorDevsAmount}
            onChange={(e) => { setSeniorDevsAmount(e.target.value); setSeniorDevsAmountError(''); }}
          />
        </div>
        {seniorDevsAmountError && <p className="help is-danger">{seniorDevsAmountError}</p>}
      </div>

      <div className="field">
        <label className="label">Cantidad de desarrolladores no Senior</label>
        <div className="control">
          <input
            className={nonSeniorDevsAmountClassName}
            placeholder="Ingrese cantidad de desarrolladores no Senior"
            type="number"
            value={nonSeniorDevsAmount}
            onChange={(e) => { setNonSeniorDevsAmount(e.target.value); setNonSeniorDevsAmountError(''); }}
          />
        </div>
        {nonSeniorDevsAmountError && <p className="help is-danger">{nonSeniorDevsAmountError}</p>}
      </div>

      <hr />

      <div className="field is-grouped is-grouped-centered">
        <button
          className={buttonClassName}
          type="submit"
          disabled={isSimulationRunning}
        >
        Iniciar Simulacion
        </button>
      </div>

      <hr />
    </form>
  );
};

Form.propTypes = {
  isSimulationRunning: bool.isRequired,
  onSubmit: func.isRequired,
};

export default Form;
