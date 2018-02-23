import {CommonWrapper} from 'enzyme';

export function getText(ele: CommonWrapper<any>): string {
    return ele.props().children;
}