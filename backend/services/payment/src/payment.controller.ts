import { Controller, Post, Body } from '@nestjs/common';
import { PaymentService } from './payment.service';

@Controller('payment')
export class PaymentController {
    constructor(private readonly paymentService: PaymentService) { }

    @Post('process')
    async processPayment(@Body() paymentData: any) {
        return this.paymentService.process(paymentData);
    }
}
