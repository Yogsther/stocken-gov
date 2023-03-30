package com.stocken.taxauth;

import java.io.InputStreamReader;
import java.net.HttpURLConnection;
import java.net.URL;
import java.nio.charset.StandardCharsets;
import java.util.List;
import java.util.Map;
import org.bukkit.entity.Player;
import java.util.ArrayList;


public class APIMessage {

    class APIArgument {
        public String key;
        public String value;
        public APIArgument(String key, String value) {
            this.key = key;
            this.value = value;
        }
    }

    private Player player;
    private String path;
    private List<APIArgument> params = new ArrayList<APIArgument>();

    public APIMessage(String path, Player player){
        this.path = path;
        this.player = player;
    }

    public void addParam(String key, String value) {
        params.add(new APIArgument(key, value));
    }

    public void send() {
        try{
            URL url = new URL("http://localhost:1099/local-api/" + path);
            HttpURLConnection con = (HttpURLConnection) url.openConnection();
            con.setRequestMethod("POST");
            con.setRequestProperty("Content-Type", "application/json; utf-8");
            con.setRequestProperty("Accept", "application/json");
            con.setDoOutput(true);

            con.setRequestProperty("player_guid", this.player.getUniqueId().toString());
            con.setRequestProperty("player_name", this.player.getName());
            
            for (APIArgument param : params) {
                con.setRequestProperty(param.key, param.value);
            }

            con.connect();
            
            InputStreamReader inputStreamReader = new InputStreamReader(con.getInputStream(), StandardCharsets.UTF_8);
            StringBuilder response = new StringBuilder();
            for (int c; (c = inputStreamReader.read()) >= 0;) {
                response.append((char)c);
            }
            
            if(response.length() == 0) return;
            
            
            player.sendMessage(response.toString());
            
        } catch (Exception e) {
            e.printStackTrace();
            player.sendMessage("There was an error communicating with the tax server, please report this to the court.");
        }
    }
}
