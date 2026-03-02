import { Injectable } from '@nestjs/common';

@Injectable()
export class OrderService {
    private orders = [];

    findOne(id: string) {
        return this.orders.find(o => o.id === id);
    }

    async create(orderData: any) {
        const newOrder = {
            id: Date.now().toString(),
            ...orderData,
            status: 'PENDING',
            createdAt: new Date().toISOString(),
        };
        this.orders.push(newOrder);

        console.log('Order created, starting orchestration simulation...');

        // SIMULATED ORCHESTRATION (Similar to Step Functions)
        try {
            // 1. Process Payment
            console.log('Calling Payment Service...');
            const paymentRes = await fetch('http://payment:3000/payment/process', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ orderId: newOrder.id, amount: orderData.total || 100 })
            }).then(r => r.json());

            if (paymentRes.status === 'SUCCESS') {
                newOrder.status = 'PAID';
                console.log('Payment Approved. Transaction ID:', paymentRes.transactionId);

                // 2. Send Notification
                console.log('Calling Notification Service...');
                await fetch('http://notification:3000/notifications/send', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        type: 'ORDER_CONFIRMATION',
                        recipient: orderData.email || 'customer@example.com',
                        message: `Order ${newOrder.id} has been successfully processed.`
                    })
                });
                console.log('Notification Sent.');
            } else {
                newOrder.status = 'PAYMENT_FAILED';
                console.error('Payment Failed.');
            }
        } catch (err) {
            console.error('Orchestration error (services might be down):', err.message);
            // Fallback for simulation
            newOrder.status = 'PAID (SIMULATED)';
        }

        return newOrder;
    }
}
