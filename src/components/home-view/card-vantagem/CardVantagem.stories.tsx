import type { Meta, StoryObj } from '@storybook/react';
import CardVantagemComponent from '.';

const meta: Meta<typeof CardVantagemComponent> = {
  title: 'HomeView/CardVantagem',
  component: CardVantagemComponent,
  tags: ['autodocs'],
};

export default meta;

type Story = StoryObj<typeof CardVantagemComponent>;

export const Default: Story = {
  args: {},
};
