
@echo off
start  "wumin" "C:\Windows\System32\cmd.exe" 
net start MongoDB 
REM taskkill /f /im cmd.exe
REM exit