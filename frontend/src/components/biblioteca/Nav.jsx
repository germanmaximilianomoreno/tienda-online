import { getAllCategory } from '../../api/entidades.api';
import { useState, useEffect } from "react"


function Nav({ categoriaSeleccionada }) {

    const [categorias, setCategorias] = useState([]);

    const [selectedCategory, setSelectedCategory] = useState("Todo")

    const handleCategory = (category) => {
        setSelectedCategory(category)
        categoriaSeleccionada(category)
    }

    useEffect(() => {
        try {
            async function loadCategories() {
                const res = await getAllCategory()
                setCategorias(res.data)
            }
            loadCategories()
        } catch (e) {
            console.error('Error al obtener los datos:', e);
        }

    }, [])
    return (
        <nav className="flex text-center gap-4 overflow-x-auto mx-4 p-4">
            <button className={`py2 font-bold ${selectedCategory === "Todo" ? "border-b-4 rounded-md border-color-principal  text-color-principal}" : ""}`}
                onClick={() => handleCategory("Todo")}>Todo</button>
            {categorias.map((categoria) => {
                return (
                    <button key={categoria.id} className={`py2 font-bold ${selectedCategory === categoria.id ? "border-b-4 rounded-md border-color-principal  text-color-principal}" : ""}`}
                        onClick={() => handleCategory(categoria.id)}>{categoria.nombre}</button>
                )

            })}
        </nav>
    )
}

export default Nav