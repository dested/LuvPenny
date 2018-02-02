import {NavigationRouteConfig, NavigationStackScreenOptions} from 'react-navigation';

export let hideHeader = {
    headerMode: 'none',
    header: null,
    navigationOptions: {
        header: null
    }
} as NavigationRouteConfig<any>;

export function Navigation(options: NavigationStackScreenOptions) {
    return (target: any) => {
        target.navigationOptions = options;
    };
}
