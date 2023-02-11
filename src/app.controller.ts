import { Body, Controller, Get, HttpStatus, Post, Res } from '@nestjs/common';
import { AppService } from './app.service';
import { IReceivedData } from './received-data.interface';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return 'Hola amigo...';
  }

  @Post()
  async receiveData(@Res() res, @Body() data: IReceivedData): Promise<any> {
    this.showData(data);
    return res.status(HttpStatus.CREATED).json({
      message: 'Empty',
      result: [data],
    });
  }

  @Post('receive-data/')
  async receiveData2(@Res() res, @Body() data: IReceivedData): Promise<any> {
    this.showData(data);
    return res.status(HttpStatus.CREATED).json({
      message: 'Receive-data',
      result: [data],
    });
  }

  showData(data: any): void {
    console.log('**********************Data******************');
    console.log(data);
    console.log('');
    if (data?.objectJSON) {
      const obj = JSON.parse(data?.objectJSON);
      const temperature = obj['temperatureSensor'];
      const humidity = obj.humiditySensor;
      console.log('Temperature: ', temperature);
      console.log('Humidity: ', humidity);
    }
  }
}
