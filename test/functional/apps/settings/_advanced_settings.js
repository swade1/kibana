import {
  bdd,
  common,
  settingsPage,
  scenarioManager
} from '../../../support';

(function () {
  var expect = require('expect.js');

  (function () {
    bdd.describe('creating and deleting default index', function describeIndexTests() {
      bdd.before(function () {
        return scenarioManager.reload('emptyKibana')
        .then(function () {
          return settingsPage.navigateTo();
        });
      });

      bdd.describe('index pattern creation', function indexPatternCreation() {
        bdd.before(function () {
          return settingsPage.createIndexPattern();
        });

        bdd.it('should allow setting advanced settings', function () {
          return settingsPage.clickAdvancedTab()
          .then(function TestCallSetAdvancedSettingsForTimezone() {
            common.log('calling setAdvancedSetting');
            return settingsPage.setAdvancedSettings('dateFormat:tz', 'America/Phoenix');
          })
          .then(function GetAdvancedSetting() {
            return settingsPage.getAdvancedSettings('dateFormat:tz');
          })
          .then(function (advancedSetting) {
            expect(advancedSetting).to.be('America/Phoenix');
          })
          .catch(common.handleError(this));
        });

      });
    });
  }());
}());
