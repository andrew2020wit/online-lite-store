// Users Endpoint

export const baseApiEndPoint = 'http://localhost:3001/api';

export const createUserEndPoint = baseApiEndPoint + '/user/create-user';
export const editUserEndPoint = baseApiEndPoint + '/user/edit-user';
export const changeUserPasswordEndPoint =
  baseApiEndPoint + '/user/change-password';
export const getUserProfileEndPoint = baseApiEndPoint + '/user/get-profile';

export const queryUsersEndPoint = baseApiEndPoint + '/user/query-users';

export const getUserEntityEP = baseApiEndPoint + '/user/get-user-entity';

export const putOrderEndPoint = baseApiEndPoint + '/order';
export const getOrdersEndPoint = baseApiEndPoint + '/order/query';

export const goodsCategories = ['', 'all', 'cat1', 'cat2', 'general'];

export const srcSmallWithoutPhoto = '/images/goods/small-without-photo.jpeg';

export const goodsImagesDir = '/images/goods/';
