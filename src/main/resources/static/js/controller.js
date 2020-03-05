const clickToCallName = 'clickToCall:controller';
const clickToCallService = SYMPHONY.services.register(clickToCallName);
// const baseUrl = 'https://localhost:4000';
// ./ngrok https 4000
const baseUrl = 'https://cac073b8.ngrok.io';

let appToken = undefined;
let appTokenPromise = fetch(`${baseUrl}/appToken`)
  .then(res => res.json())
  .then(res => {
    appToken = res['token'];
  });

Promise.all([ appTokenPromise, SYMPHONY.remote.hello()]).then(data => {
  SYMPHONY.application.register(
      { appId: 'sfdc-ui-app', tokenA: appToken },
      [ 'ui', 'dialogs' ],
      [ clickToCallName ]
  )
  .then(function (response) {
    const uiService = SYMPHONY.services.subscribe('ui');
    const dialogsService = SYMPHONY.services.subscribe('dialogs');
    const notConfiguredMessage = `<dialog><h1>Configuration Error</h1><br/>SalesForce has not been configured for this chat<br /><br /></dialog>`;
    const callButton = {
      icon: `${baseUrl}/img/salesforce-icon.jpg`,
      label: 'SalesForce',
      data: {}
    };
    // uiService.registerExtension('profile', 'clickToCall-profile', clickToCallName, callButton);
    uiService.registerExtension('single-user-im', 'clickToCall-im', clickToCallName, callButton);
    uiService.registerExtension('room', 'clickToCall-room', clickToCallName, callButton);

    clickToCallService.implement({
      trigger: function(uiClass, id, payload, data) {
          // Sapphire Investments
          if (payload.threadId == '9xRmFY+MxFx1Hmg8aFDq5n///pHJjydKdA==') {
          console.log('Button was clicked on ', JSON.stringify(payload));
          window.open('https://symdev5-dev-ed.lightning.force.com/00T/e?sObjectName=Task&save_new_url=%2F00T%2Fe&navigationLocation=LIST_VIEW');
          return
          }
          // Case Management use case
          if (payload.threadId == 'OvZX5/C8qFgh5yFCk/IF8H///pHFIPSTdA==') {
            console.log('Button was clicked on ', JSON.stringify(payload));
            window.open('https://symdev5-dev-ed.lightning.force.com/lightning/o/Case/new?nooverride=1&useRecordTypeCheck=1&navigationLocation=LIST_VIEW&backgroundContext=%2Flightning%2Fr%2FCase%2F5001I00000PjkqDQAR%2Fview');
            return
          }
          // INT Montchard
          if (payload.threadId == 'ddztFvb3CEwXgwV+E0qQpX///pP6gBERdA==') {
          console.log('Button was clicked on ', JSON.stringify(payload));
          window.open('https://symdev5-dev-ed.lightning.force.com/lightning/o/Task/new?nooverride=1&useRecordTypeCheck=1&navigationLocation=LIST_VIEW&backgroundContext=%2Flightning%2Fr%2FCase%2F5001I00000PjkqDQAR%2Fview');
          return
          }
          // NCG Capital
          if (payload.threadId == 'fVjyngldp6+7N4ak1J2wHn///pQagLS1dA==') {
          console.log('Button was clicked on ', JSON.stringify(payload));
          window.open('https://symdev5-dev-ed.lightning.force.com/lightning/o/Task/new?nooverride=1&useRecordTypeCheck=1&navigationLocation=LIST_VIEW&backgroundContext=%2Flightning%2Fr%2FCase%2F5001I00000PjkqDQAR%2Fview');
          return
          }

          // 1-1 SFDC Bot
          if (payload.threadId == 'wobY4upNxIF9C8JU7R4hOX///pVFSinKdA==') {
          console.log('Button was clicked on ', JSON.stringify(payload));
          window.open('https://symdev5-dev-ed.lightning.force.com/lightning/o/Task/new?nooverride=1&useRecordTypeCheck=1&navigationLocation=LIST_VIEW&backgroundContext=%2Flightning%2Fr%2FCase%2F5001I00000PjkqDQAR%2Fview');
          return
          }

        // TODO: Implement integration with third-party telephony API here
        // window.open('https://www.bbc.co.uk/news');
          console.log('Last Button was clicked on ', JSON.stringify(payload));
          dialogsService.show('notConfigured', 'notConfigured', notConfiguredMessage, {}, {});
          return;
      }
    })
  })
});