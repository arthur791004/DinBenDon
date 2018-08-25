const STORAGE_KEYS = [
  'ACCESS_TOKEN',
  'CURRENT_USER_ID',
  'CURRENT_USER_PROFILE',
];

export const STORAGE_PREFIX = 'DinBenDon';

export const STORAGES = STORAGE_KEYS.reduce((acc, cur) => ({
  ...acc,
  [cur]: `${STORAGE_PREFIX}:${cur}`,
}), {});