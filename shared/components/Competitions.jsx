import React from 'react';
import moment from 'moment';

class Competitions extends React.Component {
    render() {
        return (
            <table className="table table-striped table-bordered">
                <thead>
                <tr>
                    <th className="column-name">Назва</th>
                    <th>Тип</th>
                    <th>Дата</th>
                    <th>Локація</th>
                    <th>Кількість учасників</th>
                </tr>
                </thead>
                <CompetitionRows data={this.props.data.data} />
            </table>
        );
    }
}

var CompetitionRows = React.createClass({
    render: function() {
        var competitionsRows = this.props.data.map(function (competition) {
            const classString = 'compettition-type compettition-type-' + competition.type_id;
            const link = 'competitions/'+competition.id;
            let categories = (<em>немає категорій</em>);
            return (
                <tr itemScope itemType="http://schema.org/SportsEvent">
                    <td>
                        <strong><a href={link}><span itemProp="name">{competition.title}</span></a></strong><br/>
                        <CompetitionCategories data={competition.categories} />
                    </td>
                    <td>
                        <span className={classString}>{competition.type_title}</span><br/>
                        <span itemProp="description">{competition.type_title}</span>
                    </td>
                    <td>
                        <meta itemProp="startDate" content={moment(competition.start_date).format('YYYY-MM-DD')}/>
                        <span>{moment(competition.start_date).format('DD/MM/YY')}</span>
                    </td>
                    <td itemProp="location" itemScope itemType="http://schema.org/Place">
                        <span itemProp="address" itemScope itemType="http://schema.org/PostalAddress">
                            <span itemProp="addressLocality">{competition.location}</span>
                        </span>    
                    </td>
                    <td>
                        {competition.competitors.count}
                    </td>
                </tr>
            );
        });
        return (
            <tbody>
            {competitionsRows}
            </tbody>
        );
    }
});

var CompetitionCategories = React.createClass({
    render: function() {
        let categories = (<em>немає категорій</em>);
        if (this.props.data.length > 0) {
            categories = [];
            for (var i = 0; i < this.props.data.length; i++) {
                const link = 'competitions/' +  this.props.data[i].id_competition + '/category/' + this.props.data[i].id;
                let divider = ', ';
                if (i === (this.props.data.length - 1)) {
                    divider = '';
                }
                categories.push(<em><a href={link}>{this.props.data[i].title}</a>{divider}</em>);
            }
        }
        return (
            <span>
                Категорії: {categories}
            </span>
        );
    }
});


export default Competitions;
