Connect-ServiceFabricCluster localhost:19000



Write-Host 'Handling files service'
Write-Host 'Copying application package...'
Copy-ServiceFabricApplicationPackage -ApplicationPackagePath 'D:\node-pip-package-files' -ImageStoreConnectionString 'file:C:\SfDevCluster\Data\ImageStoreShare' -ApplicationPackagePathInImageStore 'Store\NodePipFilesType'

Write-Host 'Registering application type...'
Register-ServiceFabricApplicationType -ApplicationPathInImageStore 'Store\NodePipFilesType' -TimeoutSec 600

New-ServiceFabricApplication -ApplicationName 'fabric:/NodePipFilesApp' -ApplicationTypeName 'NodePipFilesType' -ApplicationTypeVersion 1.0 -TimeoutSec 600



Write-Host 'Handling notes service'
Write-Host 'Copying application package...'
Copy-ServiceFabricApplicationPackage -ApplicationPackagePath 'D:\node-pip-package-notes' -ImageStoreConnectionString 'file:C:\SfDevCluster\Data\ImageStoreShare' -ApplicationPackagePathInImageStore 'Store\NodePipNotesType'

Write-Host 'Registering application type...'
Register-ServiceFabricApplicationType -ApplicationPathInImageStore 'Store\NodePipNotesType' -TimeoutSec 600

New-ServiceFabricApplication -ApplicationName 'fabric:/NodePipNotesApp' -ApplicationTypeName 'NodePipNotesType' -ApplicationTypeVersion 1.0 -TimeoutSec 600



Write-Host 'Handling users service'
Write-Host 'Copying application package...'
Copy-ServiceFabricApplicationPackage -ApplicationPackagePath 'D:\node-pip-package-users' -ImageStoreConnectionString 'file:C:\SfDevCluster\Data\ImageStoreShare' -ApplicationPackagePathInImageStore 'Store\NodePipUsersType'

Write-Host 'Registering application type...'
Register-ServiceFabricApplicationType -ApplicationPathInImageStore 'Store\NodePipUsersType' -TimeoutSec 600

New-ServiceFabricApplication -ApplicationName 'fabric:/NodePipUsersApp' -ApplicationTypeName 'NodePipUsersType' -ApplicationTypeVersion 1.0 -TimeoutSec 600



Write-Host 'Handling sessions service'
Write-Host 'Copying application package...'
Copy-ServiceFabricApplicationPackage -ApplicationPackagePath 'D:\node-pip-package-sessions' -ImageStoreConnectionString 'file:C:\SfDevCluster\Data\ImageStoreShare' -ApplicationPackagePathInImageStore 'Store\NodePipSessionsType'

Write-Host 'Registering application type...'
Register-ServiceFabricApplicationType -ApplicationPathInImageStore 'Store\NodePipSessionsType' -TimeoutSec 600

New-ServiceFabricApplication -ApplicationName 'fabric:/NodePipSessionsApp' -ApplicationTypeName 'NodePipSessionsType' -ApplicationTypeVersion 1.0 -TimeoutSec 600



Write-Host 'Handling email service'
Write-Host 'Copying application package...'
Copy-ServiceFabricApplicationPackage -ApplicationPackagePath 'D:\node-pip-package-email' -ImageStoreConnectionString 'file:C:\SfDevCluster\Data\ImageStoreShare' -ApplicationPackagePathInImageStore 'Store\NodePipEmailType'

Write-Host 'Registering application type...'
Register-ServiceFabricApplicationType -ApplicationPathInImageStore 'Store\NodePipEmailType' -TimeoutSec 600

New-ServiceFabricApplication -ApplicationName 'fabric:/NodePipEmailApp' -ApplicationTypeName 'NodePipEmailType' -ApplicationTypeVersion 1.0 -TimeoutSec 600



Write-Host 'Handling facade service'
Write-Host 'Copying application package...'
Copy-ServiceFabricApplicationPackage -ApplicationPackagePath 'D:\node-pip-package-facade' -ImageStoreConnectionString 'file:C:\SfDevCluster\Data\ImageStoreShare' -ApplicationPackagePathInImageStore 'Store\NodePipFacadeType'

Write-Host 'Registering application type...'
Register-ServiceFabricApplicationType -ApplicationPathInImageStore 'Store\NodePipFacadeType' -TimeoutSec 600

New-ServiceFabricApplication -ApplicationName 'fabric:/NodePipFacadeApp' -ApplicationTypeName 'NodePipFacadeType' -ApplicationTypeVersion 1.0 -TimeoutSec 600
