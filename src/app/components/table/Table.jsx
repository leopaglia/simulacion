import React from 'react';
import {
  arrayOf,
  number,
  shape,
  string,
} from 'prop-types';

const Table = ({ results }) => (
  <table className="table is-stripped is-hoverable is-fullwidth">
    <thead>
      <th className="has-text-centered">Nombre</th>
      <th className="has-text-centered"><abbr title="Cantidad de desarrolladores Senior">Senior</abbr></th>
      <th className="has-text-centered"><abbr title="Cantidad de desarrolladores no Senior">No Senior</abbr></th>
      <th className="has-text-centered"><abbr title="Cantidad de tickets SEV1 con SLA incumplido">SEV1 Incumplido</abbr></th>
      <th className="has-text-centered"><abbr title="Cantidad de tickets SEV2 con SLA incumplido">SEV2 Incumplido</abbr></th>
      <th className="has-text-centered"><abbr title="Cantidad de tickets SEV3 con SLA incumplido">SEV3 Incumplido</abbr></th>
    </thead>
    <tbody>
      {results.length === 0 && (
        <tr>
          <th colSpan="5" className="has-text-centered">Genere una nueva simulacion para ver los resultados.</th>
        </tr>
      )}
      {results.map(({
        name, 
        seniorQty, 
        nonSeniorQty, 
        percentageSLA1Failed, 
        percentageSLA2Failed, 
        percentageSLA3Failed
      }) => (
        <tr>
          <th className="has-text-centered">{name}</th>
          <td className="has-text-centered">{seniorQty}</td>
          <td className="has-text-centered">{nonSeniorQty}</td>
          <td className="has-text-centered">{`${percentageSLA1Failed}%`}</td>
          <td className="has-text-centered">{`${percentageSLA2Failed}%`}</td>
          <td className="has-text-centered">{`${percentageSLA3Failed}%`}</td>
        </tr>
      ))}
    </tbody>
  </table>
);

Table.defaultProps = {
  results: [],
};

Table.propTypes = {
  results: arrayOf(shape({
    name: string.isRequired,
    seniorQty: number.isRequired,
    nonSeniorQty: number.isRequired,
    sev1OffSLA: number.isRequired,
    sev23OffSLA: number.isRequired,
  })),
};

export default Table;
