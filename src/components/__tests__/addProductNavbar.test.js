import {render, screen, cleanup } from "@testing-library/react";
import '@testing-library/jest-dom/extend-expect';
import AddProductNavbar from "../AddProductNavbar";
import { BrowserRouter as Router } from 'react-router-dom';

afterEach(() => {
    cleanup();
})

test('should contain text', () => {
    render(<Router><AddProductNavbar /></Router>);
    const h1 = screen.getByTestId('header-text');
    expect(h1).toBeInTheDocument();
    expect(h1).toHaveTextContent('Product Add');
});

test('should contain add button', () => {
    render(<Router><AddProductNavbar /></Router>);
    const saveButton = screen.getByTestId('save-button');
    expect(saveButton).toBeInTheDocument();
    expect(saveButton).toHaveTextContent('Save');
})

test('should contain delete button', () => {
    render(<Router><AddProductNavbar /></Router>);
    const cancelButton = screen.getByTestId('cancel-button');
    expect(cancelButton).toBeInTheDocument();
    expect(cancelButton).toHaveTextContent('Cancel');
})