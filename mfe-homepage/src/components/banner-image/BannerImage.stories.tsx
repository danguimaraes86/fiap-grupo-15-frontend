import type { Meta, StoryObj } from '@storybook/react';
import HeroBannerComponent from '.';

const meta: Meta<typeof HeroBannerComponent> = {
  title: 'HomeView/HeroBanner',
  component: HeroBannerComponent,
  tags: ['autodocs'],
};

export default meta;

type Story = StoryObj<typeof HeroBannerComponent>;

export const Default: Story = {
  args: {
    imageSrc: '/images/home_view_banner.png',
    altText: 'Banner da Home Page',
  },
};
