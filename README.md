"# OpenC2-FileQuery-PoC" 
This collection of code was put together for two companies present at the January 27/28 2020 OpenC2 plugfest/hackathon held at UMBC in Maryland. 

# October 2020 Update
I updated the code to include more vendors as actuators and made slight modifications to the code to bring it closer to the latest OpenC2 language specification.

In order to make it work, the /etc/config.json file must be edited to include your api key. The embedded openc2api key is only useful with this code and so it is hardcoded, but the other two keys must be edited for the backend http.requests to function correctly.
All the node_modules have been removed from the repository. To add all the node_modules so the software works, navigate to where you cloned the repo and 
type "npm install"
This will redownload all the necessary node modules for the software to function.

Please note that this code turns off SSL validation in order to support self signed certs used in https. Please use in a controlled environment isolated from rest of network.




10/22/2020
# OpenC2 FileQuery Command Generator Client

Updated Virustotal API to version 3.0
Added Fireeye Detection on Demand
Query MD5 Hash
Updated OpenC2 response. Added "request_id" : UUID to response.
Updated Node.js command generation to ignore expired certificates. e.g ADDED  "strictSSL: false"
Updated features OpenC2 request.
Updated features/versions request.
Updated "Sample code to download" section.

 
## Preliminary non-OpenC2 Testing

                    Reputation Lookups
                    -------------------
                AcctReq		File	MD5		SHA256		InTool
Virustotal		Y			✓		✓			✓			✓✓
Fireeye			Y			✓		✓			N/A			✓✓
BluVector		Y			x*		U			U			x
ThreatCrowd		N			✓		✓			N/A			✓✓
HashDD			N			✓		✓			✓			✓✓
Opswat			Y			✓		✓			✓			✓✓

## Legend:
--------
✓✓ = Included
✓ = Supported and tested
x* = Supported as of last plugfest
N = Not included
Y = Required
U = Untested
N/A = Not Applicable/Not Available
