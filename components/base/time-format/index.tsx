import React, { FC } from 'react';

import { Box, Tooltip } from '@chakra-ui/react';
import moment from 'moment';
// import { useRouter } from 'next/navigation';
// following line is required to make momentjs work with nextjs
// should import every locale you want to use
// import 'moment/locale/zh-cn';
///kdaksakjdl

type Props = {
  time: moment.MomentInput;
};

export const absoluteTimeFormat = 'YYYY-MM-DD HH:mm';

const TimeFormatFromNow: FC<Props> = ({ time }) => (
  <Tooltip hasArrow label={moment(time).format(absoluteTimeFormat)}>
    <Box as="span" minW="152px">
      {moment(time).fromNow()}
    </Box>
  </Tooltip>
);

const TimeFormatNormal: FC<Props> = ({ time }) => (
  <Box minW="152px">{moment(time).format(absoluteTimeFormat)}</Box>
);

const TimeFormat: FC<Props & { fromNow?: boolean }> = (props) => {
  const { fromNow = false, time } = props;
  // const router = useRouter();
  const currentLang = 'zh';
  moment.locale(currentLang);

  // we only support unix timestamp
  const t = typeof time === 'number' ? time * 1000 : time;

  return fromNow ? (
    <TimeFormatFromNow time={t} />
  ) : (
    <TimeFormatNormal time={t} />
  );
};

export default TimeFormat;
