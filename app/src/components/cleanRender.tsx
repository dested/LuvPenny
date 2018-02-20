import React, {Component} from 'react';

interface Props<T> {
    shouldUpdate: (cur: T, next: T) => boolean;
    value?: T;
}

export default class CleanRender<T> extends Component<Props<T>> {
    static make<T>() {
        type CleanRenderType = new () => CleanRender<T>;
        const CleanRenderType: CleanRenderType = (CleanRender as any) as CleanRenderType;
        return CleanRenderType;
    }

    constructor(props: Props<T>) {
        super(props);
    }

    shouldComponentUpdate(nextProps: Readonly<Props<T>>): boolean {
        return this.props.shouldUpdate(this.props.value, nextProps.value);
    }

    render() {
        return this.props.children;
    }
}
