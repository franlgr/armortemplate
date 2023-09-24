import feathers from '@feathersjs/feathers';
import auth from '@feathersjs/authentication-client';
import rest from '@feathersjs/rest-client';

const appRest = feathers();

// Connect to a different URL
let restClient = rest('http://localhost:1313');

//Produccion
// restClient = rest('http://64.227.76.217:1313');
restClient = rest('https://armor-api.alguientiene.com');

// Configure an AJAX library (see below) with that client
appRest.configure(restClient.fetch(window.fetch.bind(window)));

// Available options are listed in the "Options" section
appRest.configure(
  auth({
    storage: window.localStorage,
    storageKey: 'feathers-jwt',
  }),
);

export default appRest; // Exporta la instancia configurada para su uso en otros componentes
