import { ChangeEvent, FormEvent, useState } from "react"
import { useAppStore } from "../stores/useAppStore"

export default function Form() {
    const {categories, searchRecipes,showNotification} = useAppStore()
    
    const [searchFilters, setSearchFilters] = useState({
        ingredient: '',
        category: ''
    })

    const handleChange = (e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLSelectElement>) => {
        setSearchFilters({
            ...searchFilters,
            [e.target.name] : e.target.value
        })
    }

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        if(Object.values(searchFilters).includes('')) {
            showNotification({
                text: "Todos los campos son obligatorios",
                error: true
            })
            return
        }

        // Consultar recetas
        searchRecipes(searchFilters)
    }

    return (
        <form 
            className="md:w-1/2 2xl:w-1/3 bg-orange-400 my-32 p-10 rounded-lg shadow space-y-6"
            onSubmit={handleSubmit}    
        >
            <div className="space-y-4">
                <label
                    htmlFor="ingredient"
                    className="block text-white uppercase font-extrabold text-lg"
                >Nombre</label>
                <input
                    id="ingredient"
                    type="text"
                    name="ingredient"
                    className="p-3 w-full rounded-lg focus:outline-none"
                    placeholder="Nombre o Ingrediente. Ej. Vodke, Tequila, Café"
                    onChange={handleChange}
                    value={searchFilters.ingredient}
                />
            </div>

            <div className="space-y-4">
                <label
                    htmlFor="category"
                    className="block text-white uppercase font-extrabold text-lg"
                >Categoria</label>
                <select
                    id="category"
                    name="category"
                    className="p-3 w-full rounded-lg focus:outline-none"
                    onChange={handleChange}
                    //value={searchFilters.category}
                >
                    <option value="">-- Selecciona --</option>
                    {categories.drinks.map( category => (
                        <option 
                            key={category.strCategory} 
                            value={category.strCategory}
                        >{category.strCategory}</option>
                    ))}
                </select>
            </div>

            <input
                type="submit"
                value="Buscar Recetas"
                className="cursor-pointer bg-orange-800 hover:bg-orange-900 text-white font-extrabold w-full p-2 rounded-lg uppercase"
            />
        </form>
    )
}