const controllerName = 'clickToCall:controller'
const viewName = 'clickToCall:view';
let showTime;

SYMPHONY.remote.hello().then(() => {
    SYMPHONY.application
        .connect('click-to-call', [ controllerName ], [ viewName ])
        .then(() => {
            const controller = SYMPHONY.services.subscribe(controllerName);

            showTime = () => {
                controller.invoke('getDate').then((time) => {
                    document.querySelector("#theTime").innerHTML += time + "<br/>"
                });
            }

            showTime();
        });
});
