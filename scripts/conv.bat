@echo off
setlocal enabledelayedexpansion

REM Set the base directory path
set "baseDir=C:\projekty\driving-licence-quiz\src\server\db\temporaryMedia"

REM Loop through each file with wmv extension in the 'files' directory
for %%F in ("%baseDir%\*.wmv") do (
    REM Get the filename without extension
    set "filename=%%~nF"

    REM Build the output filename with mp4 extension
    set "output=!baseDir!\!filename!.mp4"

    REM Run ffmpeg command to convert the file
    ffmpeg -i "%%F" "!output!"
    del "!baseDir!\*.wmv"
)

echo Conversion of wmv files to mp4 completed