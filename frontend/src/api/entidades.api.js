import axios from "axios";
import Cookies from "js-cookie";

const BACKEND_URL_API = process.env.REACT_APP_BACKEND_URL_API;
const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;

export const getLibro = async (id) => {
  try {
    return await axios.get(`${BACKEND_URL_API}/libros/${id}/`);
  } catch (error) {
    console.error('Error al obtener el libro: ', error);
    throw error;
  };
};

export const getAllLibros = async () => {
  try {
    return await axios.get(`${BACKEND_URL_API}/libros/`)
  } catch (error){
    console.error('Error al obtener los libro: ', error);
    throw error;
  };
};

export const getAllLibrosByCategory = async (categoria) => {
  try {
    return await axios.get(`${BACKEND_URL_API}/libros/`, {
      params: {
        categoria: categoria,
      },
    })
  } catch (error) {
    console.error('Error al obtener los libro: ', error);
    throw error;
  }
}

export const getAllLibrosByTitle = async (titulo) => {
  try {
    return await axios.get(`${BACKEND_URL_API}/librosByTitulo/`, {
      params: {
        titulo: titulo,
      },
    })
  } catch (error) {
    console.error('Error al obtener los libro: ', error);
    throw error;
  }
}

export const getAllCategory = async () => {
  try {
    return await axios.get(`${BACKEND_URL_API}/categorias/`)
  } catch (error) {
    console.error('Error al obtener las categorias: ', error);
    throw error;
  }
}

export const getCarritoByIdProducto = async (producto_id, usuario_id) => {
  try {
    return await axios.get(`${BACKEND_URL_API}/carrito/`, {
      params: {
        producto_id: producto_id,
        usuario_id: usuario_id,
      },
    })
  } catch (error) {
    console.error('Error al obtener un producto del carrito: ' , error)
    throw error;
  }
}

export const getAllCarrito = async (id) => {
  try {
    return await axios.get(`${BACKEND_URL_API}/carrito-usuario/`, {
      params: {
        usuario: id,
      },
    })
  } catch (error) {
    console.error('Error al obtener todos los productos del carrito: ', error)
    throw error;
  }
}

export const deleteProductCarrito = async (id) => {
  try {
    await axios.delete(`${BACKEND_URL_API}/carrito/${id}/`)
  } catch (error) {
    console.error('Error al eliminar un producto del carrito: ', error)
    throw error;
  }
}

export const deleteAllCarrito = async (id) => {
  try {
    await axios.delete(`${BACKEND_URL_API}/carrito/`, {
      params: {
        usuario_id: id,
      }
    })
  } catch (error) {
    console.error('Error al eliminar todos los productos del carrito: ', error)
    throw error;
  }
}

export const createProductCarrito = async (product) => {
  try {
    await axios.post(`${BACKEND_URL_API}/carrito/`, product)
  } catch (error) {
    console.error('Error al crear un producto al carrito: ', error)
    throw error;
  }
}

export const updateCarrito = async (id, product) => {
  try {
    await axios.put(`${BACKEND_URL_API}/carrito/${id}/`, product)
  } catch (error) {
    console.error('Error al actualizar un producto del carrito: ', error)
    throw error;
  }
}

export const postLogin = async (cliente) => {
  try {
    const res = await axios.post(`${BACKEND_URL_API}/login/`, cliente)
    if (res.data.success === true){
      const {token} = res.data
      const {usuario} = res.data
      Cookies.set(`accessToken`, token, { secure: true, sameSite: `strict` });
      Cookies.set(`idUsuario`, usuario, { secure: true, sameSite: `strict` });
      if (res.data.is_superuser === true) {
        window.location.href = `${BACKEND_URL}`;
      } else {
        window.location.href = `https://bibliotecamagica.onrender.com/`;
      }
    } 
    return res
  } catch (error) {
    console.error('Error al autenticar usuario: ', error)
    throw error;
  }
}

export const postRegister = async (cliente) => {
  try {
    return await axios.post(`${BACKEND_URL_API}/register/`, cliente)
  } catch (error) {
    console.error('Error al registrar usuario: ', error)
    throw error;
  }
}

export const getUsuario = async (id) => {
  try {
    const res = await axios.get(`${BACKEND_URL_API}/login/${id}/`)
    const data = {
      'email': res.data.email,
      'is_superuser': res.data.is_superuser,
    }
    return data
  } catch (error) {
    console.error('Error al obtener usuario: ', error)
    throw error;
  }
}

export const deleteToken = async (id) => {
  try {
    await axios.delete(`${BACKEND_URL_API}/logout/`, {
      params: {
        user: id,
      },
    })
  } catch (error) {
    console.error('Error al eliminar token: ', error)
    throw error;
  }
}