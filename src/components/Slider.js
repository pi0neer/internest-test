import React from "react";
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';
import {Col, ControlLabel, Form, FormControl, FormGroup, Row} from "react-bootstrap";

const createSliderWithTooltip = Slider.createSliderWithTooltip
const Range = createSliderWithTooltip(Slider.Range)

const minPrice = localStorage.getItem('minPrice')
const maxPrice = localStorage.getItem('maxPrice')

// Функция поиска минимального/максимального значения цены, max - флаг (true-ищем максимальную, false-минимальную)
function findExtremePrices(array, max) {
        let price = max ? 0 : Number.MAX_VALUE
        array.forEach((item, i, arr) => {
            if (max ? item.data.price > price : item.data.price < price) {
                price = item.data.price
            }
        })
        return price
}

export default class MySlider extends React.Component {

    // Устанавливаем значения цены "От"(lowerBound) и цены "До"(upperBound) из localStorage, если они там есть
    state = {
        lowerBound: minPrice ? parseInt(minPrice) : findExtremePrices(this.props.shopData, false),
        upperBound: maxPrice ? parseInt(maxPrice) : findExtremePrices(this.props.shopData, true),
        maxPrice: findExtremePrices(this.props.shopData, true),
        minPrice: findExtremePrices(this.props.shopData, false),
        value: [minPrice ? parseInt(minPrice) : findExtremePrices(this.props.shopData, false), maxPrice ? parseInt(maxPrice) : findExtremePrices(this.props.shopData, true)],
    }

    // Функция, которая обрабатываем изменения полей цены "От"(lowerBound) и цены "До"(upperBound), изменяет на соответствующие значения
    // в слайдере и после этого вызывает функцию фильтрации с новыми параметрами
    handleChangePriceInput = (event) => {
        // Проверка для parseInt(''), которая в этом случае возвращает NaN, что вызовет ошибку
        let value = event.target.value === '' ? 0 : parseInt(event.target.value)
        let name = event.target.name
        if (name === 'lowerBound') {
            this.setState({
                value: [value, this.state.upperBound],
                [name]: value,
            }, () => {this.props.handleChangePriceSlider(this.state.value)})
        } else {
            this.setState({
                value: [this.state.lowerBound, value],
                [name]: value,
            }, () => {this.props.handleChangePriceSlider(this.state.value)})
        }
    }

    // Фуннкция, которая обрабатывает изменение слайдера, изменяет на соответствующие значения
    // поля цены "От"(lowerBound) и цены "До"(upperBound), после этого вызывает функцию фильтрации с новыми параметрами
    onSliderChange = (rangeValues) => {
        this.setState({
            value: rangeValues,
            lowerBound: rangeValues[0],
            upperBound: rangeValues[1],
        }, () => {this.props.handleChangePriceSlider(this.state.value)})
    }

    render() {
        const sliderMarks = {
            [this.state.minPrice]: <strong>{this.state.minPrice}</strong>,
            [this.state.maxPrice]: <strong>{this.state.maxPrice}</strong>,
        }
        return (
            <div>
                <Row>
                    <Form inline>
                        <p>Фильтр по цене</p>
                        <FormGroup>
                            <ControlLabel style={{marginRight: '20px'}}>От</ControlLabel>
                            <FormControl min={this.state.minPrice} max={this.state.maxPrice} name="lowerBound" type="number" value={this.state.lowerBound} onChange={this.handleChangePriceInput} />
                        </FormGroup>
                        <FormGroup style={{marginLeft: '20px'}}>
                            <ControlLabel style={{marginRight: '20px'}}>До</ControlLabel>
                            <FormControl min={this.state.minPrice} max={this.state.maxPrice} name="upperBound" type="number" value={this.state.upperBound} onChange={this.handleChangePriceInput} />
                        </FormGroup>
                    </Form>
                </Row>
                <Row style={{marginTop: '20px'}}>
                    <Col xs={6}>
                        <Range
                            min={this.state.minPrice}
                            max={this.state.maxPrice}
                            allowCross={false}
                            value={this.state.value}
                            onChange={this.onSliderChange}
                            marks={sliderMarks}
                        />
                    </Col>
                </Row>
            </div>
        )
    }
}