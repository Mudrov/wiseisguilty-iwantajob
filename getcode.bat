@echo off
chcp 65001 > nul
setlocal enabledelayedexpansion

set "OUT=all_site_code.txt"

if exist "%OUT%" del "%OUT%"

echo ============================================>> "%OUT%"
echo SITE CODE DUMP>> "%OUT%"
echo Created: %date% %time%>> "%OUT%"
echo Folder: %cd%>> "%OUT%"
echo ============================================>> "%OUT%"
echo.>> "%OUT%"

for /r %%f in (*.html *.css *.js) do (
    echo.>> "%OUT%"
    echo ============================================>> "%OUT%"
    echo FILE: %%f>> "%OUT%"
    echo ============================================>> "%OUT%"
    echo.>> "%OUT%"
    type "%%f">> "%OUT%"
    echo.>> "%OUT%"
)

echo Done.
echo Code saved to: %OUT%
pause