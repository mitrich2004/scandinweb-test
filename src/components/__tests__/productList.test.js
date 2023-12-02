import {render, screen } from "@testing-library/react";
import '@testing-library/jest-dom/extend-expect';
import ProductList from '../ProductList';

test('should contain products', () => {
    const products = [{id: 1}, {id: 2}];
    render(<ProductList products={products}/>);
    const firstProduct = screen.getByTestId('1');
    expect(firstProduct).toBeInTheDocument();
    const secondProduct = screen.getByTestId('2');
    expect(secondProduct).toBeInTheDocument();
});