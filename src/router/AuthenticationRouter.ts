import { Router } from 'express';

const AuthenticationRouter = Router();

AuthenticationRouter.get('/api/login', (req, res, next) => {
  console.log(req);
});

export { AuthenticationRouter };