const clickToCallName = 'clickToCall:controller';
const clickToCallService = SYMPHONY.services.register(clickToCallName);
const baseUrl = 'https://localhost:4000';

let appToken = undefined;
let appTokenPromise = fetch(`${baseUrl}/appToken`)
  .then(res => res.json())
  .then(res => {
    appToken = res['token'];
  });

Promise.all([ appTokenPromise, SYMPHONY.remote.hello()]).then(data => {
  SYMPHONY.application.register(
      { appId: 'click-to-call', tokenA: appToken },
      [ 'ui', 'dialogs' ],
      [ clickToCallName ]
  )
  .then(function (response) {
    const uiService = SYMPHONY.services.subscribe('ui');
    const dialogsService = SYMPHONY.services.subscribe('dialogs');
    const noPhoneMessage = `<dialog>No phone information for this user<br /><br /></dialog>`;
    const callButton = {
      icon: `${baseUrl}/img/icon_small.png`,
      label: 'Click to Call',
      data: {}
    };
    uiService.registerExtension('profile', 'clickToCall-profile', clickToCallName, callButton);
    uiService.registerExtension('single-user-im', 'clickToCall-im', clickToCallName, callButton);

    clickToCallService.implement({
      trigger: function(uiClass, id, payload, data) {
        if (!payload.user.phone) {
          dialogsService.show('noPhoneDialog', 'noPhoneService', noPhoneMessage, {}, {});
          return;
        }

        // TODO: Implement integration with third-party telephony API here
        window.location.assign(`dialpad:${payload.user.phone}`);
      }
    })
  })
});
