import random from 'random';

const delay = ms => new Promise((resolve) => {
  setTimeout(() => { resolve(); }, ms);
});

const simulate = ({ seniorQty, nonSeniorQty }) => delay(random.int(1500, 3000))
  .then(() => Promise.resolve({
    seniorQty,
    nonSeniorQty,
    sev1OffSLA: random.int(0, 50),
    sev23OffSLA: random.int(0, 50),
  }));

export default simulate;
