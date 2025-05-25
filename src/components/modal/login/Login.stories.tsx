import type { Meta, StoryObj } from '@storybook/react';
import Login from './index';

const meta: Meta<typeof Login> = {
  title: 'Modals/Login',
  component: Login,
  tags: ['autodocs'],
  argTypes: {
    setLogin: { action: 'fechar modal' },
  },
};

export default meta;

type Story = StoryObj<typeof Login>;

export const Default: Story = {
  args: {
    setLogin: () => {},
  },
};
