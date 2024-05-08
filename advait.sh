
# Terminal 1
osascript -e 'tell application "Terminal" to do script "/usr/local/bin/python3 /Users/advait/oneaboveall/backend/main.py"'

# Terminal 2
osascript -e 'tell application "Terminal" to do script "/usr/local/bin/python3 /Users/advait/oneaboveall/backend/server.py"'

# Terminal 3 
osascript -e 'tell application "Terminal" to do script "cd /Users/advait/oneaboveall/my-chatbot-frontend && npm start"' 
#!/bin/bash


CURRENT_HOUR=$(date +%H)

if [ $CURRENT_HOUR -ge 5 ] && [ $CURRENT_HOUR -lt 12 ]; then
    GREETING="Good morning ghanashyam! your The vhatbot is ready"
elif [ $CURRENT_HOUR -ge 12 ] && [ $CURRENT_HOUR -lt 18 ]; then
    GREETING="Good afternoon ghanashyam! your Chatbot is ready"
else
    GREETING="Good evening ghanashyam! your Chatbot is ready"
fi

# Voice notification
osascript -e 'say "'"$GREETING"'"'

