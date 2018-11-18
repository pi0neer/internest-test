import React, {Component} from 'react';
import './App.css';
import shopData from "./utils/shop";
import Table from "./components/Table";
import {Grid, Row} from "react-bootstrap";
import Filters from "./components/Filters";
import Card from "./components/Card";

export default class App extends Component {

    state = {
        shopData: shopData.goods,
        showItemCard: false,
    }

    // Смотрим, если что-нибудь из нужных нам значений уже есть localStorage, если есть, то вызываем фильтрующую функцию
    componentDidMount() {
        let [searchInputValue, minPrice, maxPrice] = [localStorage.getItem('searchInputValue'), localStorage.getItem('minPrice'), localStorage.getItem('maxPrice')]
        if (searchInputValue || (minPrice && maxPrice)){
            this.handleShopDataChange(searchInputValue, [minPrice, maxPrice])
        }
    }

    // Фильтрующая функция searchInputValue - значение поля поиска по названию/id, extremePrices - массив с двумя значениями: цена "От" и цена "До"
    handleShopDataChange = (searchInputValue, extremePrices) => {
        let [maxPrice, minPrice, shopItemValue, showItemCard] = [Number.MAX_VALUE, 0, '', false]
        // Проверяем на null, на случай, если функция вызвана со значениями из localStorage и на undefined, если фильтр с ценами пока не трогали
        if (extremePrices !== undefined && !!extremePrices[0] && !!extremePrices[1]) [maxPrice, minPrice] = [extremePrices[1], extremePrices[0]]
        // Такая же проверка на null и undefined, только для поля поиска по названию/id
        if (searchInputValue !== undefined && !!searchInputValue) {
            // Проверка если в поле поиска по названию/id ввели число
            showItemCard = !Number.isNaN(parseInt(searchInputValue))
            if (showItemCard) shopItemValue = parseInt(searchInputValue)
            else shopItemValue = searchInputValue.toLowerCase()
        }
        // Находим нужные товары согласно указанным фильтрам
        let displayedShopItems = shopData.goods.filter(element => {
            let price = element.data.price
            let searchValue = element.data.title.toLowerCase()
            let itemId = element.id
            // Находим товар по id, подразумевая, что id уникален для каждого товара
            if (showItemCard) return shopItemValue === itemId
            // Находим товар по букве/буквам в названии (регистр не важен, поскольку приводим к нижнему регистру) и указанному промежутку цен
            else return searchValue.indexOf(shopItemValue) !== -1 && price <= maxPrice && price >= minPrice
        })
        this.setState({
            shopData: displayedShopItems,
            showItemCard: showItemCard,
        })
    }

    render() {
        return (
            <Grid>
                <Filters shopData={shopData.goods} handleShopDataChange={this.handleShopDataChange}/>
                <Row>
                    {this.state.showItemCard && this.state.shopData.length === 1 ? (
                            <Card itemInfo={this.state.shopData}/>
                        ) : (
                            <Table shopData={this.state.shopData}/>
                        )
                    }
                </Row>
            </Grid>
        )
    }
}