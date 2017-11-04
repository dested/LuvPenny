import {NavigationRouteConfig} from 'react-navigation'

export let hideHeader={
    headerMode: 'none',
    header: null,
    navigationOptions: {
        header: null
    }
} as NavigationRouteConfig<any> ;


import {NavigationStackScreenOptions} from "react-navigation";
export function Navigation(options: NavigationStackScreenOptions) {
    return (target: any) => {
        target.navigationOptions=options;
    }
}
