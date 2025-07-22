package com.bitlabs

import ai.bitlabs.sdk.data.model.bitlabs.Category
import ai.bitlabs.sdk.data.model.bitlabs.Survey
import com.facebook.react.bridge.Arguments
import com.facebook.react.bridge.WritableMap

fun Survey.toWritableMap(): WritableMap = Arguments.createMap().apply {
  putString("clickUrl", clickUrl)
  putString("country", country)
  putString("cpi", cpi)
  putString("id", id)
  putString("language", language)
  putDouble("loi", loi)
  putInt("rating", rating)
  putArray("tags", Arguments.fromList(tags))
  putString("type", type)
  putString("value", value)
  putMap("category", category.toWritableMap())
}

fun Category.toWritableMap(): WritableMap = Arguments.createMap().apply {
  putString("name", name)
  putString("iconName", iconName)
  putString("iconUrl", iconUrl)
  putString("nameInternal", nameInternal)
}
