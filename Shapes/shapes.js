
class Shapes {
    constructor (color) {
        this.color = color;
    }

    getArea() {
        
    }
}

class Rectangle extends Shapes {
    constructor (color, height, width) {
        super(color);
        this.height = height;
        this.width = width;
    }

    getArea() {
        return this.height * this.width;
    }
}

class Triangle extends Shapes {
    constructor (color, height, base) {
        super(color);
        this.height = height;
        this.base = base;
    }

    getArea() {
        return this.height * this.base / 2;
    }
}

class Circle extends Shapes {
    constructor (color, radius) {
        super(color);
        this.radius = radius;
    }

    getArea() {
        return 2 * Math.PI * this.radius;
    }
}

let shape1 = new Rectangle("red", 4, 8);
console.log("This " + shape1.color + " " + shape1.constructor.name + " has an area of " + shape1.getArea());

let shape2 = new Triangle("green", 4, 8);
console.log("This " + shape2.color + " " + shape2.constructor.name + " has an area of " + shape2.getArea());

let shape3 = new Circle("black", 4);
console.log("This " + shape3.color + " " + shape3.constructor.name + " has an area of " + shape3.getArea());