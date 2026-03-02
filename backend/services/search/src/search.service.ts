import { Injectable } from '@nestjs/common';

@Injectable()
export class SearchService {
    private products = [
        { id: '1', name: 'Cloud-Native Hoodie', price: 59, description: 'Premium heavyweight cotton with AWS-inspired art.', image: 'https://images.unsplash.com/photo-1556821840-3a63f95609a7?auto=format&fit=crop&q=80&w=400' },
        { id: '2', name: 'DevOps Atolyesi Desk Mat', price: 35, description: 'Extra large workspace mat for architects.', image: 'https://images.unsplash.com/photo-1616627561950-9f746bcd554e?auto=format&fit=crop&q=80&w=400' },
        { id: '3', name: 'Infinite Scaling Mug', price: 18, description: 'Double-walled ceramic for long coding sessions.', image: 'https://images.unsplash.com/photo-1514228742587-6b1558fbed20?auto=format&fit=crop&q=80&w=400' },
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
