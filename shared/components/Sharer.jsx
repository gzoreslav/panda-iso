import React from 'react';
import moment from 'moment';
import config from '../../config/default.js';

const Sharer = React.createClass({
    shareToFB(e) {
        e.preventDefault();
        const name = `Мій результат на ${this.props.info.competition_title} (категорія ${this.props.info.title})`;
        const caption = config.host; 
        const rich = (this.props.result.sex === 'f') ? 'подолала' : 'подолав';  
        const description = `${moment(this.props.info.start_date).format('DD/MM/YYYY')} ` +
            `${this.props.result.firstname} ${this.props.result.lastname} ${rich} дистанцію ` +
            `${this.props.info.dist.toFixed(2)} км ` +
            `за ${this.props.result.laps[this.props.result.laps.length-1].time}`;
        const link = `${config.host}/competitions/${this.props.info.id_competition}/category/${this.props.info.id}`; 
        const picture = `${config.host}/img/events-logo/${this.props.info.logo}`;   
        this.initFB();
        window.FB.ui({
            method: 'feed',
            name,
            link,
            picture,
            description,
            caption,
            message: ''
        },
        function (response) {
            if (response && response.post_id) {
                console.log('Post was published.');
            } else {
                console.log('Post was not published.');
            }
        });
    },
    initFB() {
        if (window && window.FB) {
            window.FB.init({
                appId      : '953645997999606',
                cookie     : true,  // enable cookies to allow the server to access 
                xfbml      : true,  // parse social plugins on this page
                version    : 'v2.2' // use version 2.2
            });
        }
    },
    render() {
        return(
            <a href="#" className="share-fb" onClick={this.shareToFB}>share</a>
        );
    }
});

export default Sharer; 

    /*shareToFB(e) {
      e.preventDefault();
      FB.ui(
          {
          method: 'feed',
          name: '${result.firstname} ${result.lastname} [результат ${result.rank} з 0]',
          link: Backbone.history.location.href,
          picture: 'http://www.pandarun.com.ua/media/competitions/' + self.model.get("poster"),
          description: 
                   self.model.get("date") +
            ', ' + self.model.get("type") +
            ', ' + self.model.get("town") +
            '. Довжина дистанції - ' + self.model.get("dist") + ' км',
          caption: 'Результат змагань \"' + self.model.get("competition_title") + ' [' + self.model.get("title") + ']\"',
          message: ''
        },
        function (response) {
                   if (response && response.post_id) {
                       console.log('Post was published.');
                   } else {
                       console.log('Post was not published.');
                   }
               });
      }
    });
    },*/   
