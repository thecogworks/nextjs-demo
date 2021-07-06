import * as React from 'react';
import { Meta, Story } from '@storybook/react/types-6-0';
import Navigation, { NavigationProps } from './Navigation';

export default {
  title: 'Digital Hybrid/Organisms/Header Menu',
  component: Navigation,
} as Meta;

const Template: Story<NavigationProps> = (args) => <Navigation {...args} />;

export const Default = Template.bind({});

const defaultArgs: NavigationProps = {
  profileName: 'Ava Garcia',
};

Default.args = defaultArgs;
