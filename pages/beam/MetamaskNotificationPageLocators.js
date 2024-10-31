// Locators for Metamask Notification Page

const footerNextButton = 'button[data-testid="page-container-footer-next"]';
const confirmationSubmitButton = 'button[data-testid="confirmation-submit-button"]';
const switchNetworkButton = 'button:has-text("Switch network")';

// Exporting elements as module for ease of import in test scripts
module.exports = {
  footerNextButton,
  confirmationSubmitButton,
  switchNetworkButton,
};

const { footerNextButton, confirmationSubmitButton, switchNetworkButton } = require('./MetamaskNotificationPageLocators');

class MetamaskNotificationPage {
  constructor(page) {
    this.page = page;
  }

  async clickFooterNextButton() {
    await this.page.waitForSelector(footerNextButton);
    await this.page.click(footerNextButton);
  }

  async clickConfirmationSubmitButton() {
    await this.page.waitForSelector(confirmationSubmitButton);
    await this.page.click(confirmationSubmitButton);
  }

  async clickSwitchNetworkButton() {
    await this.page.waitForSelector(switchNetworkButton);
    await this.page.click(switchNetworkButton);
  }

  async completeNotificationFlow() {
    await this.clickFooterNextButton();
    await this.clickFooterNextButton();
    await this.clickConfirmationSubmitButton();
    await this.clickSwitchNetworkButton();
  }
}

module.exports = MetamaskNotificationPage;
