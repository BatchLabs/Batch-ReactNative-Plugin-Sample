package com.batch.rn.batchstore;

import android.os.Bundle;

import com.facebook.react.ReactActivity;
import android.content.Intent;
import com.batch.android.Batch;

public class MainActivity extends ReactActivity {


  @Override
  protected void onCreate(Bundle savedInstanceState) {
    super.onCreate(null);
  }

  @Override
  public void onNewIntent(Intent intent)
  {
      Batch.onNewIntent(this, intent);
      super.onNewIntent(intent);
  }

  /**
   * Returns the name of the main component registered from JavaScript. This is used to schedule
   * rendering of the component.
   */
  @Override
  protected String getMainComponentName() {
    return "BatchStoreReactNative";
  }
}
