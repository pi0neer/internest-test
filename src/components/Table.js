import React from 'react'
import ReactTable from "react-table";
import 'react-table/react-table.css'

// Табличка с хорошим встроенным функционалом и настройками: react-table.js.org
export default class Table extends React.Component {

    render() {
        const tableColumns = [{
            Header: 'Id',
            accessor: 'id',
            sortable: false,
            resizable: false,
            className: 'align-center',
            width: 100,
        }, {
            Header: 'Название',
            accessor: 'data.title',
            resizable: false,
            className: 'align-center',
            width: 450,
        }, {
            Header: 'Картинка',
            accessor: 'data.base_url',
            Cell: props => <img height={'160px'} src={props.value}/>,
            className: 'align-center',
            sortable: false,
            resizable: false,
        }, {
            Header: 'Цена',
            accessor: 'data.price',
            className: 'align-center',
            resizable: false,
        }, {
            Header: 'Скидка',
            accessor: 'data.discount',
            className: 'align-center',
            resizable: false,
        }];

        return (
            <ReactTable
                noDataText='Товаров с такой ценой и названием или id не найдено!'
                previousText='Предыдущая страница'
                nextText='Следующая страница'
                loadingText='Загрузка...'
                pageText='Страница'
                ofText='из'
                rowsText='товаров'
                defaultPageSize={5}
                data={this.props.shopData}
                columns={tableColumns}
                style={{marginBottom: '50px'}}
            />
        )
    }
}