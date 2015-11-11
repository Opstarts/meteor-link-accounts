if (Meteor.isClient) {
  Meteor.linkWithStripe = function (options, callback) {
    if (!Meteor.userId()) {
      throw new Meteor.Error(402, 'Please login to an existing account before link.');
    }
    if (!Package['billyvg:accounts-stripe']) {
      throw new Meteor.Error(403, 'Please include billyvg:accounts-stripe package');
    }

    if (! callback && typeof options === "function") {
      callback = options;
      options = null;
    }

    var credentialRequestCompleteCallback = Accounts.oauth.linkCredentialRequestCompleteHandler(callback);
    Package['billyvg:stripe-oauth'].StripeOAuth.requestCredential(options, credentialRequestCompleteCallback);
  };
}
