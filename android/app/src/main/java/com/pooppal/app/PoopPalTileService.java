package com.pooppal.app;

import android.content.Context;
import android.content.SharedPreferences;
import android.os.Build;
import android.service.quicksettings.Tile;
import android.service.quicksettings.TileService;
import android.widget.Toast;
import androidx.annotation.RequiresApi;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.Locale;

@RequiresApi(api = Build.VERSION_CODES.N)
public class PoopPalTileService extends TileService {

    public static final String PREFS_NAME = "pooppal_prefs";
    public static final String KEY_TILE_COUNT_PREFIX = "tile_count_";

    private String getTodayKey() {
        SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd", Locale.US);
        return sdf.format(new Date());
    }

    @Override
    public void onStartListening() {
        super.onStartListening();
        updateTileState();
    }

    private void updateTileState() {
        Tile tile = getQsTile();
        if (tile == null) return;

        SharedPreferences prefs = getSharedPreferences(PREFS_NAME, Context.MODE_PRIVATE);
        String today = getTodayKey();
        int count = prefs.getInt(KEY_TILE_COUNT_PREFIX + today, 0);

        tile.setState(Tile.STATE_ACTIVE);
        tile.setLabel("PoopPal Log");
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.Q) {
            tile.setSubtitle("Today: " + count);
        }
        tile.updateTile();
    }

    @Override
    public void onClick() {
        super.onClick();
        SharedPreferences prefs = getSharedPreferences(PREFS_NAME, Context.MODE_PRIVATE);
        String today = getTodayKey();
        int count = prefs.getInt(KEY_TILE_COUNT_PREFIX + today, 0) + 1;
        prefs.edit()
            .putInt(KEY_TILE_COUNT_PREFIX + today, count)
            .putLong("last_tile_log_time", System.currentTimeMillis())
            .apply();

        updateTileState();

        Toast.makeText(this, "PoopPal: Flush logged! Today: " + count, Toast.LENGTH_SHORT).show();
    }
}
