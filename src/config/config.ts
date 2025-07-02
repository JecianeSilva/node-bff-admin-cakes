import * as dotenv from 'dotenv';

export default () => {
  dotenv.config()

  const envs = {
    dev: { PORT: 3000 },
    prod: { PORT: 3001 }
  };

  return envs['dev'];
};
