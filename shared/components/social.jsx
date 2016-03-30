import React from 'react';
import {Facebook} from '../mixins/social/Facebook.js';

export const SocialFB = React.createClass({
    mixins: [Facebook],
    componentDidMount() {
        //init FB App
        this.doInit();
    },
    render() {
        return (
            <div>
                <h5 className="text-success partners">Ми в соцмережах:</h5>
                <div className="fb-page"
                    data-href="https://www.facebook.com/pandaruncomua"
                    data-small-header="true"
                    data-adapt-container-width="true"
                    data-hide-cover="false"
                    data-show-facepile="true"
                    data-show-posts="false">
                    <div className="fb-xfbml-parse-ignore">
                        <blockquote>
                            <a href="https://www.facebook.com/pandaruncomua">Panda Run Community</a>
                        </blockquote>
                    </div>
                </div>
            </div>
        );
    }
});
