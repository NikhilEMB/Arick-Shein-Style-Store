import { Injectable } from '@angular/core';
import { ConfigService } from '../config/config.service';
//declare var LogglyTracker;
@Injectable({
  providedIn: 'root'
})
export class LogglyLoggerService {
  //private loggly: any;
  constructor(private configService: ConfigService) {
    // if (LogglyTracker && typeof LogglyTracker !== 'undefined') {
    //   this.loggly= new LogglyTracker();
    //   if(this.loggly) {
    //     this.loggly.push({
    //       logglyKey: this.configService.environment.LOGGLY_API_KEY,
    //       sendConsoleErrors: true,
    //       tag: `${this.removeSpace(this.configService.environment.storeName)}`
    //     });
    //   }
    // }
  }
  log(error: any) {
    // if(this.loggly) {
    //   this.loggly.push({message: error.message, stack: error.stack});
    // }
  }
  removeSpace(value: string) {
   //  return value.replace(/\s/g, '_').toLowerCase();
  }
}