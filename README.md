This Miro app demonstrates using [flat rate](https://www.salable.app/features/flat-rate-pricing) billing with Salable.

## Configure Salable

1. [Sign up](https://salable.app/login) for Salable or [login](https://salable.app/login) if you already have an account.
2. Ensure you have `Test Mode` enabled.

#### Create Product

1. Go to the Products page and click the `Create Product` button.
2. Give your product any name.
3. Tick the `Paid Product` checkbox.
4. Select the test payment integration that is created for you on sign up. If you already have created a payment integration this can be used instead.
5. Select `GBP` as your currency.

#### Create Plan

1. Go to the `Plans` tab on the sidebar and select `Create Plan`
2. Set the plan name as `Basic` and optionally provide a description. This plan will be a 'user' plan giving access to the product for a user on all boards but no other users on the team will be able to use it.
3. Press `Continue` to configure `License Type` information.
4. For the type of plan select `Standard`.
5. Select `Month` for subscription cycle.
6. Select `Flat rate` license type.
7. Select `Paid` to make it a paid plan.
8. Currencies will then appear, input the cost as `1` subscription which will bill a customer £1 every month.
9. Continue to `Assign values`.
10. This is section is for assigning feature values that can be used on pricing tables. This is not required to get set up.
11. Click `Continue` to `Capabilities`.
12. Create a capability called `circle`. These will be used to lock features behind the license check in the demo app.
13. Create Plan.
14. Repeat the above steps for a `Pro` plan but with the changes in the next steps. The Pro plan will also be a 'user' plan.
15. Set the monthly cost as `2` plan which will bill the customer £2 a month.
16. Select the already created capability `circle` and create a new capability of `triangle`.
17. Repeat the above steps for a `Board` plan but with the changes in the next steps. This plan will be a 'board' plan allowing all users on a single board access to the product.
18. Set the monthly cost as `5` plan which will bill the customer £5 a month.
19. Select both existing capabilities `circle` and `triangle`.

### Update Environment Variables

1. Copy the Product ID from the `General Settings` tab and assign to `NEXT_PUBLIC_PRODUCT_UUID` in the `.env` file.
2. Go to `Plans`. Assign the `Basic` ID to `NEXT_PUBLIC_SALABLE_PLAN_UUID`, `Pro` ID to `NEXT_PUBLIC_SALABLE_PRO_PLAN_UUID` and the `Board` ID to `NEXT_PUBLIC_SALABLE_BOARD_PLAN_UUID`.
3. Go to `API Keys`.
4. Copy the API Key that was generated on sign up and assign to `SALABLE_API_KEY`.
5. Run `npm run dev`


## Create a Miro app

### How to start locally

1. [Sign in](https://miro.com/login/) to Miro, and then create a
   [Developer team](https://developers.miro.com/docs/create-a-developer-team)
   under your user account.

2. [Create an app in Miro](https://developers.miro.com/docs/build-your-first-hello-world-app#step-2-create-your-app-in-miro).

- Click the **Create new app** button.
- On the **Create new app** modal, give your app a name, assign it to your
  Developer team, and then click **Create**.

3. Configure the app:

- In your account profile, go to **Your apps**, and then select the app you just
  created to access its configuration page.
- On the app configuration page, go to **App Credentials**, and copy the app
  **Client ID** and **Client secret** values: you'll need to enter these values
  in step 4 below.
- Go to **App URL** and enter the following URL: `http://localhost:3000`
- Go to **Redirect URI for OAuth2.0**, and enter the following redirect URL:
  `http://localhost:3000/api/redirect`
- Click **Options**. \
  From the drop-down menu select **Use this URI for SDK authorization**.
- Lastly, go to **Permissions**, and select the following permissions:
  - `board:read`
  - `board:write`
  - `identity:read`

4. Open the [`.env`](.env) file, and enter the app client ID and client secret
   values that you saved at the beginning of step 3 above.
5. Run `npm run start` to start developing.

When your server is up and running:

- Go to [Miro.com](https://miro.com).
- Make sure you're in your developer team and open a board.
- To start your app, click the app icon in the app toolbar on the left.
