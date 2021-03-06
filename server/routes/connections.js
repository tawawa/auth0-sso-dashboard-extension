import _ from 'lodash';
import { Router } from 'express';
import { isAdmin } from '../lib/middlewares';

export default () => {
  const api = Router();

  /*
   * List all connections.
   */
  api.get('/', isAdmin, (req, res, next) => {
    req.auth0.connections.getAll({ fields: 'name' })
      .then(connections => _.chain(connections)
        .sortBy((conn) => conn.name.toLowerCase())
        .value())
      .then(connections => res.json(connections))
      .catch(next);
  });

  return api;
};
