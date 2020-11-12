const htmlProcessor = require('../../components/html-processor/html-processor')
import Vuex from 'vuex'
import clone from 'lodash/cloneDeep'
module.exports =  ({ htmlPath, routers, store, defaultHandlers }) => async (req, res, next) => {
    
    let vstore = clone(store)
    let initstore = new Vuex.Store(vstore)
    const options = {
        filePath: htmlPath,
        renderData: {
            html: '',
        },
        fillVars: {
            __INIT_STATE__: null
        }
    }

    try {

        for (let h of defaultHandlers) {
            const result = h(req, res, initstore, options);
            if (result instanceof Promise) {
                initstore = await result;
            } else {
                initstore = result;
            }

            if (!initstore) {
                return;
            }
        }
        
        // 开启服务端渲染
        // if (ssr) {
        //     // 需要服务端渲染才去匹配routers
        //     const renderProps = await routerMatch(req, res, routers);
        //     const css = new Set();
        //     const context = { insertCss: (...styles) => styles.forEach(style => {
        //         if(style._getCss){
        //             css.add(style._getCss());
        //         }
        //     }) };
        // Vue.use(Vuex)
        // let app = new Vue({
        //     template: <Provider>
        //             <RouterContext
        //             {...renderProps}
        //             createElement={(Component, props) => <Component {...props} context={context} />}
        //             />
        //         </Provider>
        //         ,
        //     store,
        //     router,
        // })

        //     let content = await renderToString(app);
        //     options.renderData.css = [...css].join('');
        //     options.renderData.html = content;
        // }

        options.fillVars.__INIT_STATE__ = initstore.state;
        htmlProcessor(req, res, next, options);

    } catch (error) {
        console.error(error);
        res.send('500');
    }
}
    

