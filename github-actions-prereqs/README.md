# Github Actions Prerequisites

The included Github Actions workflow at [.github/workflows/buildAndTest.yml](/.github/workflows/buildAndTest.yml) will
build the app and run all tests. Since these tests include the integration tests, the workflow will (indirectly) deploy
an ephemeral version of the application to AWS, and therefore the Github Actions workflow needs permission to deploy
resources to
your AWS account.

The included workflow gets credentials
using "[OpenID Connect](https://docs.github.com/en/actions/deployment/security-hardening-your-deployments/configuring-openid-connect-in-amazon-web-services)"
, otherwise known as _OIDC_ . This is a little fiddly to setup, but
it means that long-lived access tokens don't need to be stored in your Github organization.

Follow the following instructions depending on to what extent (if any) you already have Github Actions configured to
access your AWS account via OIDC.

:warning: **The below steps make administrative changes to both your Github org or repo AND your AWS account.**

## 1 - If you've already configured Github OIDC  in your AWS account, and you've already created a role that Github can use via OIDC to deploy resources

If you (or someone else) has already done the hard work to get Github OIDC working with your AWS account
with a suitably powerful role then you don't have much work to do! You have two options:

* Either create a new Github Secret (org or repo scope) named `ACTIONS_ROLE_ARN`, with the value being the ARN of the
  IAM role Github Actions should assume.
* OR change the Github actions workflow [template](/.github/workflows/buildAndTest.yml) and change how `role-to-assume` is configured (e.g. you could hard code
  the ARN or specify a different secret).

## 2 - If you've already configured Github OIDC in your AWS account, but need a new role for this project

To use the included example IAM role in this project:

* Find the ARN of the Github OIDC provider for your target AWS account. It will be something
  like `arn:aws:iam::123456789012:oidc-provider/token.actions.githubusercontent.com` .
* Deploy the included stack, **specifying the provider ARN**, e.g. **in this directory** run the following where
  where `GITHUB_ORG` is your Github Organization name and `OIDC_PROVIDER_ARN` is the Github OIDC provider ARN.:

```shell
% ./deploy-github-actions-prereqs.sh GITHUB_ORG OIDC_PROVIDER_ARN 
```

For more details about the role that is created, see [template.yaml](template.yaml).

**Alternatively**, if you would like to configure a role differently then either modify the included template, or create
a role in your preferred way.

**In either case** once the role is deployed then follow step (1) above, using the ARN of the role that was just
created.

## 3 - If Github OIDC is NOT already configured in your AWS account

You'll be able to tell whether Github OIDC has already been configured in your AWS account by visiting the
[Identity Providers section of the IAM web console](https://console.aws.amazon.com/iamv2/home?#/identity_providers) . If
you don't already see a provider named `token.actions.githubusercontent.com` you'll need to create it.

To do so, and also create an IAM role that Github Actions can assume, then deploy the included stack, e.g. **in this
directory** run the following where
where `GITHUB_ORG` is your Github Organization name:

```shell
% ./deploy-github-actions-prereqs.sh GITHUB_ORG 
```

If you want to configure a role differently then either modify the included template, or create
a role in your preferred way.

**In either case** once the IAM provider is setup, and the role is deployed, then follow step (1) above, using the ARN
of the role that was just created.