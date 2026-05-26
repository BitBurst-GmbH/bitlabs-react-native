import BLCustom
import React

@objc(NativeBitLabs)
class NativeBitLabs: RCTEventEmitter {
  var offerwall: Offerwall?
  
  override func supportedEvents() -> [String]! {
    return ["onOfferwallClosed"]
  }
  
  @objc(configure:uid:)
  func configure(token: String, uid: String) {
    offerwall = BitLabs.OFFERWALL.create(token: token, uid: uid)
    
    offerwall?.offerwallClosedHandler = { (reward) in
      self.sendEvent(withName: "onOfferwallClosed", body: ["reward": reward])
    }
  }
  
  @objc func requestTrackingAuthorization() {
    offerwall?.requestTrackingAuthorization()
  }
  
  @objc(configureAPI:uid:)
  func configureAPI(token: String, uid: String) {
    BitLabs.API.configure(token: token, uid: uid)
  }
  
  @objc func setTags(_ tags: [String: Any]) {
    offerwall?.tags = tags
  }
  
  @objc(addTag:value:)
  func addTag(key: String, value: String) {
    offerwall?.tags[key] = value
  }
  
  @objc func launchOfferwall() {
    DispatchQueue.main.async {
      guard var topVC = self.getTopViewController() else { return }
      
      self.offerwall?.launch(parent: topVC)
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
  
  @objc(openOffer:)
  func openOffer(offerId: String) {
    DispatchQueue.main.async {
      guard var topVC = self.getTopViewController() else { return }
      
      self.offerwall?.openOffer(withId: offerId, parent: topVC)
    }
  }
  
  @objc(openMagicReceiptsOffer:)
  func openMagicReceiptsOffer(offerId: String) {
    DispatchQueue.main.async {
      guard var topVC = self.getTopViewController() else { return }
      
      self.offerwall?.openMagicReceiptsOffer(withId: offerId, parent: topVC)
    }
  }
  
  @objc(openMagicReceiptsMerchant:)
  func openMagicReceiptsMerchant(merchantId: String) {
    DispatchQueue.main.async {
      guard var topVC = self.getTopViewController() else { return }
      
      self.offerwall?.openMagicReceiptsMerchant(withId: merchantId, parent: topVC)
    }
  }
  
  private func getTopViewController() -> UIViewController? {
    var topViewController: UIViewController?
    guard let root = UIApplication.shared.keyWindow?.rootViewController else { return nil }
    
    topViewController = root
    while let presented = topViewController?.presentedViewController {
      topViewController = presented
    }
    
    return topViewController
  }
}
