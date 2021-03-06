import {Module, RequestMethod, NestModule} from '@nestjs/common';
import {MiddlewaresConsumer} from "@nestjs/common/interfaces/middlewares";
import {CorsMiddleware} from "../middleware/corsMiddleware";

import {CheckController} from "./controllers/checkController";
import {MemberController} from "./controllers/memberController";

@Module({
    modules: [],
    controllers: [MemberController,CheckController]
})
export class ApplicationModule implements NestModule {
    configure(consumer: MiddlewaresConsumer): void {
        consumer.apply(CorsMiddleware).forRoutes({path: '/*', method: RequestMethod.ALL});
    }
}