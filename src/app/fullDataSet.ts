export class Alledata {
    categories: Category[];
}

export class Category {
    category : string;
    subcategories : Subcategories[];
}

export class Subcategories {
    name: string;
    items: Item[];
}

export class Item {
    name: string;
    description: string;
    price: string;
    imagelink: string;
    rating: number;
    stock: number;
    category: string;
    subcategory: string;
}