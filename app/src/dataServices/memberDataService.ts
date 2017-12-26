import {Member} from '../../../common/http';
import {DataService} from './dataService';

export class MemberDataService extends DataService {
    static async getMember() {
        return await this.fetch<Member>({
            method: 'GET',
            url: `${this.apiUrl}/member`
        });
    }
}
