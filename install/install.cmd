git clone https://github.com/pip-services/pip-samples-notes-facade.git


git clone https://github.com/pip-services/pip-services-email.git

git clone https://github.com/pip-services/pip-services-sessions.git

git clone https://github.com/pip-services/pip-services-users.git

git clone https://github.com/pip-services/pip-samples-notes.git

git clone https://github.com/pip-services/pip-services-files.git

cd pip-samples-notes-facade
call npm install
cd ..

cd pip-services-email
call npm install
cd ..
cd pip-services-sessions
call npm install
cd ..
cd pip-services-users
call npm install
cd ..
cd pip-samples-notes
call npm install
cd ..
cd pip-services-files
call npm install
cd ..



ServiceFabricAppPackageUtil.exe /source:pip-samples-notes-facade /target:D:\node-pip-package-facade /appname:NodePipFacade /exe:node.exe /ma:run /AppType:NodePipFacadeType

ServiceFabricAppPackageUtil.exe /source:pip-services-email /target:D:\node-pip-package-email /appname:NodePipEmail /exe:node.exe /ma:run /AppType:NodePipEmailType
ServiceFabricAppPackageUtil.exe /source:pip-services-sessions /target:D:\node-pip-package-sessions /appname:NodePipSessions /exe:node.exe /ma:run /AppType:NodePipSessionsType
ServiceFabricAppPackageUtil.exe /source:pip-services-users /target:D:\node-pip-package-users /appname:NodePipUsers /exe:node.exe /ma:run /AppType:NodePipUsersType
ServiceFabricAppPackageUtil.exe /source:pip-samples-notes /target:D:\node-pip-package-notes /appname:NodePipNotes /exe:node.exe /ma:run /AppType:NodePipNotesType
ServiceFabricAppPackageUtil.exe /source:pip-services-files /target:D:\node-pip-package-files /appname:NodePipFiles /exe:node.exe /ma:run /AppType:NodePipFilesType

cd pip-samples-notes-facade
copy ServiceManifest.xml D:\node-pip-package-facade\NodePipFacade\ServiceManifest.xml
cd ..

cd pip-services-email
copy ServiceManifest.xml D:\node-pip-package-email\NodePipEmail\ServiceManifest.xml
cd ..

cd pip-services-sessions
copy ServiceManifest.xml D:\node-pip-package-sessions\NodePipSessions\ServiceManifest.xml
cd ..

cd pip-services-users
copy ServiceManifest.xml D:\node-pip-package-users\NodePipUsers\ServiceManifest.xml
cd ..

cd pip-samples-notes
copy ServiceManifest.xml D:\node-pip-package-notes\NodePipNotes\ServiceManifest.xml
cd ..

cd pip-services-files
copy ServiceManifest.xml D:\node-pip-package-files\NodePipFiles\ServiceManifest.xml
cd ..

powershell.exe .\update-cluster.ps1