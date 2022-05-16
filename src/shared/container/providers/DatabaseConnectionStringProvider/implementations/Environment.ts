import { injectable } from 'inversify'
import IGetConnectionDTO from '../dtos/IGetConnectionDTO'
import { IDatabaseConnectionStringProvider } from '../interfaces/IDatabaseConnectionStringProvider'

@injectable()
export default class Environment implements IDatabaseConnectionStringProvider {
  async getConnectionString({ companyId }: IGetConnectionDTO): Promise<string> {
    const { host, port, database, username, password } = process.settings.postgres

    return `postgresql://${username}:${password}@${host}:${port}/${database}`
  }
}
