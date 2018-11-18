import React from "react";
import {Col, Jumbotron, Row} from "react-bootstrap";

export default class Card extends React.Component {

    render() {
        return(
            <Jumbotron>
                <Row>
                    <Col xs={5} className={'align-center'}>
                        <img height={'400px'} src={this.props.itemInfo[0].data.base_url}/>
                    </Col>
                    <Col xs={5} xsOffset={1}>
                        <label>ID: <p>{this.props.itemInfo[0].id}</p></label><br/>
                        <label>Название: <p>{this.props.itemInfo[0].data.title}</p></label><br/>
                        <label>Цена: <p>{this.props.itemInfo[0].data.price}</p></label><br/>
                        <label>Скидка: <p>{this.props.itemInfo[0].data.discount}</p></label>
                    </Col>
                </Row>
            </Jumbotron>
        )
    }
}