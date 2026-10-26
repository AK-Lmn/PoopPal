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

public class PoopPalWidgetProvider extends AppWidgetProvider {

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

            // Refresh all widgets
            AppWidgetManager manager = AppWidgetManager.getInstance(context);
            ComponentName thisWidget = new ComponentName(context, PoopPalWidgetProvider.class);
            int[] allIds = manager.getAppWidgetIds(thisWidget);
            onUpdate(context, manager, allIds);
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

        for (int appWidgetId : appWidgetIds) {
            // Intent to open MainActivity
            Intent openIntent = new Intent(context, MainActivity.class);
            openIntent.setFlags(Intent.FLAG_ACTIVITY_NEW_TASK | Intent.FLAG_ACTIVITY_CLEAR_TOP);
            openIntent.setData(Uri.parse("pooppal://open"));

            PendingIntent pendingOpenIntent = PendingIntent.getActivity(
                context,
                appWidgetId,
                openIntent,
                PendingIntent.FLAG_UPDATE_CURRENT | PendingIntent.FLAG_IMMUTABLE
            );

            // Intent to log poop directly via broadcast
            Intent logIntent = new Intent(context, PoopPalWidgetProvider.class);
            logIntent.setAction(ACTION_LOG_FLUSH);
            PendingIntent pendingLogIntent = PendingIntent.getBroadcast(
                context,
                appWidgetId,
                logIntent,
                PendingIntent.FLAG_UPDATE_CURRENT | PendingIntent.FLAG_IMMUTABLE
            );

            RemoteViews views = new RemoteViews(context.getPackageName(), R.layout.pooppal_widget);
            views.setTextViewText(R.id.widget_paired_label, "Paired with " + partnerName);
            views.setTextViewText(R.id.widget_partner_name, partnerName);
            views.setTextViewText(R.id.widget_user_count, String.valueOf(userCount));
            views.setTextViewText(R.id.widget_partner_count, String.valueOf(partnerCount));
            views.setTextViewText(R.id.widget_together_count, String.valueOf(togetherCount));

            views.setOnClickPendingIntent(R.id.widget_container, pendingOpenIntent);
            views.setOnClickPendingIntent(R.id.widget_open_app, pendingOpenIntent);
            views.setOnClickPendingIntent(R.id.widget_action, pendingLogIntent);

            appWidgetManager.updateAppWidget(appWidgetId, views);
        }
    }
}
