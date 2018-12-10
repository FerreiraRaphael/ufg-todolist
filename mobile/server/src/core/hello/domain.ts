import { injectable } from 'inversify'
import { HelloService } from './service'

@injectable()
export class HelloDomain {

  private helloService: HelloService

  constructor(helloService: HelloService) {
    this.helloService = helloService
  }

  public hello() {
    return this.helloService.getHello()
  }
}
