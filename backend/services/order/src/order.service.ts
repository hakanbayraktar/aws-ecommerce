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

        // TODO: Trigger Step Function here
        console.log('Order created, triggering Step Function workflow...');

        return newOrder;
    }
}
