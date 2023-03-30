import mongoose from 'mongoose';
import crypto from "crypto";
import config from './config';
import User from "./models/User";
import Cocktail from "./models/Cocktail";

const run = async () => {
    mongoose.set('strictQuery', false);
    await mongoose.connect(config.db);
    const db = mongoose.connection;
    try {
        await db.dropCollection('cocktails');
        await db.dropCollection('users');
    } catch (e) {
        console.log('Collections were not present, skipping drop...');
    }
    const [user, admin] = await User.create({
        email: 'user@gmail.com',
        password: '1',
        role: 'user',
        avatar: "fixtures/messi.jpg",
        displayName: 'UserBro',
        token: crypto.randomUUID(),
    }, {
        email: 'admin@gmail.com',
        password: '1',
        role: 'admin',
        avatar: "fixtures/girl.jpg",
        displayName: 'AdminSister',
        token: crypto.randomUUID()
    });

    const [MOJITO, MARTINI, NEGRONI, BRAMBLE] = await Cocktail.create({
        user: user,
        title: 'Mojito',
        image: "fixtures/Mojito.jpg",
        recipe: 'Add the white rum to a highball glass. Add 8 – 10 mint leaves and sugar syrup and lime juice.Muddle with bar spoon. Add crushed ice and a splash of soda. Mix drink down with bar spoon. Taste. Top up with more crushed ice. Slap 2 mint sprigs to release essence and put into drink. Add small splash of soda and straw.',
        isPublished: true,
        ingredients: [{
            title: 'White Rum',
            amount: '50 ml'
        }, {
            title: 'Mint',
            amount: '8 leaves'
        }, {
            title: 'Sugar Syrup',
            amount: '12 1/2 ml'
        }, {
            title: 'Lime Juice',
            amount: '25 ml'
        }
        ]
    }, {
        user: user,
        title: 'Martini',
        image: "fixtures/Martini.jpg",
        recipe: 'Chill martini glass with soda water and ice. Fill mixing glass to top with ice. Add the dry vermouth to the mixing glass, giving a small stir to coat the ice with the vermouth. Drain out glass, leaving just the coating on the ice. Add the gin to the mixing glass. Stir for 15 seconds, always making sure that the glass is full to the brim with ice. Taste. Fine strain into chilled martini glass. Zest with lemon peel and add twist unto drink.',
        isPublished: false,
        ingredients: [{
            title: 'Gin',
            amount: '50 ml'
        }, {
            title: ' Dry Vermouth',
            amount: '10 ml'
        }, {
            title: 'Lemon twist',
            amount: '1 or 2'
        }]
    }, {
        user: admin,
        title: 'Negroni',
        image: 'fixtures/Negroni.jpg',
        recipe: 'Chill rocks glass with ice and soda water.Fill mixing tin to rim with ice and add in all ingredients. Stir with bar spoon for 20 seconds. Taste. Add fresh ice to rocks glass and strain the drink into glass. Zest glass with orange peel, twist and place in drink.',
        isPublished: true,
        ingredients: [{
            title: 'Gin',
            amount: '25 ml'
        }, {
            title: 'Sweet Red Vermouth',
            amount: '25 ml'
        }, {
            title: 'Campari',
            amount: '25 ml'
        }, {
            title: 'Orange Peel',
            amount: '1 tea spoon'
        }]
    }, {
        user: admin,
        title: 'Bramble',
        image: 'fixtures/Bramble.jpg',
        recipe: 'Add all ingredients (except creme de mure) into mixing glass. Fill  mixing glass with cubed ice and fill rocks glass with crushed ice. Shake for 10 seconds. Strain mixture into glass and top up with crushed ice. Pour creme de mure over drink using bar spoon. Garnish with 2 lemon slices and blackberry.',
        isPublished: false,
        ingredients: [{
            title: 'Gin',
            amount: '50 ml'
        }, {
            title: 'Crème de Mure',
            amount: '10 ml'
        }, {
            title: 'Lemon Juice',
            amount: '25 ml'
        }, {
            title: 'Sugar Syrup',
            amount: '12 1/2 ml'
        }, {
            title: 'Blackberry',
            amount: '6 or 7'
        }]
    });

    await db.close();
};
void run();