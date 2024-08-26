import { StateCreator } from "zustand"
import { Recipe } from "../types"
import { createRecipesSlice, RecipesSliceType } from "./recipeSlice"
import { createNotificationSlice, NotificationSliceType } from "./notificationSlice"

export type FavoritesSliceType = {
    favorites: Recipe[],
    handleClickFavorite: (recipe: Recipe) => void,
    favoriteExists: (id: Recipe['idDrink']) => boolean
}

export const createFavoritesSlice: StateCreator<FavoritesSliceType & RecipesSliceType & NotificationSliceType, [], [], FavoritesSliceType> = (set,get,api) => ({
    favorites: JSON.parse(localStorage.getItem('favorites') || '[]') as Recipe[],
    handleClickFavorite: (recipe) => {
        if(get().favoriteExists(recipe.idDrink)){
            set({
                favorites: get().favorites.filter( favorite => favorite.idDrink != recipe.idDrink)
            })
            createNotificationSlice(set,get,api).showNotification({
                text: 'Se eliminó de favoritos',
                error: false
            })
        } else {
            set({
                favorites: [...get().favorites, recipe]
            })
            // set((state) => ({
            //     favorites: [...state.favorites, recipe]

            // }))
            createNotificationSlice(set,get,api).showNotification({
                text: 'Se agregó a favoritos',
                error: false
            })
        }
        createRecipesSlice(set,get,api).closeModal() // Slices anidados
        localStorage.setItem('favorites',JSON.stringify(get().favorites))
    },
    favoriteExists: (id) => {
        return get().favorites.some(favorite => favorite.idDrink === id)
    }
})