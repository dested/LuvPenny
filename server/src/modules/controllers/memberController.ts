import {Controller, Get} from '@nestjs/common';
import {Member} from "../../../../common/http";


@Controller('member')
export class MemberController {
    @Get()
    sayHi(): Member {
        return {name:"Mike",id:'3123'}
    }
}