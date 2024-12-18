export class RecipeModal {
    name ?:string
    ingredients?:Array<string>
    instructions?:Array<string>
    prepTimeMinutes?:number
    cookTimeMinutes?:number
    servings?:number
    difficulty?:string
    cuisine?:string
    caloriesPerServing?:number
    image?:string
    mealType?:Array<string>
}