import React from 'react'
import { ReactDOM } from 'react-dom';
import { render, screen } from '@testing-library/react';
import App from './App';

test('renders learn react link', () => {
  render(<App />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});

test('みやだいもうくん exist in innerHTML', () => {
  render(<App />);
  const div = screen.getByText('みやだいもうくん');
  expect(div).toBeInTheDocument();
})


