const app = require('../backend/server/server')
const ds = app.dataSources.eventcheckin

let excludedModels = []
const tables = Object.keys(app.models).filter(key => excludedModels.indexOf(key) === -1)

console.log(tables);
ds.automigrate(tables, function(err) {
  console.log('yooo');
  if (err) {
    console.log(err);
    throw err;
  }
  console.log('Loopback tables [' - tables - '] created in ', ds.adapter.name);
  ds.disconnect();
});
