import {cleanup, render, screen } from "@testing-library/react";
import '@testing-library/jest-dom/extend-expect';
import Product from '../Product';

afterEach(() => {
    cleanup();
})

test('dvd should contain all details', () => {
    const dvd = {id: 1, sku: 'TST12345', name: 'DVD', price: 10, size: 100};
    render(<Product product={dvd}/>);
    const productDiv = screen.getByTestId('1');
    expect(productDiv).toBeInTheDocument();

    const checkBox = screen.getByTestId('product-checkbox');
    const sku = screen.getByTestId('sku-text');
    const name = screen.getByTestId('name-text');
    const price = screen.getByTestId('price-text');
    const size = screen.getByTestId('size-text');

    expect(checkBox).toBeInTheDocument();
    expect(sku).toHaveTextContent('TST12345');
    expect(name).toHaveTextContent('DVD');
    expect(price).toHaveTextContent('10$');
    expect(size).toHaveTextContent('100MB');
})

test('book should contain all details', () => {
    const book = {id: 1, sku: 'TST12345', name: 'Book', price: 10, weight: 100};
    render(<Product product={book}/>);
    const productDiv = screen.getByTestId('1');
    expect(productDiv).toBeInTheDocument();
    
    const checkBox = screen.getByTestId('product-checkbox');
    const sku = screen.getByTestId('sku-text');
    const name = screen.getByTestId('name-text');
    const price = screen.getByTestId('price-text');
    const weight = screen.getByTestId('weight-text');

    expect(checkBox).toBeInTheDocument();
    expect(sku).toHaveTextContent('TST12345');
    expect(name).toHaveTextContent('Book');
    expect(price).toHaveTextContent('10$');
    expect(weight).toHaveTextContent('100KG');
})

test('furniture should contain all details', () => {
    const furniture = {id: 1, sku: 'TST12345', name: 'Furniture', price: 10, height: 100, width: 200, length: 300};
    render(<Product product={furniture}/>);
    const productDiv = screen.getByTestId('1');
    expect(productDiv).toBeInTheDocument();

    const checkBox = screen.getByTestId('product-checkbox');
    const sku = screen.getByTestId('sku-text');
    const name = screen.getByTestId('name-text');
    const price = screen.getByTestId('price-text');
    const dimensions = screen.getByTestId('dimensions-text');

    expect(checkBox).toBeInTheDocument();
    expect(sku).toHaveTextContent('TST12345');
    expect(name).toHaveTextContent('Furniture');
    expect(price).toHaveTextContent('10$');
    expect(dimensions).toHaveTextContent('100x200x300');
})
