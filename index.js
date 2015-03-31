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
        plugContext: function (options) {
            return {
                plugActionContext: function (actionContext) {
                    actionContext.getServiceProxy = function (name) {
                        return services[name];
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