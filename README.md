Проект создан с помощью [Create React App](https://github.com/facebook/create-react-app).
# Задание
Реализовать одностраничное приложение, предназначенное для вывода списка товаров магазина.
Источник данных: shop.json
## Базовая реализация.
Табличный вывод полученных данных.
Использовать для вывода следующие поля:
 - id
 - title
 - картинка товара, загружаемая по ссылке из base_url(адрес картинки),
 - price
 - скидка на товар (использовать поле oldPrice со старой ценой)
- [x] Сделать сортировку по названию (title), цене (price) и скидке. (Сделано с помощью функционала [React Table](https://react-table.js.org))
- [x] Реализовать фильтр по названию товара, min/max цене (price).
- [x] Картинки выводить ограниченными по высоте, не более 160px.
## Дополнительно (в любой комбинации, по желанию):
- [x] Сделать отображение товаров порциями (постранично, по доскроллу, добавление по кнопке (любой вариант)) (Также сделано с помощью [React Table](https://react-table.js.org), можно ограничивать количество отображаемых товаров)
- [x] В фильтре по названию добавить проверку совпадения по полю id товара. В случае совпадения с одним из товаров - выводить вместо таблицы карточку с информацией и укрупненным изображением товара (max высота — 400px)
- [x] Сохранять состояние фильтров/сортировок между загрузками страницы.