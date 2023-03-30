package com.stocken.taxauth.comands;

import org.bukkit.command.Command;
import org.bukkit.command.CommandExecutor;
import org.bukkit.command.CommandSender;
import org.bukkit.entity.Player;

import com.stocken.taxauth.APIMessage;

public class TaxReport implements CommandExecutor {
    @Override
    public boolean onCommand(CommandSender sender, Command command, String label, String[] args) {

        if(!(sender instanceof Player)) {
            sender.sendMessage("This command can only be run by a player");
            return true;
        }

        APIMessage apiMessage = new APIMessage("get_tax_report", (Player)sender);
        apiMessage.send();

        return true;
    }
}
