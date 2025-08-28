package com.bitlabs

import ai.bitlabs.sdk.BitLabs
import ai.bitlabs.sdk.offerwall.Offerwall
import ai.bitlabs.sdk.util.OnOfferwallClosedListener
import com.facebook.react.bridge.Arguments
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReactContextBaseJavaModule
import com.facebook.react.bridge.ReactMethod
import com.facebook.react.bridge.Promise
import com.facebook.react.bridge.ReadableMap
import com.facebook.react.bridge.WritableMap
import com.facebook.react.modules.core.DeviceEventManagerModule.*

const val REACT_CLASS = "NativeBitLabs"

class NativeBitLabsModule(reactContext: ReactApplicationContext) :
  ReactContextBaseJavaModule(reactContext) {

  private lateinit var offerwall: Offerwall

  override fun getName() = REACT_CLASS

  private fun sendEvent(name: String, params: WritableMap?) {
    reactApplicationContext
      .getJSModule<RCTDeviceEventEmitter>(RCTDeviceEventEmitter::class.java)
      .emit(name, params)
  }

  @ReactMethod
  fun configure(token: String, uid: String) {
    offerwall = BitLabs.OFFERWALL.create(token, uid)

    offerwall.onOfferwallClosedListener = OnOfferwallClosedListener { reward ->
      val params = Arguments.createMap().apply {
        putDouble("reward", reward)
      }
      sendEvent("onOfferwallClosed", params)
    }
  }

  @ReactMethod
  fun requestTrackingAuthorization() {
  }

  @ReactMethod
  fun configureAPI(token: String, uid: String) {
    BitLabs.API.init(token, uid)
  }

  @ReactMethod
  fun setTags(tags: ReadableMap) {
    val tagsMap = mutableMapOf<String, Any>()
    tags.entryIterator.forEach { (key, value) ->
      tagsMap[key] = value!!
    }
    offerwall.tags.putAll(tagsMap)
  }

  @ReactMethod
  fun addTag(key: String, value: String) {
    offerwall.tags[key] = value
  }

  @ReactMethod
  fun launchOfferwall() {
    offerwall.launch(currentActivity ?: reactApplicationContext)
  }

  @ReactMethod
  fun getSurveys(promise: Promise) {
    BitLabs.API.getSurveys(
      { surveys ->
        promise.resolve(Arguments.createArray().apply {
          surveys.forEach { pushMap(it.toWritableMap()) }
        })
      },
      { promise.reject("GETSurveys", it.message) }
    )
  }

  @ReactMethod
  fun checkSurveys(promise: Promise) {
    BitLabs.API.checkSurveys(
      { promise.resolve(it) },
      { promise.reject("CheckSurveys", it.message) }
    )
  }

  @ReactMethod
  fun openOffer(offerId: String) {
    offerwall.openOffer(currentActivity ?: reactApplicationContext, offerId)
  }

  @ReactMethod
  fun openMagicReceiptsOffer(offerId: String) {
    offerwall.openMagicReceiptsOffer(currentActivity ?: reactApplicationContext, offerId)
  }

  @ReactMethod
  fun openMagicReceiptsMerchant(merchantId: String) {
    offerwall.openMagicReceiptsMerchant(currentActivity ?: reactApplicationContext, merchantId)
  }

  @ReactMethod
  fun addListener(eventName: String) {
  }

  @ReactMethod
  fun removeListeners(count: Int) {
  }
}
