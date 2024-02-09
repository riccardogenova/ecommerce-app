/** @format */

import { AmazonApp } from './_app';

const app = new AmazonApp();

// @ts-ignore
window.app = app;

window.onload = () => {
  const node = document.getElementById('root');
  if (!!node) node.innerHTML = `<h1>Welcome ${app.name}</h1>`;
  else throw new Error('Node not found');
};
