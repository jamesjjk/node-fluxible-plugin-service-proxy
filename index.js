var fluxibleServiceProxy;

module.exports = fluxibleServiceProxy = function() {
    var services = {};

    return {
        name: "ServiceProxyPlugin",

        /*
         * Called to update the flux context.  This will add `context.getServiceProxy(name)` to the
         * flux action context.
         *
         * `options` is the options passed to `flux.createContext(options)`.
         */
        plugContext: function (options, context) {
            return {
                plugActionContext: function (actionContext) {
                    // 1.0 API
                    var oldGetServiceProxy = actionContext.getServiceProxy;
                    actionContext.getServiceProxy = function (name) {
                        var answer = services[name];
                        if(!answer && oldGetServiceProxy) {
                            answer = oldGetServiceProxy(name);
                        }
                        answer.context = context;
                        return answer;
                    }

                    // 1.1 API
                    var oldGetService = actionContext.getService;
                    actionContext.getService = function (name) {
                        var answer = services[name];
                        if(!answer && oldGetService) {
                            answer = oldGetService(name);
                        }
                        answer.context = context;
                        return answer;
                    }
                }
            }
        },

        /* Register a service with the service proxy plugin.
         *
         * Services registered this way will be available to actions via
         * `context.getServiceProxy(name)`.
         */
        registerService: function (name, service) {
            services[name] = service;
            return this;
        },

        dehydrate: function() {return {};},
        rehydrate: function(state) {return null;}
    };
};
