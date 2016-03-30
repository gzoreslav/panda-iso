import React from 'react';
import marked from 'marked';
import moment from 'moment';
import _ from 'lodash';
import Loading from './Loader.jsx';


export default React.createClass({
    render() {
        return (
            <div className="articles">
                <Loading loading={this.props.loading}>
                    <ArticleList data={_.get(this.props, 'data.data', [])} />
                </Loading>
            </div>
        );
    }
});

const ArticleList = React.createClass({
    rawMarkup: function(text) {
        return {__html: marked(text, {sanitize: true})};
    },
    render: function() {
        const items = this.props.data.map(article =>
            <div key={article.id} className="article" itemScope itemType="http://schema.org/Article">
                <h3 className="title text-danger" itemProp="headline">{article.title}</h3>
                <small className="text-info">
                    <span className="fa fa-calendar"/> {moment(article.posted).format('MMMM Do YYYY')}
                    <meta itemProp="datePublished" content={moment(article.posted).format('YYYY-MM-DD')}/>
                </small>
                <hr/>
                <div itemProp="articleBody" dangerouslySetInnerHTML={this.rawMarkup(article.descr)}/>
            </div>
        );
        return (
            <div>
                {items}
            </div>
        );
    }
});
