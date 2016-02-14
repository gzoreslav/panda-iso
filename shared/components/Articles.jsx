import React from 'react';
import marked from 'marked';
import moment from 'moment';

class Articles extends React.Component {

    render() {
        return (
            <div className="articles">
                <ArticleList data={this.props.resp.data} />
            </div>
        );
    }
}

var ArticleList = React.createClass({
    rawMarkup: function(text) {
        let rawMarkup = marked(text, {sanitize: true});
        return { __html: rawMarkup };
    },
    render: function() {
        var items = this.props.data.map((article) => {
            return (
                <div className="article" itemScope itemType="http://schema.org/Article">
                    <h3 className="title text-danger" itemProp="headline">{article.title}</h3>
                    <small className="text-info">
                        <span className="fa fa-calendar"/> {moment(article.posted).format('MMMM Do YYYY')}
                        <meta itemProp="datePublished" content={moment(article.posted).format('YYYY-MM-DD')}/>    
                    </small>
                    <hr/>
                    <div itemProp="articleBody" dangerouslySetInnerHTML={this.rawMarkup(article.descr)}/>
                </div>
            );
        });
        return (
            <div>
                {items}
            </div>
        );
    }
});


export default Articles;
