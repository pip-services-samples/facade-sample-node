#!/usr/bin/env pwsh

Set-StrictMode -Version latest
$ErrorActionPreference = "Stop"

# Get component data and set necessary variables
$component = Get-Content -Path "component.json" | ConvertFrom-Json
$protoImage="$($component.registry)/$($component.name):$($component.version)-$($component.build)-protogen"
$container=$component.name

# Remove old stubs
if (Test-Path "src/protos") {
    Get-ChildItem "src/protos/*.ts" -Recurse | foreach { Remove-Item -Path $_.FullName }
    Get-ChildItem "src/protos/*.js" -Recurse | foreach { Remove-Item -Path $_.FullName }
} else {
    Write-Host "src/protos doesn't exist"
    exit 1
}

# Get proto file name
$protoName = $(Get-ChildItem "src/protos/*.proto").Name

# Build docker image
docker build --build-arg proto_name="$protoName" -f docker/Dockerfile.protogen -t $protoImage .

# Create and copy compiled files, then destroy
docker create --name $container $protoImage
docker cp "$($container):generated" "src/protos"
docker rm $container

# temporary workaround to put proto stubs in correct path
Move-Item -Path "src/protos/generated/*" -Destination "src/protos"
Remove-Item "src/protos/generated"
