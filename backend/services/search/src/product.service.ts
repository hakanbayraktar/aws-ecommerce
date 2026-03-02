import { Injectable } from '@nestjs/common';

@Injectable()
export class ProductService {
    private products = [
        { id: '1', name: 'Laptop', price: 1200, category: 'Electronics' },
        { id: '2', name: 'Smartphone', price: 800, category: 'Electronics' },
    ];

    findAll() {
        return this.products;
    }

    findOne(id: string) {
        return this.products.find(p => p.id === id);
    }

    create(product: any) {
        const newProduct = { ...product, id: Date.now().toString() };
        this.products.push(newProduct);
        // TODO: Persistence in DynamoDB
        return newProduct;
    }

    update(id: string, product: any) {
        const index = this.products.findIndex(p => p.id === id);
        if (index !== -1) {
            this.products[index] = { ...this.products[index], ...product };
            return this.products[index];
        }
        return null;
    }

    remove(id: string) {
        const index = this.products.findIndex(p => p.id === id);
        if (index !== -1) {
            const removed = this.products.splice(index, 1);
            return removed[0];
        }
        return null;
    }
}
