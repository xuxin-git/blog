import asyncComponent from "utils/asyncComponent"; //按需加载组件

// 首页
const Home = asyncComponent({
    loader: () => import("../layout/home/index"),
    models: () => [import("../layout/home/model")]
});

// 列表页-demo
const List = asyncComponent({
    loader: () => import("../layout/demo/list"),
    models: () => [import("../layout/demo/list/model")]
});
// 列表页-demo
const TableList = asyncComponent({
    loader: () => import("../layout/dbtable/index"),
    models: () => [import("../layout/dbtable/model")]
});

const TheCode = asyncComponent({
    loader: () => import("../layout/demo/code/index"),
    models: () => [import("../layout/demo/code/model")]
});


const menuData = [
    {
        name: "首页",
        path: "index",
        icon: "home",
        component: Home
	},
	{
        name: "Demo",
        path: "demo",
        icon: "home",
        component: TheCode
    },
    { name: "仪表盘", path: "dashboard", icon: "setting" },
    {
        name: "一键断网",
        path: "offnet",
        icon: "setting"
    },
    {
        name: "数据表",
        path: "dbtables",
        icon: "setting",
        component: TableList
    },
];

function formatter(data, parentPath = "/", parentAuthority) {
    return data.map(item => {
        let { path } = item;
        const reg = /(((^https?:(?:\/\/)?)(?:[-;:&=\+\$,\w]+@)?[A-Za-z0-9.-]+|(?:www.|[-;:&=\+\$,\w]+@)[A-Za-z0-9.-]+)((?:\/[\+~%\/.\w-_]*)?\??(?:[-\+=&;%@.\w_]*)#?(?:[\w]*))?)$/g;
        if (!reg.test(path)) {
            path = parentPath + item.path;
        }
        const result = {
            key: path,
            ...item,
            path,
            authority: item.authority || parentAuthority
        };
        if (item.children) {
            result.children = formatter(
                item.children,
                `${parentPath}${item.path}/`,
                item.authority
            );
        }
        return result;
    });
}

export const getMenuData = () => formatter(menuData);
