import React from 'react';
import nba from 'nba';
import { ShotChart } from './ShotChart';
import { Profile } from "./Profile";
import { NewsList } from './NewsList';

export class Main extends React.Component {
    state = {
        playerId: nba.findPlayer('Stephen Curry').playerId,
        playerInfo: {},
    }

    componentDidMount() {
        nba.stats.playerInfo({ PlayerID: this.state.playerId }).then((info) => {
            const playerInfo = Object.assign(info.commonPlayerInfo[0], info.playerHeadlineStats[0]);
            console.log(playerInfo);
            this.setState({
                playerInfo: playerInfo,
            });
        });
    }

    render() {
        return (
            <div className="container">
                <div className="main">
                    <Profile
                        playerId={this.state.playerId}
                        playerInfo={this.state.playerInfo}
                    />
                    <ShotChart playerId={2544}/>
                </div>
                <NewsList className="news-list" playerName={"LeBron James"}/>
            </div>
        );
    }
}