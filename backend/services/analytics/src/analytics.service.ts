import { Injectable } from '@nestjs/common';

@Injectable()
export class AnalyticsService {
    getStats() {
        return {
            activeUsers: Math.floor(Math.random() * 500) + 100,
            dailyOrders: Math.floor(Math.random() * 50) + 10,
            systemHealth: 98.5,
            serviceLatency: {
                search: 45,
                order: 120,
                payment: 350,
            },
            recentSales: [
                { id: '1', amount: 120, time: '2 mins ago' },
                { id: '2', amount: 45, time: '15 mins ago' },
                { id: '3', amount: 89, time: '40 mins ago' },
            ]
        };
    }
}
