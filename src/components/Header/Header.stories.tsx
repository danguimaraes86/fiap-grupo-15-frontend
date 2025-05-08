import type { Meta, StoryObj } from '@storybook/react';
import { Header } from '@components';

const meta: Meta<typeof Header> = {
  title: 'Components/Header',
  component: Header,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: 'Este componente representa o cabeçalho da aplicação, exibindo o nome do usuário e uma imagem.',
      },
    },
  },
};

export default meta;

type Story = StoryObj<typeof Header>;

export const Padrao: Story = {};
