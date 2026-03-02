import { Controller, Get, Post, Body, Param, Delete } from '@nestjs/common';
import { CartService } from './cart.service';

@Controller('cart')
export class CartController {
    constructor(private readonly cartService: CartService) { }

    @Get(':userId')
    getCart(@Param('userId') userId: string) {
        return this.cartService.getCart(userId);
    }

    @Post(':userId')
    addItem(@Param('userId') userId: string, @Body() item: any) {
        return this.cartService.addItem(userId, item);
    }

    @Delete(':userId/:productId')
    removeItem(@Param('userId') userId: string, @Param('productId') productId: string) {
        return this.cartService.removeItem(userId, productId);
    }
}
