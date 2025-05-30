import type { Meta, StoryObj } from '@storybook/react';
import HeroTextComponent from '.';

const meta: Meta<typeof HeroTextComponent> = {
  title: 'HomeView/HeroText',
  component: HeroTextComponent,
  tags: ['autodocs'],
};

export default meta;

type Story = StoryObj<typeof HeroTextComponent>;

export const Default: Story = {
  args: {
    text: 'Experimente mais liberdade no controle da sua vida financeira. Crie sua conta com a gente!',
  },
};
