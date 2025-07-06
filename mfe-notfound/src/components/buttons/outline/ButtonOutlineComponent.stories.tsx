import type { Meta, StoryObj } from '@storybook/react';
import ButtonOutlineComponent from './index';

const meta: Meta<typeof ButtonOutlineComponent> = {
  title: 'HomeView/Buttons/ButtonOutlineComponent',
  component: ButtonOutlineComponent,
  tags: ['autodocs'],
  argTypes: {
    onClick: { action: 'clicked' },
    text: { control: 'text' },
  },
};

export default meta;

type Story = StoryObj<typeof ButtonOutlineComponent>;

export const Default: Story = {
  args: {
    text: 'Clique aqui',
  },
};
