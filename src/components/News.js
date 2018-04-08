import React from 'react';
import { API_KEY } from "../constants"
import $ from 'jquery';

export class News extends React.Component {
    componentDidMount() {
        $.ajax({
            method: 'GET',
            url: `https://newsapi.org/v2/everything?q=${this.props.playerName}&apiKey=${API_KEY}`,
        }).then((response) => {
            console.log('news:')
            console.log(response);
        }, (error) => {
            console.log('error:')
            console.log(error);
        });
    }

    render() {
        return (
            <div>this is news.</div>
        );
    }

}