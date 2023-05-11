package com.stocken.taxauth;

import org.bukkit.block.Block;
import org.bukkit.entity.Item;
import org.bukkit.entity.Player;
import org.bukkit.event.EventHandler;
import org.bukkit.event.Listener;
import org.bukkit.event.block.BlockBreakEvent;
import java.util.List;
import org.bukkit.inventory.ItemStack;
import java.util.Collection;
import java.util.ArrayList;
import org.bukkit.event.block.BlockDropItemEvent;



public class OnBlockBreak implements Listener {
    
    @EventHandler
    public void onBlockDropItem(BlockDropItemEvent event) {

        Player player = event.getPlayer();

        for (Item item : event.getItems()) {
            int amount =  item.getItemStack().getAmount();
            String itemName = item.getItemStack().getType().toString();
            
            List<String> taxableItems = new ArrayList<String>(); 
            // TODO: Move to a config of some sort
            taxableItems.add("DIAMOND");
            taxableItems.add("RAW_GOLD");
            taxableItems.add("RAW_IRON");
            taxableItems.add("COAL");
    
            if(taxableItems.contains(itemName)) {
                APIMessage apiMessage = new APIMessage("block_mined", player);
                apiMessage.addParam("itemAmount", Integer.toString(amount));
                apiMessage.addParam("itemName", itemName);
                apiMessage.send();
            }
        }
    }
}