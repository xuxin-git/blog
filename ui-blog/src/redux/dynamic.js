// 已经加载的model
var cached = {};
function registerModel(app, model) {
    model = model.default || model;
    if (!cached[model.namespace]) {
        app.model(model);
        cached[model.namespace] = 1;
    }
}

export default function dynamic(config) {
    // window.__dvaApp 为创建的dva实例
    const { app = window.__dvaApp, models: resolveModels } = config;

    const models = typeof resolveModels === "function" ? resolveModels() : [];

    return new Promise(resolve => {
        Promise.all([...models]).then(ret => {
            if (!models || !models.length) {
                return resolve();
            } else {
                const len = models.length;
                ret.slice(0, len).forEach(m => {
                    m = m.default || m;
                    if (!Array.isArray(m)) {
                        m = [m];
                    }
                    m.map(_ => registerModel(app, _));
                });
                resolve();
            }
        });
    });
}
