# interactive-ch2-sol

[Edit on StackBlitz ⚡️](https://stackblitz.com/edit/interactive-ch-sol-ieb6b2)

this is an interactive challenge that tests the basic knowledge of Angular application

## goal

The goal of this challenge is to make an API call and show a list of products, and each products's availability to the user.

The application comes equipped with an in memory web api.

## Challenge

1. Create a function (1) that makes a HTTP GET call to endpoint 'api/products'.
2. Create a function (2) that makes an HTTP GET call to endpoint 'api/publishers'.
3. Create a function (3) that performs HTTP GET calls (1) and (2) in parallel.
4. Function (3) should return a Product objects array Observable that combines the results of the api calls.
5. The new objects should have a new property “available” determined based on result of (1) and the inStock property.
6. New objects should have a new property “publisherInfo”.This new property is a Partial of type publisherInfo. the new property is determined by matching the ids Observable (1) and Observable (2). The new property should have all the properties of publisherInfo except for "id".
7. Show the products returned from (4) in product-list components and display them in the template.

8. Display a green checkmark icon (primeng icon class: pi pi-check-circle ) if the product is available and a red x icon (primeng icon class pi pi-times-circle) if the product is not available.

## Challenge Pt 2
1. Create a function that makes an HTTP Get call to 'api/products' then uses the result to call a function that takes an string array of id as a parameter and logs those to the console then performs an HTTP GET call to endpoint 'api/publishers'.
2. Repeat steps 4-8. 
