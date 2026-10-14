import { handle, type Env } from './handler';
import { guardClient } from './guard';

export { Guard } from './guard';

export default {
  fetch(request: Request, env: Env): Promise<Response> {
    return handle(request, env, { guard: guardClient(env.GUARD) });
  },
};
