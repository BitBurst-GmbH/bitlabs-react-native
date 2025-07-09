import BLCustom
import React

@objc(NativeBitLabs)
class NativeBitLabs: RCTEventEmitter {
  
  override func supportedEvents() -> [String]! {
    return ["onOfferwallClosed"]
  }
  
  @objc(configure:uid:)
  func configure(token: String, uid: String) {
    BitLabs.shared.configure(token: token, uid: uid)
    
    BitLabs.shared.setRewardCompletionHandler { (reward) in
      self.sendEvent(withName: "onOfferwallClosed", body: ["reward": reward])
    }
  }
  
  @objc func requestTrackingAuthorization() {
    BitLabs.shared.requestTrackingAuthorization()
  }
  
  @objc(configureAPI:uid:)
  func configureAPI(token: String, uid: String) {
    BitLabs.API.configure(token: token, uid: uid)
  }
  
  @objc func setTags(_ tags: [String: Any]) {
    BitLabs.shared.setTags(tags)
  }
  
  @objc(addTag:value:)
  func addTag(key: String, value: String) {
    BitLabs.shared.addTag(key: key, value: value)
  }
  
  @objc func launchOfferwall() {
    DispatchQueue.main.async {
      var vc = UIApplication.shared.delegate!.window!!.rootViewController
      
      if let presentedVC = vc?.presentedViewController,
         presentedVC.presentedViewController?.isBeingDismissed == false {
        vc = presentedVC
      }
      
      BitLabs.shared.launchOfferWall(parent: vc!)
    }
  }
  
  @objc(getSurveys:reject:)
  func getSurveys(resolve: @escaping RCTPromiseResolveBlock, reject: @escaping RCTPromiseRejectBlock) {
    BitLabs.API.getSurveys { result in
      switch result {
      case .success(let surveys):
        let surveyDictionaries = surveys.map { survey -> [String: Any]? in
            guard let data = try? JSONEncoder().encode(survey),
                  let dictionary = try? JSONSerialization.jsonObject(with: data, options: []) as? [String: Any] else {
                return nil
            }
            return dictionary
        }
        resolve(surveyDictionaries)
      case .failure(let error):
        reject("error", error.localizedDescription, nil)
      }
    }
  }
  
  @objc(checkSurveys:reject:)
  func checkSurveys(resolve: @escaping RCTPromiseResolveBlock, reject: @escaping RCTPromiseRejectBlock) {
    BitLabs.API.checkSurveys { result in
      switch result {
      case .success(let surveys):
        resolve(surveys)
      case .failure(let error):
        reject("error", error.localizedDescription, nil)
      }
    }
  }
}
