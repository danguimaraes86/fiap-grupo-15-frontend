import type { Meta, StoryObj } from '@storybook/react';
import { Nav } from '@components';

const meta: Meta<typeof Nav> = {
  title: 'Components/Nav',
  component: Nav,
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

type Story = StoryObj<typeof Nav>;

export const Padrao: Story = {};
