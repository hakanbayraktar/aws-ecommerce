import { Injectable } from '@nestjs/common';

@Injectable()
export class CartService {
    private carts = new Map<string, any[]>();

    getCart(userId: string) {
        return this.carts.get(userId) || [];
    }

    addItem(userId: string, item: any) {
        const cart = this.getCart(userId);
        cart.push(item);
        this.carts.set(userId, cart);
        // TODO: Persistence in Redis/DynamoDB
        return cart;
    }

    removeItem(userId: string, productId: string) {
        let cart = this.getCart(userId);
        cart = cart.filter(item => item.productId !== productId);
        this.carts.set(userId, cart);
        return cart;
    }
}
