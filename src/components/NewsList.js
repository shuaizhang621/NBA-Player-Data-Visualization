import { List, message, Avatar, Spin } from 'antd';
import React from 'react';
import InfiniteScroll from 'react-infinite-scroller';
import $ from "jquery"
import { API_KEY } from "../constants"

export class NewsList extends React.Component {
    state = {
        data: [],
        loading: false,
        hasMore: true,
    }
    getData = (callback) => {
        $.ajax({
            method: 'GET',
            url: `https://newsapi.org/v2/everything?q=${this.props.playerName}&sortBy=popularity&apiKey=${API_KEY}`,
        }).then((response) => {
            console.log('news:')
            console.log(response.articles);
            callback(response.articles);
        }, (error) => {
            console.log('error:')
            console.log(error);
        });
    }

    componentWillMount() {
        this.getData((res) => {
            this.setState({
                data: res,
            });
        });
    }

    handleInfiniteOnLoad = () => {
        let data = this.state.data;
        this.setState({
            loading: true,
        });
        if (data.length > 14) {
            message.warning('Infinite List loaded all');
            this.setState({
                hasMore: false,
                loading: false,
            });
            return;
        }
        this.getData((res) => {
            data = data.concat(res);
            this.setState({
                data,
                loading: false,
            });
        });
    }


    render() {
        return (
            <div className="news-container">
                <InfiniteScroll
                    initialLoad={false}
                    pageStart={0}
                    loadMore={this.handleInfiniteOnLoad}
                    hasMore={!this.state.loading && this.state.hasMore}
                    useWindow={false}
                >
                    <List
                        dataSource={this.state.data}
                        renderItem={item => (
                            <List.Item id="list-item" clakey={item.id}>
                                <List.Item.Meta
                                    title={<a href={item.url}>{item.title}</a>}
                                    description={item.source.name}
                                />
                                <div id='list-content'>
                                    <p>{item.description}<a href={item.url}> Read More</a></p>
                                    <p>{item.publishedAt.substr(0, 10)}</p>
                                </div>
                            </List.Item>
                        )}
                    >
                        {this.state.loading && this.state.hasMore && <Spin className="demo-loading" />}
                    </List>
                </InfiniteScroll>
            </div>
        );
    }
}
