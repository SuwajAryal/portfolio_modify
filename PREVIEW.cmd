@echo off
cd /d "%~dp0"
set "portfolio_node=node"
where node >nul 2>&1
if errorlevel 1 set "portfolio_node=%USERPROFILE%\.cache\codex-runtimes\codex-primary-runtime\dependencies\node\bin\node.exe"
"%portfolio_node%" scripts\preview-result.mjs --open
pause
