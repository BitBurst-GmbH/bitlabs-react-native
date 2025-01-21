## v1.2.7

- **Add Native Back functionality(works on Android)**

## v1.2.6

- **Add Sentry Error Reporting**

## v1.2.5

- **Add User Agent to requests**

## v1.2.4

- **Add CI via Github Actions**
- **Remove Fake Surveys**
- **Expose Restriction Reason as an Error for getSurveys**

## v1.2.3

- **Bugfix**: onReward always executes with 0 reward despite earning in the Offerwall
- **Bugfix**: Endless looping occasionally in the offerwall

## v1.2.2

- **Add isDebugMode for BitLabsOfferwall**: Do not use it for production purposes

## v1.2.1

- **Offer Support Page:** Now you can report to us in case there is a problem with an Offer. The Report a Problem option is now available in the Offer overview page once you start the offer.

## v1.2.0

- Migrate Widgets from native components to webview components:

  - Deprecate `SurveyType` in favour of `WidgetType`
  - Deprecate `BitLabsSurveys` and `BitLabsLeaderboard` components in favour of `BitLabsWidget`.

  Deprecated methods will be removed in the next major update.
