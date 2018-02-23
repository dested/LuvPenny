import React from 'react';
import {configure, shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import {CalendarComponent} from '../../../../pages/calendarPage/components/calendar';
import moment from 'moment';

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
        let calendarHeader = result.at(0).at(0);
        let left = calendarHeader.at(0).find(Text);
        let center = calendarHeader.at(1).find(Text);
        let right = calendarHeader.at(2).find(Text);
        expect(left.text()).toEqual('April 2018');
        expect(center.text()).toEqual('April 2018');
        expect(right.text()).toEqual('May 2018');
    });
});

function noop() {
}