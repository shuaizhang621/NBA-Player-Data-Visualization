import React from 'react';
import { Input, Icon, AutoComplete } from 'antd';
import nba from 'nba';

function onSelect(value) {
    console.log('onSelect', value);
}

export class SearchBar extends React.Component {
    state = {
        dataSource: [],
    }

    handleSearch = (value) => {
        this.setState({
            dataSource: !value ? [] : nba.searchPlayers(value).map(player => player.fullName),
        });
    }

    render() {
        window.nba = nba;
        const { dataSource } = this.state;
        return (
            <AutoComplete
                className="search-bar"
                dataSource={dataSource}
                onSelect={onSelect}
                onSearch={this.handleSearch}
                placeholder="input here"
            >
                <Input suffix={<Icon type="search" className="certain-category-icon" />} />
            </AutoComplete>
        );
    }
}