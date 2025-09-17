import app from '../app.js';

import serverless from "serverless-http";

console.log("✅ Imports cargados correctamente");
console.log("✅ App:", typeof app);
console.log("✅ Serverless:", typeof serverless);

export default serverless(app);