import { UnauthorizedError } from '../../utils/errors/unauthorized'
import 'dotenv/config'

class ValidateAuthorizeAction {
  private data?: string

  constructor (data?: string) {
    this.data = data
  }

  public run = (): void => {
    if (this.data !== `Bearer ${process.env.JWT}`) {
      throw new UnauthorizedError('Invalid token');
    }
  }
}

export { ValidateAuthorizeAction }
