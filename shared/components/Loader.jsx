import React from 'react';

const Loading = React.createClass({
    getDefaultProps() {
        return {
            loading: false
        }
    },
    render() {
        const style = {
            display: this.props.loading ? 'block' : 'none'
        };
        return (
            <div className="loading">
                <div style={style} className="mask"></div>
                {this.props.children}
                <div style={style} className="spinner-container"/>
            </div>
        );
    }
});

export default Loading;
