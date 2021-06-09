import React from 'react';
import './scroll.css';

export class VerticalScrollable extends React.Component {
    render() {
        return(
            <div className = "Scroll-y">
                {this.props.children}
            </div>
        );
    }
}

export class HorizontalScrollable extends React.Component {
    render() {
        return(
            <div className = "Scroll-x">
                {this.props.children}
            </div>
        );
    }
}