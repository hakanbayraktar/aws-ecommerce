import { Injectable } from '@nestjs/common';

@Injectable()
export class PaymentService {
    async process(paymentData: any) {
        console.log('Processing payment for amount:', paymentData.amount);

        // Simulate payment logic (80% success rate)
        const isSuccess = Math.random() > 0.2;

        return {
            transactionId: `TXN-${Math.random().toString(36).substr(2, 9).toUpperCase()}`,
            status: isSuccess ? 'SUCCESS' : 'FAILED',
            amount: paymentData.amount,
            timestamp: new Date().toISOString(),
        };
    }
}
