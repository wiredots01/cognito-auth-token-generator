const AmazonCognitoIdentity = require('amazon-cognito-identity-js');

const poolData = {
  UserPoolId: 'change_to_your_user_pool_id',
  ClientId: 'change_to_your_client_id',
  Region: 'change_to_your_region',
};


const userPool = new AmazonCognitoIdentity.CognitoUserPool(poolData);

const authenticationData = {
  Username: 'change_to_your-username',
  Password: 'change_to_your-password',
};

const authenticationDetails = new AmazonCognitoIdentity.AuthenticationDetails(authenticationData);

const userData = {
  Username: 'change_to_your-username',
  Pool: userPool,
};

const cognitoUser = new AmazonCognitoIdentity.CognitoUser(userData);

cognitoUser.authenticateUser(authenticationDetails, {
  onSuccess: function(result) {
    console.log('----------------------------');
    console.log(result);
    console.log('----------------------------');
    var tokenId = result.getIdToken();
    console.log("email: ", tokenId.payload.email);
    console.log('----------------------------');
    var accessToken = result.getAccessToken();
    console.log('access token: ===> \n\n\n', accessToken);
    console.log('jwt token: ===> \n\n\n', accessToken.getJwtToken());
  },
  newPasswordRequired: function (userAttributes) {
    delete userAttributes.email_verified;
    cognitoUser.completeNewPasswordChallenge('change_to_your-password', userAttributes, this)
  },
  onFailure: function (err) {
    console.error('Authentication failed', err);
  },
});



