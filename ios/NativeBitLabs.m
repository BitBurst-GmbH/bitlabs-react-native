#import <React/RCTBridgeModule.h>

@interface RCT_EXTERN_MODULE(NativeBitLabs, NSObject)

RCT_EXTERN_METHOD(configure:(NSString *)token uid:(NSString *)uid)

RCT_EXTERN_METHOD(launchOfferwall)

RCT_EXTERN_METHOD(setTags: (NSDictionary *)tags)

RCT_EXTERN_METHOD(addTag:(NSString *)key value:(NSString *)value)

RCT_EXTERN_METHOD(getSurveys:(RCTPromiseResolveBlock)resolve reject:(RCTPromiseRejectBlock)reject)

RCT_EXTERN_METHOD(checkSurveys:(RCTPromiseResolveBlock)resolve reject:(RCTPromiseRejectBlock)reject)


+ (BOOL)requiresMainQueueSetup
{
  return YES;
}

@end
