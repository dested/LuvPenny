import {Controller, Get} from '@nestjs/common';
import {Member} from "../../../../common/http";


@Controller('check')
export class CheckController {
    @Get()
    check(): boolean {
        return true
    }
}