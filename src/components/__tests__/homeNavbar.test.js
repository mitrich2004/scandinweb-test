import {render, screen, cleanup } from "@testing-library/react";
import '@testing-library/jest-dom/extend-expect';
import HomeNavbar from "../HomeNavbar";
import { BrowserRouter as Router } from 'react-router-dom';

afterEach(() => {
    cleanup();
})

test('should contain text', () => {
    render(<Router><HomeNavbar /></Router>);
    const h1 = screen.getByTestId('header-text');
    expect(h1).toBeInTheDocument();
    expect(h1).toHaveTextContent('Product List');
});

test('should contain add button', () => {
    render(<Router><HomeNavbar /></Router>);
    const addButton = screen.getByTestId('add-button');
    expect(addButton).toBeInTheDocument();
    expect(addButton).toHaveTextContent('ADD');
})

test('should contain delete button', () => {
    render(<Router><HomeNavbar /></Router>);
    const deleteButton = screen.getByTestId('delete-button');
    expect(deleteButton).toBeInTheDocument();
    expect(deleteButton).toHaveTextContent('MASS DELETE');
})