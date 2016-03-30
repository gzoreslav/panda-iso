import React from 'react';
import _ from 'lodash';
import {Breadcrumb, BreadcrumbItem} from 'react-bootstrap';

export default React.createClass({
    render() {
        const crumbs = _(this.props.crumbs)
            .map((c, i) =>
                <BreadcrumbItem key={i} href={c.link} active={i === this.props.crumbs.length - 1}>
                    {c.label}
                </BreadcrumbItem>
            )
            .value();
        return (
            <Breadcrumb>
                {crumbs}
            </Breadcrumb>
        );
    }
});
