import {Controller, Get} from '@nestjs/common';


@Controller('member')
export default class MemberController {

    @Get()
    sayHi() {
        return "Showdy!"
    }
}