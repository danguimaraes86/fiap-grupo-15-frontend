import type { Meta, StoryObj } from '@storybook/react';
import Header from '.';

const meta: Meta<typeof Header> = {
  title: 'HomeView/Header',
  component: Header,
  tags: ['autodocs'],
};

export default meta;

type Story = StoryObj<typeof Header>;

export const Default: Story = {
  args: {},
};
