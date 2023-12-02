import {render, screen } from "@testing-library/react";
import '@testing-library/jest-dom/extend-expect';
import Footer from '../Footer';

test('should contain text', () => {
    render(<Footer />);
    const p = screen.getByTestId('footer-text');
    expect(p).toBeInTheDocument();
    expect(p).toHaveTextContent('Scandiweb Test assignment');
});