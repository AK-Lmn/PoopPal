package com.pooppal.app;

import android.app.PendingIntent;
import android.appwidget.AppWidgetManager;
import android.appwidget.AppWidgetProvider;
import android.content.ComponentName;
import android.content.Context;
import android.content.Intent;
import android.content.SharedPreferences;
import android.net.Uri;
import android.widget.RemoteViews;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.Locale;

public class PoopPalCompactWidgetProvider extends AppWidgetProvider {

    public static final String ACTION_LOG_FLUSH = "com.pooppal.app.ACTION_LOG_FLUSH";

    private String getTodayKey() {
        SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd", Locale.US);
        return sdf.format(new Date());
    }

    @Override
    public void onReceive(Context context, Intent intent) {
        super.onReceive(context, intent);

        if (ACTION_LOG_FLUSH.equals(intent.getAction())) {
            SharedPreferences prefs = context.getSharedPreferences(PoopPalTileService.PREFS_NAME, Context.MODE_PRIVATE);
            String today = getTodayKey();
            int count = prefs.getInt(PoopPalTileService.KEY_TILE_COUNT_PREFIX + today, 0) + 1;
            prefs.edit()
                .putInt(PoopPalTileService.KEY_TILE_COUNT_PREFIX + today, count)
                .putLong("last_tile_log_time", System.currentTimeMillis())
                .apply();

            // Refresh 2x2 widgets
            AppWidgetManager manager = AppWidgetManager.getInstance(context);
            ComponentName compactWidget = new ComponentName(context, PoopPalCompactWidgetProvider.class);
            int[] compactIds = manager.getAppWidgetIds(compactWidget);
            onUpdate(context, manager, compactIds);

            // Also refresh 4x2 widgets if placed
            ComponentName wideWidget = new ComponentName(context, PoopPalWidgetProvider.class);
            int[] wideIds = manager.getAppWidgetIds(wideWidget);
            if (wideIds != null && wideIds.length > 0) {
                Intent wideIntent = new Intent(context, PoopPalWidgetProvider.class);
                wideIntent.setAction(AppWidgetManager.ACTION_APPWIDGET_UPDATE);
                wideIntent.putExtra(AppWidgetManager.EXTRA_APPWIDGET_IDS, wideIds);
                context.sendBroadcast(wideIntent);
            }
        }
    }

    @Override
    public void onUpdate(Context context, AppWidgetManager appWidgetManager, int[] appWidgetIds) {
        SharedPreferences prefs = context.getSharedPreferences(PoopPalTileService.PREFS_NAME, Context.MODE_PRIVATE);
        String today = getTodayKey();
        int userCount = prefs.getInt(PoopPalTileService.KEY_TILE_COUNT_PREFIX + today, 0);
        int partnerCount = prefs.getInt("partner_count_" + today, 3);
        String partnerName = prefs.getString("partner_name", "SammySitz");
        int togetherCount = userCount + partnerCount;

        String displayNameShort = partnerName;
        if (displayNameShort != null && displayNameShort.length() > 6) {
            displayNameShort = displayNameShort.substring(0, 6);
        }

        for (int appWidgetId : appWidgetIds) {
            Intent openIntent = new Intent(context, MainActivity.class);
            openIntent.setFlags(Intent.FLAG_ACTIVITY_NEW_TASK | Intent.FLAG_ACTIVITY_CLEAR_TOP);
            openIntent.setData(Uri.parse("pooppal://open"));

            PendingIntent pendingOpenIntent = PendingIntent.getActivity(
                context,
                appWidgetId + 2000,
                openIntent,
                PendingIntent.FLAG_UPDATE_CURRENT | PendingIntent.FLAG_IMMUTABLE
            );

            Intent logIntent = new Intent(context, PoopPalCompactWidgetProvider.class);
            logIntent.setAction(ACTION_LOG_FLUSH);
            PendingIntent pendingLogIntent = PendingIntent.getBroadcast(
                context,
                appWidgetId + 2000,
                logIntent,
                PendingIntent.FLAG_UPDATE_CURRENT | PendingIntent.FLAG_IMMUTABLE
            );

            RemoteViews views = new RemoteViews(context.getPackageName(), R.layout.pooppal_widget_2x2);
            views.setTextViewText(R.id.widget_compact_partner_name, displayNameShort);
            views.setTextViewText(R.id.widget_compact_user_count, String.valueOf(userCount));
            views.setTextViewText(R.id.widget_compact_partner_count, String.valueOf(partnerCount));
            views.setTextViewText(R.id.widget_compact_together_text, "Together Today: " + togetherCount);

            views.setOnClickPendingIntent(R.id.widget_compact_container, pendingOpenIntent);
            views.setOnClickPendingIntent(R.id.widget_compact_action, pendingLogIntent);

            appWidgetManager.updateAppWidget(appWidgetId, views);
        }
    }
}
