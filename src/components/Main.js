import React from 'react';
import nba from 'nba';
import { Profile } from "./Profile";
import { NewsList } from './NewsList';
import { DataViewContainer } from "./DataViewContainer";
import {SearchBar} from "./SearchBar"
import {API_KEY, DEFAULT_PLAYER_INFO} from "../constants"
import $ from "jquery"


export class Main extends React.Component {
    state = {
        playerInfo: DEFAULT_PLAYER_INFO,
        data: [],
    }

    componentDidMount() {
        this.loadPlayerInfo(this.state.playerInfo.fullName);
    }

    componentWillMount() {
        this.getData((res) => {
            this.setState({
                data: res,
            });
        });
    }

    loadPlayerInfo = (playerName) => {
        const id = nba.findPlayer(playerName).playerId;
        nba.stats.playerInfo({ PlayerID: id }).then((info) => {
            const playerInfo = Object.assign(info.commonPlayerInfo[0], info.playerHeadlineStats[0]);
            this.setState({
                playerInfo: playerInfo,
            });
        });
    }

    getData = (callback) => {
        console.log("news name:", this.state.playerInfo.fullName);
        $.ajax({
            method: 'GET',
            url: `https://newsapi.org/v2/everything?q=${this.state.playerInfo.fullName}&sortBy=popularity&apiKey=${API_KEY}`,
        }).then((response) => {
            console.log('news:')
            console.log(response.articles);
            callback(response.articles);
        }, (error) => {
            console.log('error:')
            console.log(error);
        });
    }

    render() {
        return (
            <div className="container">
                <SearchBar loadPlayerInfo={this.loadPlayerInfo}/>
                <div className="main-top">
                    <div className="main">
                        <Profile
                            playerInfo={this.state.playerInfo}
                        />
                        <DataViewContainer playerId={this.state.playerInfo.playerId}/>
                    </div>
                    <NewsList className="news-list" playerInfo={this.state.playerInfo} data={this.state.data}/>
                </div>
            </div>
        );
    }
}