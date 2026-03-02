import { Injectable } from '@nestjs/common';

@Injectable()
export class NotificationService {
    async send(data: any) {
        console.log(`Sending ${data.type} notification to:`, data.recipient);
        console.log('Message:', data.message);

        return {
            notificationId: `NOTIF-${Math.random().toString(36).substr(2, 9).toUpperCase()}`,
            status: 'SENT',
            timestamp: new Date().toISOString(),
        };
    }
}
