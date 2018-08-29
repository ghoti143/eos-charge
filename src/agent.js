import superagentPromise from 'superagent-promise';
import _superagent from 'superagent';

const superagent = superagentPromise(_superagent, global.Promise);

const AGG_JSON = 'https://www.eossnapshots.io/data/eoscharge/latest.json';

const responseBody = res => res.body;

const Aggregations = {
  get: () => superagent.get(AGG_JSON).then(responseBody)
};

export default {
  Aggregations
};