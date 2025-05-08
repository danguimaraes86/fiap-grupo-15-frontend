import type { Preview } from '@storybook/react'

import 'bootstrap/dist/css/bootstrap.min.css'; // se estiver usando Bootstrap

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
       color: /(background|color)$/i,
       date: /Date$/i,
      },
    },
  },
};

export default preview;