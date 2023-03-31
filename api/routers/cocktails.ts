import express from "express";
import {CocktailWithId} from "../types";
import User from "../models/User";
import Cocktail from "../models/Cocktail";
import mongoose, {HydratedDocument} from "mongoose";
import auth, {RequestWithUser} from "../middleware/auth";
import {imagesUpload} from "../multer";
import permit from "../middleware/permit";

const cocktailsRouter = express.Router();

cocktailsRouter.get('/', async (req, res, next) => {
    try {
        let cocktails: CocktailWithId[] | null = null;
        const token = req.get('Authorization');
        const user = await User.findOne({token});

        if (req.query.user) {
            cocktails = await Cocktail.find({user: req.query.user});
        } else {
            cocktails = await Cocktail.find({isPublished: true});

            if (user && user.role === 'admin') {
                cocktails = await Cocktail.find();
            }
        }
        return res.send(cocktails);
    } catch (e) {
        return next(e);
    }
});

cocktailsRouter.post('/', auth, imagesUpload.single('image'), async (req, res, next) => {
    try {
        const user = (req as RequestWithUser).user;

        const cocktail = await Cocktail.create({
            user: user._id,
            title: req.body.title,
            recipe: req.body.recipe,
            image: req.file && req.file.filename,
            isPublished: false,
            ingredients: JSON.parse(req.body.ingredients)
        });

        return res.send(cocktail);
    } catch (e) {
        if (e instanceof mongoose.Error.ValidationError) {
            return res.status(400).send(e);
        } else {
            return next(e)
        }
    }
});

cocktailsRouter.get('/:id', async (req, res, next) => {
    try {
        const cocktail = await Cocktail.findById(req.params.id);

        if (!cocktail) {
            return res.status(404).send({message: 'Not found'});
        }

        return res.send(cocktail);
    } catch (e) {
        next(e);
    }
});

cocktailsRouter.delete('/:id', auth, async (req, res, next) => {
    try {
        const user = (req as RequestWithUser).user;

        const cocktail: CocktailWithId | null = await Cocktail.findById(req.params.id);

        if (!cocktail) {
            return res.status(404).send({message: 'Not found cocktail!'});
        }

        if (user.role === 'admin') {
            await Cocktail.deleteOne({_id: req.params.id});
            return res.send({message: 'Deleted cocktail!'});
        }

        return res.send({message: 'You cannot delete!'});
    } catch (e) {
        next(e);
    }
});

cocktailsRouter.patch('/:id/togglePublished', auth, permit('admin'), async (req, res, next) => {
    try {
        const cocktail: HydratedDocument<CocktailWithId> | null = await Cocktail.findById(req.params.id);

        let msg = 'Unpublished!';

        if (!cocktail) {
            return res.sendStatus(404);
        }

        cocktail.isPublished = !cocktail.isPublished;
        if (cocktail.isPublished) msg = 'Published';

        await cocktail.save();
        return res.send({message: msg});
    } catch (e) {
        return next(e);
    }
});

export default cocktailsRouter;