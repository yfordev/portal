import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import moment from 'moment';
import { RouterContext } from 'next/dist/shared/lib/router-context';

import { createMockRouter } from '@/test-utils/createRouterMock';
// nen
import TimeFormat, { absoluteTimeFormat } from '..';

describe('TimeFormat', () => {
  const timestamp = 1626355200;
  const testData = {
    timestamp,
    absoluteTime: () => moment(timestamp * 1000).format(absoluteTimeFormat),
    fromNowTime: () => moment(timestamp * 1000).fromNow(),
  };

  const router = createMockRouter({});

  it('should render TimeFormatNormal correctly', () => {
    const { getByText } = render(
      <RouterContext.Provider value={router}>
        <TimeFormat time={testData.timestamp} />
      </RouterContext.Provider>
    );

    expect(getByText(testData.absoluteTime())).toBeInTheDocument();
  });

  it('should render TimeFormatFromNow correctly', async () => {
    const { getByText } = render(
      <RouterContext.Provider value={router}>
        <TimeFormat fromNow time={testData.timestamp} />
      </RouterContext.Provider>
    );
    const ele = getByText(testData.fromNowTime());
    expect(ele).toBeInTheDocument();

    const absoluteTimeEle = () => screen.queryByText(testData.absoluteTime());
    // default tooltip is not exist
    expect(absoluteTimeEle()).not.toBeInTheDocument();

    // hover on the element and wait for the tooltip to appear
    fireEvent.pointerOver(ele);
    await screen.findByText(testData.absoluteTime());
    expect(absoluteTimeEle()).toBeInTheDocument();

    // hover out of the element and wait for the tooltip to disappear
    fireEvent.blur(ele);
    await waitFor(() => expect(absoluteTimeEle()).not.toBeVisible());
  });
});
