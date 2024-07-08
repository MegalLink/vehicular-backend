import { Module } from '@nestjs/common';
import { CartService } from './cart.service';
import { CartController } from './cart.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from '../auth/auth.module';
import { Cart, CartSchema } from './entities/cart.entity';
import { CartRepository } from './repository/cart.repository';

@Module({
  controllers: [CartController],
  providers: [CartService, CartRepository],
  imports: [
    MongooseModule.forFeature([{ name: Cart.name, schema: CartSchema }]),
    AuthModule,
  ],
})
export class CartModule {}
