import * as ReactNative from 'react-native';
import * as React from 'react';
import * as renderer from 'react-test-renderer';
import {configure, shallow} from 'enzyme';
import * as Adapter from 'enzyme-adapter-react-16';
import * as sinon from 'sinon';

configure({adapter: new Adapter()});

describe('SwiperComponent', () => {});
