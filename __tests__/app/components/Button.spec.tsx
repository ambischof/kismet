import {act} from 'react'
import ReactDOMClient from 'react-dom/client';
import Button from '../../../src/app/vanilla/Button';

describe('button', ()=> {
  let container: HTMLDivElement;
  beforeEach(()=>{
    container = document.createElement('div');
    document.body.appendChild(container);
  })
  it ('should do basic render with children', async () => {
    await act(async () => {
      ReactDOMClient.createRoot(container).render(<Button>hi</Button>)
    });
    expect(container.querySelector('button').outerHTML)
      .toBe('<button class="gbtn" type="button">hi</button>');
  });
  
  it('should do basic render with text', async () => {
    await act(async () => {
      ReactDOMClient.createRoot(container).render(<Button text="hi"></Button>)
    });
    expect(container.querySelector('button').outerHTML)
      .toBe('<button class="gbtn" type="button">hi</button>');
  });
  it('should fill in default attrs', async () => {
    await act(async () => {
      ReactDOMClient.createRoot(container).render(<Button text="hi"></Button>)
    });
    let element =container.querySelector('button');
    expect(element.attributes.hasOwnProperty('type')).toBe(true);
    expect(element.getAttribute('type')).toBe('button');
  });
})
