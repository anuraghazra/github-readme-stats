# Deployment solution in Yandex cloud 

## Getting started

Before you start, sign up for Yandex Cloud and create a billing account:
1. Go to the [management console](https://console.cloud.yandex.com/) and log in to Yandex Cloud or register if you don't have an account yet.
2. [On the billing page](https://console.cloud.yandex.com/billing), make sure you linked a [billing account](https://cloud.yandex.com/en/docs/billing/concepts/billing-account) and it has the `ACTIVE` or `TRIAL_ACTIVE` status. If you don't have a billing account, [create one](https://cloud.yandex.com/en/docs/billing/quickstart/).

If you have an active billing account, you can go to the cloud page to create or select a folder to run your infrastructure.

[Learn more about clouds and folders](https://cloud.yandex.com/en/docs/resource-manager/concepts/resources-hierarchy).

---

## Prepare resources
Download the `github-stats-api.zip` archive.
[Create](https://cloud.yandex.ru/docs/iam/operations/sa/create) a service account and [assign](https://cloud.yandex.ru/docs/iam/operations/sa/assign-role-for-sa) it admin roles for your directory.

---

## [Create a function](https://cloud.yandex.ru/docs/functions/operations/function/function-create)

- Name: github-stats-api

---

## [Create Function Version](https://cloud.yandex.ru/docs/functions/operations/function/version-manage)

- Runtime environment: Node.js 16.
- Method: ZIP archive.
- File: github-stats-api.zip.
- Entry point: index.handler.
- Timeout: 7 sec.
- RAM: 128 MB.
- Service account: Your service account.
- Environment variables: PAT_1 = 'token to access github (https://github.com/settings/tokens/new), enable repo and user access'

---

## [Creating API gateways](Creating API gateways)

- Name: github-stats-api

- prepare specification `spec.yaml`:
1. replace all <function_id> with your function id
2. replace all <service_account_id> with your service account id

- Copy specification and paste in the Specification section
