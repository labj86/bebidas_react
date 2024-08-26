import { z } from "zod";
import { CategoriesAPIResponseSchema, Drink, RecipeAPIResponseSchema, SearchFilterSchema } from "../utils/recipes-schema";

export type Categories = z.infer<typeof CategoriesAPIResponseSchema>
export type SearchFilter = z.infer<typeof SearchFilterSchema>
export type Drink = z.infer<typeof Drink>
export type Recipe = z.infer<typeof RecipeAPIResponseSchema>

export type Notification = {
    text: string,
    error: boolean,
    show: boolean
}