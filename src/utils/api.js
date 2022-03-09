const BASE_URL = 'https://test.divo.kr/';

export const LOGIN_URL = BASE_URL + 'auth/login/';
export const AUTH_URL = BASE_URL + 'auth/register/message/';
export const REGISTER_URL = BASE_URL + 'auth/register/telephone/';
export const CORPLIST_URL = BASE_URL + 'auth/user/corporation';
export const OLD_AUTH_URL = BASE_URL + 'auth/account/find/';
export const RESET_URL = BASE_URL + 'auth/account/reset/';
export const CORP_AUTH_URL = BASE_URL + 'corporation/permission/?corp_id=';


export const GET_YS_CAT_URL = BASE_URL + 'corporation/yeoshin/sync/';
export const SYNC_YS_URL = BASE_URL + 'corporation/yeoshin/';
export const SYNC_SALES_URL = BASE_URL + 'corporation/sales/sync/';

export const FIND_PLACE_URL = BASE_URL + 'place/find?query=';
export const MAKE_PLACE_URL = BASE_URL + 'place/makePlace';
export const ADD_CORP_URL = BASE_URL + 'corporation/';
export const DEL_CORP_URL = BASE_URL + 'corporation/?corp_id=';

export const KA_RADAR_URL = BASE_URL + 'keyword/radar?keyword=';
export const KA_AMOUNT_URL = BASE_URL + 'keyword/amount?keyword=';
export const KA_QTY_CHART_URL = (keyword, startDate, endDate, scale = 0) => BASE_URL + 'keyword/amountChart?keyword=' + keyword + '&startDate=' + startDate + '&endDate=' + endDate;
export const KA_CONTENT_URL = BASE_URL + 'keyword/contents?keyword=';
export const KA_CHART_URL = BASE_URL + 'keyword/chart?keyword=';
export const KA_SECTION_URL = BASE_URL + 'keyword/section?keyword=';
export const KA_VIEW_URL = BASE_URL + 'keyword/viewtop?keyword=';
export const KA_RELATIVE_URL = BASE_URL + 'keyword/relative?keyword=';

export const SA_RADAR_URL = corpId => BASE_URL + `corporation/sales/${corpId}/summary`;
export const SA_COMPARE_URL = corpId => BASE_URL + `corporation/sales/${corpId}/analysis`;
export const SA_TREND_URL = corpId => BASE_URL + `corporation/sales/${corpId}/total?scale=`;

export const PLACE_KEYWORD_URL = corpId => BASE_URL + 'placekeyword/list?id=' + corpId;
export const UP_LIST_URL = BASE_URL + 'placekeyword/uplist';

export const VIEW_PLACE_RANK_URL = BASE_URL + 'rank/rank?id=';
export const RANK_CHART_URL = (id, keyword, cat) => BASE_URL + `rank/graph?id=${id}&keyword=${keyword}&cat=${cat}`;

export const RANK_GET_PID_URL = BASE_URL + 'omrank/getid?corpId=';
export const RANK_RIVALS_URL = BASE_URL + 'omrank/rivals?id=';
export const RANK_OM_URL = BASE_URL + 'omrank/omrank?id=';