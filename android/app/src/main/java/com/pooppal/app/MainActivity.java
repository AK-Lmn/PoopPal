package com.pooppal.app;

import android.content.Context;
import android.content.Intent;
import android.content.SharedPreferences;
import android.os.Bundle;
import android.webkit.JavascriptInterface;
import com.getcapacitor.BridgeActivity;

public class MainActivity extends BridgeActivity {

    @Override
    public void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setupWebBridge();
        handleDeepLinkIntent(getIntent());
    }

    @Override
    protected void onNewIntent(Intent intent) {
        super.onNewIntent(intent);
        setIntent(intent);
        handleDeepLinkIntent(intent);
    }

    @Override
    public void onResume() {
        super.onResume();
        setupWebBridge();
    }

    private void handleDeepLinkIntent(Intent intent) {
        if (intent != null && intent.getData() != null) {
            String uri = intent.getData().toString();
            if (getBridge() != null && getBridge().getWebView() != null) {
                getBridge().getWebView().postDelayed(() -> {
                    getBridge().getWebView().evaluateJavascript(
                        "window.dispatchEvent(new CustomEvent('pooppal-deeplink', { detail: '" + uri + "' }));",
                        null
                    );
                }, 800);
            }
        }
    }

    private void setupWebBridge() {
        if (getBridge() != null && getBridge().getWebView() != null) {
            getBridge().getWebView().addJavascriptInterface(new AndroidNativeBridge(this), "AndroidNative");
        }
    }

    public static class AndroidNativeBridge {
        private final Context context;

        public AndroidNativeBridge(Context context) {
            this.context = context;
        }

        @JavascriptInterface
        public int getTileCount(String dateKey) {
            SharedPreferences prefs = context.getSharedPreferences(PoopPalTileService.PREFS_NAME, Context.MODE_PRIVATE);
            return prefs.getInt(PoopPalTileService.KEY_TILE_COUNT_PREFIX + dateKey, 0);
        }

        @JavascriptInterface
        public void clearTileCount(String dateKey) {
            SharedPreferences prefs = context.getSharedPreferences(PoopPalTileService.PREFS_NAME, Context.MODE_PRIVATE);
            prefs.edit().remove(PoopPalTileService.KEY_TILE_COUNT_PREFIX + dateKey).apply();
        }
    }
}
