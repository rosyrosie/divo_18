const BASE_URL = 'https://test.divo.kr/';

export const LOGIN_URL = BASE_URL + 'auth/login/';
export const AUTH_URL = BASE_URL + 'auth/register/message/';
export const REGISTER_URL = BASE_URL + 'auth/register/telephone/';
export const CORPLIST_URL = BASE_URL + 'auth/user/corporation';

export const FINDPLACE_URL = BASE_URL + 'place/find?query=';
export const ADDCORP_URL = BASE_URL + 'corporation/';
export const DELCORP_URL = BASE_URL + 'corporation/?corp_id=';

export const KA_AMOUNT_URL = BASE_URL + 'keyword/amount?keyword=';
export const KA_CONTENT_URL = BASE_URL + 'keyword/contents?keyword=';
export const KA_CHART_URL = BASE_URL + 'keyword/chart?keyword=';

export const SA_RADAR_URL = corpId => BASE_URL + `corporation/sales/${corpId}/summary`;
