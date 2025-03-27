/* export default import('../dist/sjsumsa/server/server.mjs')
  .then(module => module.app());
*/

const server = import('../dist/sjsumsa/server/server.mjs');

module.exports = server.app;