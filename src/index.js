import React from 'react';
import { render } from 'react-dom';
import injectTapEventPlugin from 'react-tap-event-plugin';
import ClientApp from './ClientApp';

injectTapEventPlugin();

render(<ClientApp />, document.getElementById('root'));
