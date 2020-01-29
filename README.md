"# OpenC2-FileQuery-PoC" 
This collection of code was put together for two companies present at the January 27/28 2020 OpenC2 plugfest/hackathon held at UMBC in Maryland. 

In order to make it work, the /etc/config.json file must be edited to include your api key. The embedded openc2api key is only useful with this code and so it is hardcoded,but the other two keys must be edited for the backend http.requests to function correctly.

Please note that this code turns off SSL validation in order to support self signed certs used in https. Please use in a controlled environment isolated from rest of network.
