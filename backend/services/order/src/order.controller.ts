import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { OrderService } from './order.service';

@Controller('orders')
export class OrderController {
    constructor(private readonly orderService: OrderService) { }

    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.orderService.findOne(id);
    }

    @Post()
    async create(@Body() orderData: any) {
        return this.orderService.create(orderData);
    }
}
