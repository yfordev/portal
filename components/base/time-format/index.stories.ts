import type { Meta, StoryObj } from '@storybook/react';

import TimeFormat from './index';

const meta: Meta<typeof TimeFormat> = {
  component: TimeFormat,
};

type Story = StoryObj<typeof TimeFormat>;

export const Default: Story = {
  // I am just do some change to test changesets
  args: {
    time: '2021-08-01T00:00:00.000Z',
  },
}

export default meta;