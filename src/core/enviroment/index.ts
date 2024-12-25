import { ENVIROMENT_TEST } from './enviroment'

type IEnviroment = 'production' | 'development' | 'test'

interface Config {
  PORT: number
}

const NODE_ENV: string =
  (ENVIROMENT_TEST.NODE_ENV as IEnviroment) || 'development'

const CONFIG: Record<IEnviroment, Config> = {
  development: {
    PORT: Number(ENVIROMENT_TEST.PORT) || 3000,
  },
  production: {
    PORT: Number(ENVIROMENT_TEST.PORT) || 3000,
  },
  test: {
    PORT: Number(ENVIROMENT_TEST.PORT) || 3000,
  },
}

export const ENVIROMENT = CONFIG[NODE_ENV as IEnviroment]
