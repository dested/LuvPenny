import {observable, computed, action} from 'mobx';
import moment from 'moment';

export interface AppStoreProps {
    appStore: AppStore;
}

export class AppStore {
    static key = 'appStore';
    @observable public date: string;

    constructor() {
        this.date = moment().format('YYYY-MM-DD');
    }

    @action
    setDate(date: string): void {
        this.date = date;
    }
}
