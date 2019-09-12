import Mock from 'mockjs'
export default ({ mock }) => {
    if (!mock) return

    console.log("open mock user js");

    // 用户登录
    Mock.mock(new RegExp('/auth/token*'), 'post', () => {
        const data = {
            code: 200,
            message: '成功',
            data: {
                accessToken: 11
            }
        };
        return data;
    });
    //获取左侧菜单
    // Mock.mock(new RegExp('/system/menu/routes*'), 'get', () => {
    //     const data = {
    //         code: 200,
    //         message: '成功',
    //         data: [{
    //             path:'aaaa',
    //             url:'aaaaa',
    //             name:'菜单一',
    //             children:[{
    //                 path:'aaaa',
    //                 url:'aaaaa',
    //                 name:'菜单一 一'
    //             }]
    //         }]
    //     };
    //     return data;
    // });

    //获取button
    Mock.mock(new RegExp('/system/menu/buttons*'), 'get', () => {
        const data = {
            code: 200,
            message: '成功',
            data: [{
                path:'aaaa',
                url:'aaaaa',
                name:'按钮1',
                children:null
            }]
        };
        return data;
    });

    //用户退出
    Mock.mock('/user/logout', 'get', {
        data: true,
    });
    //刷新token
    Mock.mock('/user/refesh', 'post', {
        data: new Date().getTime() + ''
    });

    //获取表格数据
    Mock.mock('/user/getTable', 'get', () => {
        let list = []
        for (let i = 0; i < 5; i++) {
            list.push(Mock.mock({
                id: '@increment',
                name: Mock.mock('@cname'),
                username: Mock.mock('@last'),
                type: [0, 2],
                checkbox: [0, 1],
                'number|0-100': 0,
                datetime: 1532932422071,
                'sex|0-1': 0,
                moreselect: [0, 1],
                "grade": 0,
                address: Mock.mock('@cparagraph(1, 3)'),
                check: [1, 3, 4]
            }))
        }
        return {
            data: {
                total: 11,
                pageSize: 10,
                tableData: list
            }
        }
    })
}
