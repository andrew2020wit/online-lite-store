# Online-Lite-Store

Front: SSR-Nuxt, Content + Vuetify

BackAPI: NestJS, based on https://github.com/andrew2020wit/online-store

## NuxtContent, static text info

1. Goods description, as markdown-file
2. Goods categories, within markdown-file
3. Goods priority (for sorting), within markdown-file
4. (todo) Articles, blog, news, review

## NuxtJS: SSR

1. Generate static page "AllGoods" (link from HomePage), for SEO, static goods-card-pages
2. Images-Content, static files.

## VueJS

1. Dynamic HomePage (main part), infinity-scroll, goods-search, categories-switcher.
2. shop-cart/order widgets

## NestJS-API server

1. Authentication, User-Service
2. (todo) Price-service (price, maxOrderCount)
3. (todo) Order-service, order-validation (price, goods-name validation)
4. Init markdown-file generator for NuxtContent

## Admin-function (todo)

1. UserList, Disactivate user. Change user role (manager)
1. price-editor

## External API, import-export ? (todo)

_Author_: andrew2020wit

_Licence_: Only for view, proprietary
