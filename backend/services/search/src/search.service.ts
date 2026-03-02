import { Injectable } from '@nestjs/common';

@Injectable()
export class SearchService {
    private products = [
        { id: '1', name: 'Cloud-Native Hoodie', price: 59, description: 'Premium heavyweight cotton with AWS-inspired art.', image: '/api/images/hoodie.png' },
        { id: '2', name: 'DevOps Atolyesi Desk Mat', price: 35, description: 'Extra large workspace mat for architects.', image: '/api/images/deskmat.png' },
        { id: '3', name: 'Infinite Scaling Mug', price: 18, description: 'Double-walled ceramic for long coding sessions.', image: '/api/images/mug.png' },
    ];

    async search(query: string = '') {
        // In a real scenario, this would aggregate data from OpenSearch
        if (!query) return this.products;
        return this.products.filter(p =>
            p.name.toLowerCase().includes(query.toLowerCase()) ||
            p.description.toLowerCase().includes(query.toLowerCase())
        );
    }
}
