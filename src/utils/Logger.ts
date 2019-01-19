import chalk from 'chalk'
import { deprecate } from 'util';

export default class Logger {

  private systemName: string = 'Bedrock.js'
  private moduleName: string

  constructor(moduleName: string) {
    this.moduleName = moduleName
  }

  private print(type: string, ...args: any) {
    console.log(`[${chalk.magenta(this.systemName)}.${chalk.cyan(this.moduleName)}] [${type}]`, ...args)
  }

  public debug(...args: any) {
    this.print(chalk.green('DBG'), ...args)
  }

  public info(...args: any) {
    this.print(chalk.blueBright('INF'), ...args)
  }

  public error(...args: any) {
    this.print(chalk.redBright('ERR'), ...args)
  }

  public warn(...args: any) {
    this.print(chalk.keyword('orange')('WRN'), ...args)
  }

}
