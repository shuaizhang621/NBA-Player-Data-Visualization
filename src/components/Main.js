import React from 'react';
import nba from 'nba';
import { Profile } from "./Profile";
import { NewsList } from './NewsList';
import { DataViewContainer } from "./DataViewContainer";
import {SearchBar} from "./SearchBar"
import { DEFAULT_PLAYER_INFO } from "../constants"


export class Main extends React.Component {
    state = {
        playerInfo: DEFAULT_PLAYER_INFO,
    }

    componentDidMount() {
        this.loadPlayerInfo(this.state.playerInfo.fullName);
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
                    <NewsList className="news-list" playerName={this.state.playerInfo.fullName}/>
                </div>
            </div>
        );
    }
}