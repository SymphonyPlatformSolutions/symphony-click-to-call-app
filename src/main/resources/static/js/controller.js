const controllerName = 'clickToCall:controller';
const service = SYMPHONY.services.register(controllerName);
const baseUrl = 'https://localhost:4000';

let appToken = undefined;
let appTokenPromise = fetch(`${baseUrl}/appToken`)
    .then(res => res.json())
    .then(res => {
        appToken = res['token'];
    });

Promise.all([appTokenPromise, SYMPHONY.remote.hello()]).then(() => {
    SYMPHONY.application.register(
        {appId: 'click-to-call', tokenA: appToken},
        ['modules', 'applications-nav'],
        [controllerName]
    )
    .then(() => {
        const navService = SYMPHONY.services.subscribe('applications-nav');
        const modulesService = SYMPHONY.services.subscribe('modules');

        navService.add("my-app-nav", "My App", controllerName)

        service.implement({
            select: () => {
                modulesService.show("my-app-module", "My App", controllerName, `${baseUrl}/app.html`, {});
            },
            getDate: () => new Date()
        })
    })
});
