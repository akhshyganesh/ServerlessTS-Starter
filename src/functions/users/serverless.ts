import { httpGet, httpPost } from '@libs/function-config';

export = {
  ...httpGet('getUsers', 'src/functions/users/handler'),
  ...httpPost('createUser', 'src/functions/users/handler')
};
