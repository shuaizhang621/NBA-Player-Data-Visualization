import React from 'react';
import { Input, Icon, AutoComplete } from 'antd';
import nba from 'nba';
import { PROFILE_PIC_URL_PREFIX } from '../constants';

const Option = AutoComplete.Option;

export class SearchBar extends React.Component {
    state = {
        dataSource: [],
    }

    onSelect = (playerName) => {
        this.props.loadPlayerInfo(playerName)
        console.log('onselect:', playerName);
    }


    handleSearch = (value) => {
        this.setState({
            dataSource: !value ? [] : nba.searchPlayers(value).map(player => ({
                fullName: player.fullName,
                playerId: player.playerId,
            }))
        });

    }

    render() {
        window.nba = nba;
        const { dataSource } = this.state;
        const options = dataSource.map(player => (
            <Option key={player.fullName} value={player.fullName} className="player-option">
                <img className="player-option-image" src={`${PROFILE_PIC_URL_PREFIX}/${player.playerId}.png`}/>
                <span className="player-option-label">{player.fullName}</span>
            </Option>
        ));

        return (
            <AutoComplete
                className="search-bar"
                dataSource={dataSource}
                onSelect={this.onSelect}
                onSearch={this.handleSearch}
                placeholder="input here"
                optionLabelProp="value"
                placeholder="Search NBA Player"
                dataSource={options}
            >
                <Input suffix={<Icon type="search" className="certain-category-icon" />} />
            </AutoComplete>
        );
    }
}