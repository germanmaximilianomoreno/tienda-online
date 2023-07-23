import { render, screen, fireEvent  } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Navbar from './NavBar';
import { MemoryRouter } from 'react-router-dom';
import '@testing-library/jest-dom/extend-expect';

describe("<Navbar/>", () => {
    test("Renderiza el componente Navbar correctamente", () => {
        render(
            <MemoryRouter initialEntries={['/']}>
                <Navbar />
            </MemoryRouter>);
    })

    test('Navega correctamente a la página de Tienda', () => {
        render(
            <BrowserRouter>
                <Navbar />
            </BrowserRouter>
        );

        // Simula hacer clic en el enlace de Carrito
        fireEvent.click(screen.getByText('Carrito'));

        // Verificar que el enlace de Carrito esté presente y sea clicleable
        const linkCarrito = screen.getByText('Carrito');
        expect(linkCarrito).toBeInTheDocument();
        expect(linkCarrito).toBeEnabled();

        // Hacer clic en el enlace de Tienda
        fireEvent.click(linkCarrito);

        // Verificar que la URL haya cambiado a "/Carrito"
        expect(window.location.pathname).toBe('/Carrito');
    });

      
})