Start-Process -PassThru chrome.exe "http://localhost:5173"

Set-Location (Split-Path $MyInvocation.MyCommand.Path)
Set-Location ("../src")

Set-Location "client"
Start-Process Powershell -ArgumentList '& npm run build'
Set-Location "../server"
Start-Process Powershell -ArgumentList '& npm run prod'
Set-Location "../socket-server"
Start-Process Powershell -ArgumentList '& npm run prod'
Set-Location "../peer-server"
Start-Process Powershell -ArgumentList '& npm run prod'

# Start-Process Powershell -ArgumentList '& node client/modules/index.js'
# Start-Process Powershell -ArgumentList '& node server/index.js'
# Start-Process Powershell -ArgumentList '& node socket-server/index.js'
# Start-Process Powershell -ArgumentList '& node peer-server/index.js'
