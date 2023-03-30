package com.stocken.taxauth;

import org.bukkit.block.Block;
import org.bukkit.entity.Player;
import org.bukkit.event.EventHandler;
import org.bukkit.event.Listener;
import org.bukkit.event.block.BlockBreakEvent;
import java.util.List;
import org.bukkit.inventory.ItemStack;
import java.util.Collection;
import java.util.ArrayList;



public class OnBlockBreak implements Listener {
    
    @EventHandler
    public void onBlockBreak(BlockBreakEvent event) {
        Player player = event.getPlayer();
        Block block = event.getBlock();

        Collection<ItemStack> drops = block.getDrops(player.getInventory().getItemInMainHand());

        List<String> taxableItems = new ArrayList<String>(); 
        // TODO: Move to a config of some sort
        taxableItems.add("DIAMOND");
        taxableItems.add("RAW_GOLD");
        taxableItems.add("RAW_IRON");
        taxableItems.add("COAL");

        for (ItemStack drop : drops) {
            String itemName = drop.getType().toString();
            if(taxableItems.contains(itemName)) {
                
                int amount = drop.getAmount();

                APIMessage apiMessage = new APIMessage("block_mined", player);
                apiMessage.addParam("itemAmount", Integer.toString(amount));
                apiMessage.addParam("itemName", itemName);
                apiMessage.send();
            }
        }
    }
}