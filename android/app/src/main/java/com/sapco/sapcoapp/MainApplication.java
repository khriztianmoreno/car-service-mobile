package com.sapco.sapcoapp;

import com.smixx.fabric.FabricPackage;
import com.crashlytics.android.Crashlytics;
import com.facebook.FacebookSdk;
import android.app.Application;
import android.util.Log;

import com.facebook.react.ReactApplication;
import com.evollu.react.fa.FIRAnalyticsPackage;
import com.dieam.reactnativepushnotification.ReactNativePushNotificationPackage;
import com.geektime.rnonesignalandroid.ReactNativeOneSignalPackage;
import com.horcrux.svg.RNSvgPackage;
import com.horcrux.svg.RNSvgPackage;
import com.showlocationservicesdialogbox.LocationServicesDialogBoxPackage;
import com.airbnb.android.react.maps.MapsPackage;
import com.airbnb.android.react.maps.MapsPackage;
import com.oblador.vectoricons.VectorIconsPackage;
import com.facebook.react.ReactInstanceManager;
import com.facebook.react.ReactNativeHost;
import com.facebook.react.ReactPackage;
import com.facebook.react.shell.MainReactPackage;
import com.facebook.soloader.SoLoader;

import com.facebook.CallbackManager;
import com.facebook.FacebookSdk;
import com.facebook.reactnative.androidsdk.FBSDKPackage;
import com.facebook.appevents.AppEventsLogger;

import io.fabric.sdk.android.Fabric;
import java.util.Arrays;
import java.util.List;
import com.i18n.reactnativei18n.ReactNativeI18n;

public class MainApplication extends Application implements ReactApplication {

  private static CallbackManager mCallbackManager = CallbackManager.Factory.create();

	protected static CallbackManager getCallbackManager() {
		return mCallbackManager;
	}

  private final ReactNativeHost mReactNativeHost = new ReactNativeHost(this) {

            @Override
            protected boolean getUseDeveloperSupport() {
              return BuildConfig.DEBUG;
            }

            @Override
            protected List<ReactPackage> getPackages() {
              return Arrays.<ReactPackage>asList(
                  new FabricPackage(),
                      new MainReactPackage(),
            new FIRAnalyticsPackage(),
            new ReactNativePushNotificationPackage(),
            new ReactNativeOneSignalPackage(),
            new RNSvgPackage(),
            new RNSvgPackage(),
            new LocationServicesDialogBoxPackage(),
                      new MapsPackage(),
                      new FBSDKPackage(mCallbackManager),
                      new ReactNativeI18n()
              );
            }
          };

  @Override
  public void onCreate() {
    super.onCreate();
    final Fabric fabric = new Fabric.Builder(this)
        .kits(new Crashlytics())
        .debuggable(true)
        .build();

    Fabric.with(fabric);
    FacebookSdk.sdkInitialize(getApplicationContext());
    // If you want to use AppEventsLogger to log events.
    AppEventsLogger.activateApp(this);
  }

  @Override
  public ReactNativeHost getReactNativeHost() {
    return mReactNativeHost;
  }

  protected List<ReactPackage> getPackages() {
    return Arrays.<ReactPackage>asList(
      new MainReactPackage(),
      new LocationServicesDialogBoxPackage() // <== this 
    );
  }
}
