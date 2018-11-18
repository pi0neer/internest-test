import React from "react";
import {Col, Row} from "react-bootstrap";
import LiveSearch from "./LiveSearch";
import Slider from "./Slider";
import shopData from "../utils/shop";

export default class Filters extends React.Component{

    state = {
        extremePrices: undefined,
        searchInputValue: undefined,
    }

    handleLiveSearch = (event) => {
        event.persist()
        let eventValue = event.target.value
        localStorage.setItem('searchInputValue', eventValue)
        this.setState({
            searchInputValue: eventValue,
        }, () => {this.props.handleShopDataChange(this.state.searchInputValue, this.state.extremePrices)})
    }

    handleChangePriceSlider = (extremePrices) => {
        localStorage.setItem('maxPrice', extremePrices[1])
        localStorage.setItem('minPrice', extremePrices[0])
        this.setState({
            extremePrices: extremePrices,
        }, () => {this.props.handleShopDataChange(this.state.searchInputValue, this.state.extremePrices)})
    }

    render(){
        return(
            <Row className={'my-5'}>
                <Col xs={5}>
                    <LiveSearch
                        shopData={this.props.shopData}
                        handleLiveSearch={this.handleLiveSearch}
                    />
                </Col>
                <Col xs={6} xsOffset={1}>
                    <Slider
                        shopData={shopData.goods}
                        handleChangePriceSlider={this.handleChangePriceSlider}
                    />
                </Col>
            </Row>
        )
    }
}