Start-Process -PassThru msedge.exe http://localhost:5173

# $scriptpath = $MyInvocation.MyCommand.Path
# $dir = Split-Path $scriptpath
# $targetdir += "/src"
# Set-Location -Path $targetdir
Set-Location (Split-Path $MyInvocation.MyCommand.Path)
Set-Location ("../src")

# gives current directory -------> (Get-Item .).FullName

# open all in new window

# Start-Process wt.exe -ArgumentList '-p "Windows Powershell"', '& nodemon client\index.js'

Set-Location "client"
Start-Process Powershell -ArgumentList '& npm run dev'
Set-Location "../server"
Start-Process Powershell -ArgumentList '& npm run dev'
Set-Location "../socket-server"
Start-Process Powershell -ArgumentList '& npm run dev'
Set-Location "../peer-server"
Start-Process Powershell -ArgumentList '& npm run dev'

# Start-Process Powershell -ArgumentList '& nodemon client/modules/index.js'
# Start-Process Powershell -ArgumentList '& nodemon server/index.js'
# Start-Process Powershell -ArgumentList '& nodemon socket-server/index.js'
# Start-Process Powershell -ArgumentList '& nodemon peer-server/index.js'
