package com.pooppal.app;

import android.appwidget.AppWidgetManager;
import android.content.ComponentName;
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
        notifyWidgetSync();
    }

    private void notifyWidgetSync() {
        if (getBridge() != null && getBridge().getWebView() != null) {
            getBridge().getWebView().postDelayed(() -> {
                getBridge().getWebView().evaluateJavascript(
                    "window.dispatchEvent(new CustomEvent('pooppal-sync-widget'));",
                    null
                );
            }, 500);
        }
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

        @JavascriptInterface
        public void updateWidgetData(String dateKey, int userCount, int partnerCount, String partnerName) {
            SharedPreferences prefs = context.getSharedPreferences(PoopPalTileService.PREFS_NAME, Context.MODE_PRIVATE);
            prefs.edit()
                .putInt(PoopPalTileService.KEY_TILE_COUNT_PREFIX + dateKey, userCount)
                .putInt("partner_count_" + dateKey, partnerCount)
                .putString("partner_name", partnerName)
                .apply();

            try {
                AppWidgetManager manager = AppWidgetManager.getInstance(context);
                ComponentName thisWidget = new ComponentName(context, PoopPalWidgetProvider.class);
                int[] allIds = manager.getAppWidgetIds(thisWidget);
                if (allIds != null && allIds.length > 0) {
                    Intent intent = new Intent(context, PoopPalWidgetProvider.class);
                    intent.setAction(AppWidgetManager.ACTION_APPWIDGET_UPDATE);
                    intent.putExtra(AppWidgetManager.EXTRA_APPWIDGET_IDS, allIds);
                    context.sendBroadcast(intent);
                }
            } catch (Exception e) {
                // Ignore widget manager errors
            }
        }
    }
}
