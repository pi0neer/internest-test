import React from "react";
import {FormControl, Row} from "react-bootstrap";

// Простой input для поля поиска по названию/id
export default class LiveSearch extends React.Component {
    render() {
        return(
            <Row>
                <p>Фильтр по названию или id</p>
                <FormControl
                    type="text"
                    placeholder="Введите название продукта или его id"
                    value={localStorage.getItem('searchInputValue') ? localStorage.getItem('searchInputValue') : ''}
                    onChange={this.props.handleLiveSearch}
                />
            </Row>
        )
    }
}