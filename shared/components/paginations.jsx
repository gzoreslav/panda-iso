import React from 'react';
import {Pagination, Row, Col} from 'react-bootstrap';


export default React.createClass({
    getInitialState() {
        return {
            activePage: 1,
            items: Math.ceil(this.dataLength() / this.props.itemsPerPage)
        };
    },
    dataLength() {
        return this.props.filter
            ? this.props.data.filter(c => this.props.filter(c)).length
            : this.props.data.length

    },
    componentWillReceiveProps(nextProps) {
        this.props = nextProps;
        this.setState({
            activePage: nextProps.activePage,
            items: Math.ceil(this.dataLength() / nextProps.itemsPerPage)
        })

    },
    render() {
        const label = !this.props.hideLabel ?
            `Показано з ${
            (this.state.activePage - 1) * this.props.itemsPerPage + 1} по ${
                this.state.items > this.state.activePage
                    ? this.state.activePage * this.props.itemsPerPage
                    : this.dataLength()} записи з ${this.dataLength()} записів`
            : null;
        return (
            <Row>
                <Col sm={5}>
                    <div style={{paddingTop: '24px', color: '#428bca'}}>
                        {label}
                    </div>
                </Col>
                <Col sm={7}>
                    <Pagination
                        prev
                        next
                        first
                        last
                        ellipsis
                        maxButtons={5}
                        items={this.state.items}
                        activePage={this.state.activePage}
                        onSelect={this.props.onPageChange}
                        className="pull-right"
                    />
                </Col>
            </Row>
        );
    }
});
