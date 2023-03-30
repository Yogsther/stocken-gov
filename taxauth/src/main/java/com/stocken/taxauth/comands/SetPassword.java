package com.stocken.taxauth.comands;

import org.bukkit.command.Command;
import org.bukkit.command.CommandExecutor;
import org.bukkit.command.CommandSender;
import org.bukkit.entity.Player;

import com.stocken.taxauth.APIMessage;


public class SetPassword implements CommandExecutor{
    
    @Override
    public boolean onCommand(CommandSender sender, Command command, String label, String[] args) {

        if(!(sender instanceof Player)) {
            sender.sendMessage("This command can only be run by a player");
            return true;
        }

        if(args.length != 1) {
            sender.sendMessage("No password found.");
            return true;
        }

        String password = args[0];

        APIMessage apiMessage = new APIMessage("set_password", (Player)sender);
        apiMessage.addParam("password", password);
        apiMessage.send();

        return true;
    }
}
