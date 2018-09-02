import styled from 'styled-components';
import { LUNCH_INFO } from '@/services/Slack/constants';
import { getChannelURL } from '@/services/Slack/utils';
import { EMPTY_ORDER } from './messages';

const EmptyOrder = styled.a.attrs({
  className: 'my-4 text-secondary font-weight-bold',
  href: getChannelURL(LUNCH_INFO.CHANNEL_NAME),
  target: '_blank',
  children: EMPTY_ORDER,
})`
  padding: 0.75rem;
`;

export default EmptyOrder;