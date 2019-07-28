import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { Category } from '../models/category';
import { SUBCATEGORIES } from '../models/subcategories';
import { CategoryApiService } from '../services/category-api.service';



@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})

export class HomeComponent implements OnInit , OnDestroy {

    categoriesListSubs: Subscription;
    categoriesList: Category[];
    subcategories = SUBCATEGORIES;
    searchTerms = [];
    selection: string

    options = ['Toys & Games', 'Learning & Education', 'Flash Cards', 'Dress Up & Pretend Play', 'Pretend Play', 'Magnet & Felt Playboards', 'Early Development Toys', 'Shapes & Colors', 'Basic & Life Skills Toys', 'Games', 'Board Games', 'Game Accessories', 'Puzzles', 'Floor Puzzles', 'Party Supplies', 'Party Games & Crafts', 'Card Games', 'Dice & Gaming Dice', 'Toy Remote Control & Play Vehicles', 'Play Vehicles', 'Novelty & Gag Toys', 'Mathematics & Counting', 'Trading Card Games', 'Decks & Sets', 'Reading & Writing', 'Diaries', 'Journals & Notebooks', 'Game Room Games', 'Mini Table Games', 'Grown-Up Toys', 'Science', 'Arts & Crafts', 'Stickers', 'Physics', 'Biology', 'DVD Games', 'Drawing & Painting Supplies', 'Drawing & Sketch Pads', 'Hobbies', 'RC Vehicles & Parts', 'RC Vehicles', 'RC Aircraft', 'RC Helicopters', 'Building Toys', 'Stacking Blocks', 'Gear Sets', 'Brain Teasers', 'Maze & Sequential Puzzles', 'Easels', 'Tricycles', 'Scooters & Wagons', 'Ride-On Toys', 'Baby & Toddler Toys', 'Spinning Tops', 'Music & Sound', 'Musical Instruments', 'Pianos & Keyboards', 'Bath Toys', 'Push & Pull Toys', 'Play Trains & Railway Sets', 'Train Sets', 'Guitars & Strings', 'Sorting & Stacking', 'Pegged Puzzles', 'Sports & Outdoor Play', 'Play Tents & Tunnels', 'Play Sets & Playground Equipment', 'Building Sets', 'Craft Kits', 'Sewing', 'Action Figures & Statues', 'Action Figures', 'Marble Runs', 'Activity Centers', 'Playsets & Vehicles', 'Playsets', 'Game Collections', 'Handheld Games', 'Marble Games', 'Wind-up Toys', 'Sports', 'Golf', 'Golf Clubs', 'Hammering & Pounding Toys', 'Drawing & Sketching Tablets', 'Toy Sports', 'Colored Pencils', 'Toy Basketball', 'Activity Play Centers', 'Jigsaw Puzzles', 'Train Cars', 'Accessories', 'Train Tracks', 'Vehicle Playsets', 'Stuffed Animals & Plush', 'Puppets', 'Hand Puppets', 'Blasters & Foam Play', 'Wind & Brass', 'Dolls & Accessories', 'Dollhouse Accessories', 'Furniture', 'Freestanding Climbers', 'Play Set Attachments', 'Swings', 'Tie-Dye & Fashion', 'Electronics for Kids', 'Video Games', 'More Systems', 'Nintendo 64', 'Hardware', 'Consoles', 'Pools & Water Fun', 'Pool Rafts & Inflatable Ride-ons', 'Kiddie Pools', 'Toy RC Vehicles & Batteries', 'Toy RC Vehicles', 'Kitchen Toys', 'Dishes & Tea Sets', 'Systems & Accessories', 'Electronic Systems', 'Inflatable Bouncers', 'Sandboxes & Accessories', 'Pogo Sticks & Hoppers', 'Money & Banking', 'Kitchen Playsets', 'Flying Toys', 'Toy Parachute Figures', 'Dolls', 'Paints', 'Crib Toys & Attachments', 'Coloring Pens & Markers', 'Play Food', 'Electronic Software & Books', 'Geography', 'Magnetic Letters & Words', 'Real-Food Appliances', 'Housekeeping', 'Microscopes', 'Basketball', 'Basketballs', 'Balls', 'Electronic Toys', 'Die-Cast Vehicles', 'Stuffed Animals & Toys', 'Yo-yos', 'Snow Sports', 'Snow Sleds', 'Pool Loungers', 'Gardening Tools', 'Drums & Percussion', 'Construction Tools', 'Animals & Figures', 'Light-Up Toys', 'Indoor Bowling', 'Habitats', 'Grocery Shopping', 'Shopping Carts', 'Plug & Play Video Games', 'Water Guns', 'Blasters & Soakers', 'Ball Pits & Accessories', 'Dollhouses', 'Teeter Totters', 'Clay & Dough', 'Swimming Floatation Devices', 'Solar', 'Stacking Games', 'Chemistry', 'Doll Accessories', 'Printing & Stamping', 'Magic Kits & Accessories', 'Paper Craft', 'Darts', 'Toy Balls', 'Beach Toys', 'Medical Kits', 'Tile Games', 'Beads', 'Football', 'Boxing', 'Punching Bags', 'Toy Baseball', 'Freestanding Slides', 'Pool Toys', 'RC Figures & Robots', 'Pencil Erasers', 'Mosaics', 'Scrapbooking', 'Plush Puppets', 'Car Seat & Stroller Toys', 'Beauty & Fashion', 'Bracelets', 'Personal Video Players & Accessories', 'Playhouses', 'Bubbles', 'Paint-By-Number Kits', 'Music Players & Karaoke', 'Balloons', 'Teddy Bears', 'Novelty Games', 'Trains & Accessories', 'RC Vehicle Parts', 'Vehicle Bodies & Scale Accessories', 'Body Parts', 'Body Clips', 'Geology & Earth Sciences', 'Rock Tumblers', 'Cash Registers', 'Jewelry Music Boxes', 'Finger Puppets', 'Statues & Bobbleheads', 'Statues', 'Prisms & Kaleidoscopes', 'Rattles', 'Puppet Theaters', 'Karaoke Machines', 'Puzzle Boxes', 'Electronic Pets', 'Floor Games', 'Jewelry', 'Action & Toy Figures', 'Standard Playing Card Decks', 'Stacking & Nesting Toys', 'Blocks', 'Paper', 'Loose Drawing Paper', 'Strollers', 'Lawn Water Slides', 'Beach Balls', 'Assembly & Disentanglement Puzzles', 'Archaeology & Paleontology', 'Crayons', 'Cameras & Camcorders', 'Cooking & Baking Kits', 'Sprinklers', 'Electronic System Accessories', 'Gag Toys & Practical Jokes', 'Dive Rings & Toys', 'PlayStation 3', 'Banners', 'Streamers & Confetti', 'Streamers', 'Baseball & Softball', 'T-Ball', 'Magnets & Magnetic Toys', 'Clothing & Shoes', 'Power Plant & Driveline Systems', 'Transmissions & Differentials', 'Gears & Gearboxes', 'Gears', 'Party Favors', 'Chalk', 'Noisemakers', 'Paper & Magnetic Dolls', 'Finger Boards & Finger Bikes', 'Wood', 'Swim Rings', 'Kites & Wind Spinners', 'Kites', 'Paintbrushes', 'Beanbags & Foot Bags', 'Golf Balls', 'Puzzle Accessories', 'RC Watercraft', 'Soccer', 'Soccer Balls', 'Molding & Sculpting Sticks', 'Basketball & Volleyball Sets', 'Models & Model Kits', 'Model Kits', 'Cake Supplies', 'Sand Art', 'Necklaces', 'Vanity Cases', 'Baby Floats', 'Battling Tops', 'Vehicles', 'Vehicle Kits', 'Ground Vehicle Kits', 'Lots', '3-D Puzzles', 'Protective Gear', 'Lawn Games', 'Slumber Bags', 'Water Balloons', 'Tennis', 'Tennis Balls', 'Spy Gadgets', 'Money Banks', 'Temporary Tattoos', 'Toy Football', 'Bobbleheads', 'Balance Bikes', 'Pull Back Vehicles', 'Party Hats', 'Hobby Building Tools & Hardware', 'Hobby Building Hand Tools', 'Magnifying Tools', 'Glass Arts & Sun Catchers', 'Blackboards & Whiteboards', 'MP3 Players', 'Clothing', 'Shoes & Jewelry', 'Girls', 'Novelty', 'Costumes & More', 'Jewelry Accessories', 'Sony PSP', 'Play & Swing Sets', 'Single Cards', 'Toy Golf', 'Vehicle Propellers & Rotors', 'Rotors', 'Party Tableware', 'Napkins', 'Glue', 'Paste & Tape', 'Telescopes', 'Plush Backpacks & Purses', 'Dance Mats', 'Coin Collecting', 'Rings', 'Bean Bag Game Sets', 'Cups', 'Plush Pillows', 'Airplane Construction Kits', 'Makeup', 'Batteries & Chargers', 'Battery Chargers', 'Kids & Family', 'Xbox 360', 'Teaching Clocks', 'Walkie Talkies', 'Tablecovers & Centerpieces', 'Shaped Rubber Wristbands', 'Table Tennis', 'Travel Games', 'Air Hockey', 'Parts & Hardware', 'Electronic Basketball', 'Scratch Art', 'Wind Spinners', 'Sand & Water Tables', 'Boys', 'Costumes & Accessories', 'Hats & Caps', 'Aprons & Smocks', 'Sports & Outdoors', 'Team Sports', 'Baseball', 'Kickball & Playground Balls', 'Novelty Spinning Tops', 'Shape Sorters', 'Watches', 'Slime & Putty Toys', 'Miniatures', 'Viewfinders', 'Plates', 'Radios & Parts', 'Radio Transmitters', 'Nesting Dolls', 'Health & Personal Care', 'Stationery & Party Supplies', 'Decorations', 'Battery Packs & Chargers', 'Propellers', 'Bodies', 'Rotor Shafts & Drive Pulleys', 'Rotor Shafts', 'Albums', 'Cases & Sleeves', 'Vehicle Batteries', 'RC Ground Vehicles', 'RC Automobiles', 'RC Cars', 'Waterpainting Kits', 'Glider Attachments', 'Indoor Climbers & Play Structures', 'Slot Cars', 'Race Tracks & Accessories', 'Race Tracks', 'Onboard Cameras & Accessories', 'Pots & Pans', 'Buildings & Scenery', 'Party Packs', 'Nintendo 3DS', 'Interactive Gaming Figures', 'Wii', 'Wii U', 'Pinball', 'Purses', 'Aircraft Wings & Fuselages', 'Fuselages', 'PlayStation 4', 'Xbox One', 'Cases & Protectors', 'Nintendo DS'];


    optionSelected: any;

    onOptionsSelected(event){
     console.log(event); //option value will be sent as event
     this.selection = event
     console.log(this.selection);
    }

    constructor(private categoryApi: CategoryApiService) {
    }

    ngOnInit() {
      this.searchTerms.push("one")
      this.categoriesListSubs = this.categoryApi
        .getCategories()
        .subscribe(res => {
            this.categoriesList = res;
          },
          console.error
        );
    }

    ngOnDestroy() {
      this.categoriesListSubs.unsubscribe();
    }

}
