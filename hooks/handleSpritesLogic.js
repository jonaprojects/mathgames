import { getRandomNumber } from "@/auxiliaryMethods/auxiliaryMethods";
import spritesData from "@/data/sprites.json";

const sprites = spritesData.sprites;

export const NUM_OF_SPRITES = 22;

export function findSpriteFromID(spriteID){
    return sprites.find((sprite) => sprite.id == spriteID);
}

export function getRandomSprite(){
    const randomID = getRandomNumber(1, NUM_OF_SPRITES+1);
    const spriteObj = findSpriteFromID(randomID);
    return spriteObj;
}