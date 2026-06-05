
// the Car class acts as a bluprint for creating objects
class Car {
    // Properties that each Car object will have
    #brand;
    #model;
    speed;
    isTrunkOpen;

    //Constructor is called automatically when a new Car is created
    // it receives an objectc containing the car´s details
    constructor(carDetails) {
        //Assign the provided values to the current obbject instance
        this.#brand = carDetails.brand;
        this.#model = carDetails.model;
        this.speed = carDetails.speed;
        this.isTrunkOpen = carDetails.isTrunkOpen;
        
    }

    // Instance method that displays the car´s brand and model
      // Instance method that displays the car´s brand and model
    displayInfo() {
    console.log(`${this.#brand}, ${this.#model}, ${this.speed} km/h 
        ${this.isTrunkOpen}`
    );

    }

    go() {
       if(this.isTrunkOpen) {
        console.log('car can not move because the trunk is open');
        return;
       }

       this.speed += 5;

       if(this.speed > 200) {
         this.speed = 200;
       }
    };

    brake() {
        this.speed -= 5;
        if (this.speed < 0) {
            this.speed = 0;
        }
    };

    openTrunk() {
       if(this.speed > 0) {
        console.log('trunk cant be opened because car is moving');
        return;
       }

       this.isTrunkOpen = true;
       console.log('trunk opened');
    };

     closeTrunk() {
        this.isTrunkOpen = false;
        console.log('trunk closed');
    }

}
// subclass
class RaceCar extends Car {
    acceleration;
    constructor(carDetails){
        super(carDetails)
       
        this.acceleration = carDetails.acceleration;
    }
    go(){
       this.#speed += this.acceleration;
       if (this.#speed >300) {
            this.#speed = 300;
       } 
    }
    openTrunk(){
        console.log('this car is a race car and does not have a trunk');
    }
    closeTrunk(){
        console.log('this car is a race car and does not have a trunk');
    }

}


// Create the first Car object and pass its properties to the constructor
const car1 = new Car({
    brand: 'Toyota',
    model: 'Corolla',
    speed: '200',
    isTrunkOpen: true
   
});
// Create the second Car object and pass its properties to the constructor
const car2 = new Car({
    brand: 'Tesla',
    model: 'Model 3',
    speed: '150',
    isTrunkOpen: false
});

const car3 = new RaceCar({
    brand: 'McLaren',
    model: 'F1',
    speed: 200,
    isTrunkOpen: true,
    acceleration: 20
})


// Call the displayInfo methodon each object

car1.displayInfo();
car3.displayInfo();
car3.go();
car3.displayInfo();
car3.openTrunk();
/*
car1.displayInfo();
car1.brake();
car1.brake();
car1.brake();
car1.brake();
car1.displayInfo();

car1.openTrunk();
*/
