import type { Meta, StoryObj } from '@storybook/react';
import ButtonRegularComponent from '.';

const meta: Meta<typeof ButtonRegularComponent> = {
  title: 'HomeView/Buttons/ButtonRegularComponent',
  component: ButtonRegularComponent,
  tags: ['autodocs'],
  argTypes: {
    onClick: { action: 'clicked' },
    text: { control: 'text' },
  },
};

export default meta;

type Story = StoryObj<typeof ButtonRegularComponent>;

export const Default: Story = {
  args: {
    text: 'Clique aqui',
  },
};
