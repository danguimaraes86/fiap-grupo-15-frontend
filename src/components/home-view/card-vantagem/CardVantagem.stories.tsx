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
  args: {
    icon_src: '/icons/gift.png',
    alt_text: 'ícone de presente',
    title: 'Conta e cartão gratuitos',
    description:
      'Isso mesmo, nossa conta é digital, sem custo fixo e mais que isso: sem tarifa de manutenção.',
  },
};
