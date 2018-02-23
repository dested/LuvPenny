import React from 'react';
import {Text} from 'react-native';

import {configure, render, shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import {CalendarComponent} from '../../../../pages/calendarPage/components/calendar';
import moment from 'moment';
import {getText} from '../../../utils';

configure({adapter: new Adapter()});
describe('calendar header', () => {
    it('renders bumped date left', () => {
        let result =
            shallow(
                <CalendarComponent
                    view={'week'}
                    scrollKeeper={null}
                    visibleDate={moment(new Date(2018, 3, 30))}
                    selectedDate={moment(new Date(2018, 3, 30))}
                    selectDate={noop}
                    setVisibleDate={noop}
                    updateView={noop}
                />
            );

        let calendarHeader = result.childAt(0);
        let left = getText(calendarHeader.childAt(0).find(Text));
        let center = getText(calendarHeader.childAt(1).find(Text));
        let right = getText(calendarHeader.childAt(2).find(Text));
        expect(left).toEqual('April 2018');
        expect(center).toEqual('April 2018');
        expect(right).toEqual('May 2018');
    });
});

function noop() {
}