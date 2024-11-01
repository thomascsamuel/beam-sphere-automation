const { sphereNFTPageElements } = require('../../../pages/beam/sphere-page.js');
const { sphereHomePageElements } = require('../../../pages/beam/sphere-home-page.js');

const validateMetamaskAndCypressWindows = () => {
  cy.isMetamaskWindowActive().then(isActive => {
    expect(isActive).to.be.true;
  });

  cy.isCypressWindowActive().then(isActive => {
    expect(isActive).to.be.false;
  });
};

describe('Playwright', () => {
  context('Test commands', () => {
    it('initPlaywright should connect with Cypress browser', () => {
      cy.initPlaywright().then(isConnected => {
        expect(isConnected).to.be.true;
      });
    });

    it('assignActiveTabName should properly assign Metamask tab and verify it', () => {
      cy.assignActiveTabName('metamask');
      validateMetamaskAndCypressWindows();
    });

    it('assignWindows should properly assign Cypress and Metamask windows', () => {
      cy.assignWindows().then(assigned => {
        expect(assigned).to.be.true;
      });
    });

    it('should sign in and connect with MetaMask', () => {
      cy.visit('https://testnet.sphere.market');
      cy.contains(sphereHomePageElements.SigninBtn).should('be.visible').click();
      cy.get(sphereHomePageElements.metamaskConnectButton).should('be.visible').click();
      cy.switchToMetamaskNotification({ interactionMethod: "interactWithNotificationElements" });
      cy.get(sphereHomePageElements.verifyMetamaskAccount).click();
      cy.switchToMetamaskNotification({ interactionMethod: "switchToMetamaskNotificationFurtherAction" });
      validateMetamaskAndCypressWindows();
    });

    it('should navigate to NFT collection and select an NFT', () => {
      cy.get(sphereNFTPageElements.navCollectionsButton).should('be.visible').click();
      cy.document().its('readyState').should('eq', 'complete');
      cy.get(sphereNFTPageElements.firstCollectionCard).first().click();
      cy.get(sphereNFTPageElements.firstTokenImage).first().should('be.visible').click();
    });

    it('should attempt to buy the NFT and show insufficient balance message', () => {
      cy.contains(sphereNFTPageElements.buyNowButton).first().should('be.visible').click(); // Click on the "Buy Now" button
      cy.get(sphereNFTPageElements.insufficientBalanceMessage).should('contain.text', 'Insufficient Balance, select another token or add funds'); // Check for the message
    });
  });
});
