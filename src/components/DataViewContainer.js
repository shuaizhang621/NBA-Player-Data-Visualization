import React from 'react';
import { ShotChart } from './ShotChart';
import { CountSlider } from "./CountSlider";
import _ from 'lodash';
import { Radio, Row, Col, Switch } from 'antd';

const RadioGroup = Radio.Group;

export class DataViewContainer extends React.Component {
    state = {
        minCount: 2,
        charType: 'hexbin',
        displayTooltip: true,
    }

    onCountSliderChange = (count) => {
        this.setState({ minCount: Number(count) || 2 });
    }

    onChange = (e) => {
        console.log('radio checked', e.target.value);
        this.setState({
            charType: e.target.value,
        });
    }

    onTooltipChange = (displayTooltip) => {
        console.log(displayTooltip);
        this.setState({ displayTooltip });
    }

    render() {
        return (
            <div className="data-view">
                <ShotChart
                    playerId={this.props.playerId}
                    minCount={this.state.minCount}
                    charType={this.state.charType}
                    displayTooltip={this.state.displayTooltip}
                />
                <div className="filters">
                    {this.state.charType === "hexbin" ? <CountSlider
                        minCount={this.state.minCount}
                        onCountSliderChange={_.debounce(this.onCountSliderChange, 500)}
                    /> : null}
                    <Row className="tooltip">
                        <Col span={13}>
                            <RadioGroup onChange={this.onChange} value={this.state.charType}>
                                <Radio value="hexbin">Hex</Radio>
                                <Radio value="scatter">Scatter</Radio>
                            </RadioGroup>
                        </Col>
                        <Col span={1}>
                            <Switch
                                checkedChildren="on"
                                unCheckedChildren="off"
                                onClick={this.onTooltipChange}
                                defaultChecked
                                />
                        </Col>
                    </Row>
                </div>
            </div>
        );
    }
}
