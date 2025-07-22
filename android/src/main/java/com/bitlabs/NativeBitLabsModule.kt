package com.bitlabs

import ai.bitlabs.sdk.BitLabs
import com.facebook.react.bridge.Arguments
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReactContextBaseJavaModule
import com.facebook.react.bridge.ReactMethod
import com.facebook.react.bridge.Promise
import com.facebook.react.bridge.ReadableMap

const val REACT_CLASS = "NativeBitLabs"

class NativeBitLabsModule(reactContext: ReactApplicationContext) :
  ReactContextBaseJavaModule(reactContext) {

  override fun getName() = REACT_CLASS

  @ReactMethod
  fun configure(token: String, uid: String) {
    BitLabs.init(reactApplicationContext, token, uid)
  }

  @ReactMethod
  fun requestTrackingAuthorization() {}

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
    BitLabs.tags = tagsMap
  }

  @ReactMethod
  fun addTag(key: String, value: String) {
    BitLabs.tags[key] = value
  }

  @ReactMethod
  fun launchOfferwall() {
    BitLabs.launchOfferWall(currentActivity ?: reactApplicationContext)
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
  fun addListener(eventName: String) {
  }

  @ReactMethod
  fun removeListeners(count: Int) {
  }
}
