# Online-Lite-Store

Training project.

Front: SSR-Nuxt, Content + Vuetify

BackAPI: NestJS, based on https://github.com/andrew2020wit/online-store

## All functions

1. Static goods-list & goods-pages, text-description, images, priority, price, category
2. Dynamic home-page with search & filter, infinite-scroll, bootstrap-like grid
3. Cart & order, send order, orders list
4. User-Authorization (jwt), create/edit
5. Admin-function: UserList, disactivate user, switch user role (manager/user)
6. Init md-generator for goods-page (nuxt-content), nestjs.

## NuxtContent, static text info

1. Goods description, as markdown-file
2. Goods categories, within markdown-file
3. Goods priority (for sorting), within markdown-file

## NuxtJS: SSR

1. Generate static page "AllGoods" (link from HomePage), for SEO, static goods-card-pages
2. Images-Content, static files.

## VueJS

1. Dynamic HomePage (main part), infinity-scroll, goods-search, categories-switcher.
2. shop-cart/order widgets

## NestJS-API server

1. Authentication, User-Service
2. Order-service
3. Init markdown-file generator for NuxtContent

_Author_: https://github.com/andrew2020wit

## License

It is MIT licensed.
