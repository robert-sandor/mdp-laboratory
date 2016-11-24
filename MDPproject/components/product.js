export default class Product {
    static products;

    constructor(id, name, price, description) {
        this.id = id;
        this.name = name;
        this.price = price;
        this.description = description;

        if (Product.products === undefined) {
            Product.products = [];
        }

        Product.products.push(this);
    }
}