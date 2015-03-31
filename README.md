Fluxible plugin for registering services with different implementations on the server and the client.

## Description

fluxible-service-proxy is a [fluxible](http://fluxible.io/) plugin which allows you to register
"services" to use in actions, where services can have a different implementation on the client and
on the server.

There are other plugins such as [fluxible-plugin-fetchr](https://github.com/yahoo/fluxible-plugin-fetchr)
which do this in a more automated way, but this is very handy if you have some existing API you
wish to call on the client side, or if you have some unusual use case.

## Installation

    npm install --save fluxible-service-proxy

## Usage

To use, when defining your app:

    var serviceProxyPlugin = require('fluxible-service-proxy');
    var app = new Fluxible({...});
    app.plug(serviceProxyPlugin());

Then on the server side:

    app.getPlugin('ServiceProxyPlugin').registerService('whereAmI', {
        run: -> return "I ran on the server"
    })

And on the client:

    app.getPlugin('ServiceProxyPlugin').registerService('whereAmI', {
        run: -> return "I ran on the client"
    })

Finally, in your actions you can do:

    context.getServiceProxy('whereAmI').run()

and this will call the appropriate implementation.
