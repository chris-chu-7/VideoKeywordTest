import { Spinner, Stack, Text } from '@chakra-ui/react';
import { QueryKey } from 'constants/query-keys';
import React from 'react';
import { useQuery } from 'react-query';
import { api } from 'utils/api';

const Video: React.FC = () => {
  const { data } = useQuery(QueryKey.PING, () => api.ping());
  return <Stack>{data ? <Text>{data.data.message}</Text> : <Spinner />}</Stack>;
};

export default Video;
