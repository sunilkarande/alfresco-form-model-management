*** Alberta Supports Initative (ASI) Common Intake Share AMP How-To***

Build:

- To build the Share AMP, just run the package-asi-share-extension Ant target

Deploy:

- Place the goa-cd-asi-share AMP in the amps-share directory in your
Alfresco root context. Create the amps-share directory if it does not exist.
- Run apply-amps.bat as normal (Alfresco v3.2+ should require no modification
to apply-amps.bat)

File Mapping:

- File mapping between the Eclipse project/AMP directories and the exploded
Alfresco directories is determined by /config/module/file-mapping.properties
- Current setup is outlined below:

Eclipse/AMP directory	MAPS TO	Alfresco directory

config					/WEB-INF/classes
tomcatshared 			%TOMCAT_HOME%/shared/classes/web-extension
source/web 				/    (%TOMCAT_HOME%/webapps/share)

- Super-secret technique to get the MMT to deploy outside of the webapp context
(i.e. into /tomcat/shared) is to back up the directory tree using ../ until you
get where you want to be

*** Maintenance Page***

To Enable "Down for Maintenance" page:

- Uncomment the line in index.jsp that redirects to maintenance.html
  and comment out the page/site-index redirect.

To Re-Enable normal access:

- Comment out the maintenance.html redirect in index.jsp and uncomment
  the page/site-index redirect.