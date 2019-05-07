import random from 'random';
import { prop, range } from 'ramda';
import uuid from 'uuid';

const END_TIME = 365 * 24 * 60;
const SLA1_LIMIT = 2 * 60 * 60;
const SLA2_LIMIT = 4 * 60 * 60;
const SLA3_LIMIT = 8 * 60 * 60;

const createSeniorEmployee = () => ({
  id: uuid.v4(),
  senior: true,
  TPS: Infinity,
  ticketsQty: 0
});

const createNonSeniorEmployee = () => ({
  id: uuid.v4(),
  senior: false,
  TPS: Infinity,
  ticketsQty: 0
});

const getIA = () => random.int(0, 50); // TODO
const getTSLA1 = () => random.int(0, 50); // TODO
const getTSLA2 = () => random.int(0, 50); // TODO
const getTSLA3 = () => random.int(0, 50); // TODO

const simulate = ({ seniorQty, nonSeniorQty }) => {
  const employees = [
    ...range(0, seniorQty).map(createSeniorEmployee), 
    ...range(0, nonSeniorQty).map(createNonSeniorEmployee) 
  ];  
  
  let currentTime = 0;
  let TPLL = 0;
  let totalSLA1 = 0;
  let totalSLA2 = 0;
  let totalSLA3 = 0;
  let SLA1NonSolved = 0;
  let SLA1Failed = 0;
  let SLA2Failed = 0;
  let SLA3Failed = 0;

  const findAvailableSenior = () => employees.find(e => e.TPS === Infinity && e.senior);
  const findAvailableNonSenior = () => {
    const free = employees.find(e => e.TPS === Infinity && !e.senior);
    if(!free) {
      return employees.filter(prop('senior')).minBy(prop('tps'))
    }
    return free;
  }

  const processSLA1 = () => {
    totalSLA1 ++;
    
    if(SLA1NonSolved < seniorQty){
      SLA1NonSolved ++;
      const senior = findAvailableSenior();
      const solveTime = getTSLA1();
      if(solveTime > SLA1_LIMIT) SLA1Failed ++;
      senior.TPS = currentTime + solveTime;
      senior.ticketsQty ++;
    } else {
      // const nonSenior = findAvailableNonSenior();
      // tiempo de espera? reasignacion?
    }
  };

  const processSLA2 = () => {
    totalSLA2 ++;
    const nonSenior = findAvailableNonSenior();
    const solveTime = getTSLA2();
    if(nonSenior.ticketsQty === 1) {
      if(solveTime > SLA2_LIMIT) SLA2Failed ++;
      nonSenior.TPS = currentTime + solveTime;
    } else {
      if(solveTime + nonSenior.TPS > SLA2_LIMIT) SLA2Failed ++;
      nonSenior.TPS += solveTime; // ??? deberia ser el mismo, y tener algo para descolar
    }
    nonSenior.ticketsQty ++;

  };

  const processSLA3 = () => {
    totalSLA3 ++;
    const nonSenior = findAvailableNonSenior();
    const solveTime = getTSLA3();
    if(nonSenior.ticketsQty === 1) {
      if(solveTime > SLA3_LIMIT) SLA3Failed ++;
      nonSenior.TPS = currentTime + solveTime;
    } else {
      if(solveTime + nonSenior.TPS > SLA3_LIMIT) SLA3Failed ++;
      nonSenior.TPS += solveTime; // ??? deberia ser el mismo, y tener algo para descolar
    }
    nonSenior.ticketsQty ++;
  };

  const processArrival = () => {
    currentTime = TPLL;
    TPLL += getIA();
    const r = random.int(0, 100);
    const SLA = r < 20 ? processSLA1() : r < 50 ? processSLA2() : processSLA3();
  }

  const processExit = employee => {
    currentTime = employee.TPS;
    employee.ticketsQty--;
    if(employee.senior) {
      SLA1NonSolved--;
      if(SLA1NonSolved > seniorQty) {
      // position_junior = buscarReasignacion()
      // tiempo_espera = removerTiempoEspera(position_junior)
      // if CS1_Reasignado[position_junior] == 0:
      //   TiempoProximaSalida[position_junior] = TiempoProximaSalida[position_junior] + tiempo - tiempo_espera

      // SEV1 = ta_sev1()
      // temp = SEV1 + tiempo - tiempo_espera
      // if temp > (2*60*60):
      //   SLA1 += 1

      // TiempoProximaSalida[position] = tiempo + SEV1
      } else {
        employee.TPS = Infinity;
      }
    } else {
      employee.TPS = Infinity;
    }
  };

  while(currentTime < END_TIME) {
    const employeeWithLesserTPS = employees.minBy(prop('tps'))

    if(TPLL < employeeWithLesserTPS.TPS) {
      processExit(employeeWithLesserTPS);
    } else {
      processArrival();
    }
  }

  return {
    seniorQty,
    nonSeniorQty,
    percentageSLA1Failed: (SLA1Failed * 100 / totalSLA1).toFixed(2),
    percentageSLA2Failed: (SLA1Failed * 100 / totalSLA2).toFixed(2),
    percentageSLA3Failed: (SLA1Failed * 100 / totalSLA3).toFixed(2),
  }
}

export default simulate;
