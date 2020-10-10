<img alt="GoStack" src="https://storage.googleapis.com/golden-wind/bootcamp-gostack/header-desafios-new.png" style="width: 100%;"/>

<h3 align="center">
  Challenge 09: Relationships with database on Node.js
</h3>

<blockquote align="center">“Change you and everything else will change naturally!”</blockquote>

<p align="center">
  <img alt="GitHub language count" src="https://img.shields.io/github/languages/count/rocketseat/bootcamp-gostack-desafios?color=%2304D361">

  <a href="https://rocketseat.com.br">
    <img alt="Made by Rocketseat" src="https://img.shields.io/badge/made%20by-Rocketseat-%2304D361">
  </a>

  <img alt="License" src="https://img.shields.io/badge/license-MIT-%2304D361">

  <a href="https://github.com/Rocketseat/bootcamp-gostack-desafios/stargazers">
    <img alt="Stargazers" src="https://img.shields.io/github/stars/rocketseat/bootcamp-gostack-desafios?style=social">
  </a>
</p>

## :rocket: About the challenge

In this challenge, you will be creating a new application to learn new things and train what you've learned so far on Node.js next to TypeScript, including the use of database with TypeORM, and ManyToMany relationships!

This will be an application that should allow the creation of customers, products and orders, where the customer can generate new purchase orders for certain products, such as a small e-commerce.

### Application requirements

- **POST /customers**: The route must receive `name` and `email` within the body of the request, the name being the name of the client to be registered. When registering a new customer, it must be stored within its database and the customer created must be returned. When registering in the database, in the customers table should have the fields `name`, `email`, `created_at`, `updated_at`.

- **POST /products**: This route must receive `name`, `price` and `quantity` within the body of the request, the name being the name of the product to be registered, price the unit value and quantity the existing quantity in stock of the product. With this data must be created in the database a new product with the following fields: `name`, `price`, `quantity`, `created_at`, `updated_at`.

- **POST /orders/**: In this route you should receive in the request body the `customer_id` and an array of `products`, containing the id and quantity you want to add to a new request. Here you must register in the order table a new order, which will be related to the informed `customer_id`, `created_at` and `updated_at` . In the `orders_products` table, you must store the `product_id`, `order_id`, `price` and `quantity`, `created_at` and `updated_at`.

```json
{
  "customer_id": "e26f0f2a-3ac5-4c21-bd22-671119adf4e9",
  "products": [
    {
      "id": "ce0516f3-63ae-4048-9a8a-8b6662281efe",
      "quantity": 5
    },
    {
      "id": "82612f2b-3f31-40c6-803d-c2a95ef35e7c",
      "quantity": 7
    }
  ]
}
```

- **GET /orders/:id**: This route must return the information of a specific order, with all the information that can be recovered through the relationships between the table `orders`, `customers` and `orders_products`.

```json
{
  "id": "5cbc4aa2-b3dc-43f9-b121-44c1e416fa92",
  "created_at": "2020-05-11T07:09:48.767Z",
  "updated_at": "2020-05-11T07:09:48.767Z",
  "customer": {
    "id": "e26f0f2a-3ac5-4c21-bd22-671119adf4e9",
    "name": "Rocketseat",
    "email": "oi@rocketseat.com.br",
    "created_at": "2020-05-11T06:20:28.729Z",
    "updated_at": "2020-05-11T06:20:28.729Z"
  },
  "order_products": [
    {
      "product_id": "ce0516f3-63ae-4048-9a8a-8b6662281efe",
      "price": "1400.00",
      "quantity": 5,
      "order_id": "5cbc4aa2-b3dc-43f9-b121-44c1e416fa92",
      "id": "265b6cbd-3ab9-421c-b358-c2e2b5b3b542",
      "created_at": "2020-05-11T07:09:48.767Z",
      "updated_at": "2020-05-11T07:09:48.767Z"
    },
    {
      "product_id": "82612f2b-3f31-40c6-803d-c2a95ef35e7c",
      "price": "500.00",
      "quantity": 7,
      "order_id": "5cbc4aa2-b3dc-43f9-b121-44c1e416fa92",
      "id": "ae37bcd6-7be7-47b9-b277-afee35aab4e4",
      "created_at": "2020-05-11T07:09:48.767Z",
      "updated_at": "2020-05-11T07:09:48.767Z"
    }
  ]
}
```

## Test Specification

Before running the tests, create a database named "gostack_desafio09_tests" so that all the tests can execute correctly

## :memo: Licence

This project is under license from MIT. See the archive [LICENSE](LICENSE) to more details.

---

Made with 💜 by Rocketseat :wave: [Join our community!](https://discordapp.com/invite/gCRAFhc)
