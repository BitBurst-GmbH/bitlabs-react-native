#import <React/RCTBridgeModule.h>
#import <React/RCTEventEmitter.h>

@interface RCT_EXTERN_MODULE(NativeBitLabs, RCTEventEmitter)

RCT_EXTERN_METHOD(configure:(NSString *)token uid:(NSString *)uid)

RCT_EXTERN_METHOD(configureAPI:(NSString *)token uid:(NSString *)uid)

RCT_EXTERN_METHOD(requestTrackingAuthorization)

RCT_EXTERN_METHOD(launchOfferwall)

RCT_EXTERN_METHOD(setTags:(NSDictionary *)tags)

RCT_EXTERN_METHOD(addTag:(NSString *)key value:(NSString *)value)

RCT_EXTERN_METHOD(getSurveys:(RCTPromiseResolveBlock)resolve reject:(RCTPromiseRejectBlock)reject)

RCT_EXTERN_METHOD(checkSurveys:(RCTPromiseResolveBlock)resolve reject:(RCTPromiseRejectBlock)reject)

RCT_EXTERN_METHOD(openOffer:(NSString *)offerId)

RCT_EXTERN_METHOD(openMagicReceiptsOffer:(NSString *)offerId)

RCT_EXTERN_METHOD(openMagicReceiptsMerchant:(NSString *)merchantId)

+ (BOOL)requiresMainQueueSetup
{
  return YES;
}

@end
