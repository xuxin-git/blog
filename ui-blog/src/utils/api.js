import { query, post, postForm } from './AxiosUtil';

let base = '/restcloud/rest/gypj';


// 登录
export const reqPostLogin = params => { return postForm(`${base}/login`, params) };


//校区设置=>分页查询校区代码表的数据
export const reqGetXqszXqdmList = params => { return query(`${base}/rest/gybase/xqdmb/list/page`,params) };
//校区设置=>保存或更新校区代码表的数据
export const reqPostXqszXqSave = params => { return postForm(`${base}/rest/gybase/xqdmb/save`,params) };
//校区设置=>根据xqdm删除校区代码表的多条记录
export const reqPostXqszXqDelete = params => { return postForm(`${base}/rest/gybase/xqdmb/delete`,params) };

export const getDbTables = params => { return query(`/api/table/getDbTables`,params) };
export const createCode = params => { return query(`/api/user/createCode`,params) };
export const checkCode = params => { return query(`/api/user/checkCode`,params) };





