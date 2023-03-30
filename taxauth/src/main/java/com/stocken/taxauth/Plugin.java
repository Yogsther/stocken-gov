package com.stocken.taxauth;

import java.util.logging.Logger;
import org.bukkit.plugin.java.JavaPlugin;
import com.stocken.taxauth.comands.*;;



/*
 * taxauth java plugin
 */
public class Plugin extends JavaPlugin
{
  private static final Logger LOGGER=Logger.getLogger("taxauth");

  public void onEnable()
  {
    LOGGER.info("taxauth enabled");

    getServer().getPluginManager().registerEvents(new OnBlockBreak(), this);
    getCommand("setpassword").setExecutor(new SetPassword());
    getCommand("taxreport").setExecutor(new TaxReport());
  }

  public void onDisable()
  {
    LOGGER.info("taxauth disabled");
  }
}
